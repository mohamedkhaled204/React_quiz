import { useEffect, useReducer } from 'react'
import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'

const initialState={
  questions:[],
  status : "loading",
}
function reducer(state ,action){
  switch(action.type){
    case "fetchQuestion": 
      return {...state ,questions: action.payload  ,status : "ready"};
    case "failedFetch":
      return {...state , status :"failed"}
    default : throw new Error("error");
  }
}
function App() {
  const [{questions ,status} ,dispatch] = useReducer(reducer,initialState);
  const questionLength =questions.lenght
  useEffect(()=>{
    try {
      fetch("http://localhost:9000/questions")
      .then((res)=>res.json())
      .then((data)=>dispatch({type:"fetchQuestion" , payload : data}))
    } catch (error) {
      dispatch({type:"failedFetch" ,payload: error })
    }
  },[])
  return (
    <div className='app'>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "failed" && <Error />}
        {status === "ready" && <StartScreen questionLength={questionLength} />}
      </Main>
    </div>
  )
}

export default App
