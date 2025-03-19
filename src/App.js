import { useEffect, useReducer } from 'react'
import Header from './Header'
import Main from './Main'

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
  const [state ,dispatch] = useReducer(reducer,initialState);
  console.log(state)
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
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  )
}

export default App
