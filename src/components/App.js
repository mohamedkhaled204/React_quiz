import { useEffect, useReducer } from 'react'
import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import Question from './Question'
import Nextbutton from './Nextbutton'
import Progress from './Progress'
import FinishScreen from './FinishScreen'


const initialState={  
  questions:[],
  status : "loading",
  index : 0,
  answer : null,
  points: 0,
  highScore : 0
}
function reducer(state ,action){
  switch(action.type){
    case "fetchQuestion": 
      return {...state ,questions: action.payload  ,status : "ready"};
    case "failedFetch":
      return {...state , status :"failed"}
    case "startQuiz":
      return {...state , status : "active"}
    case "newAnswer":
      const question =state.questions.at(state.index)
      return {...state , answer: action.payload , points: action.payload === question.correctOption ? state.points + question.points : state.points }
    case "nextQuestion":
      return {...state , index: state.index + 1  , answer : null}
    case "finishScreen":
      return {...state , status :"finished", highScore : state.points> state.highScore ? state.points : state.highScore}
    case "restart" :
      return { ...initialState , status : "ready", questions: state.questions }
    default : throw new Error("error");
  }
}
function App() {
  const [{questions ,status ,index, answer, points, highScore} ,dispatch] = useReducer(reducer,initialState);
  const questionLength =questions.length
  const totalPoints = questions.reduce((acc, question) => acc + question.points, 0);
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
        {status === "ready" && <StartScreen questionLength={questionLength} dispatch={dispatch} />}
        {status === "active" && (
          <>
            <Progress questionLength={questionLength} index={index} points={points} totalPoints={totalPoints} />
            <Question questions={questions[index]} answer={answer} dispatch={dispatch} />
            <Nextbutton dispatch={dispatch} answer={answer} index={index} questionLength={questionLength} />
          </>
          )}
        {status === "finished" && <FinishScreen points={points} dispatch={dispatch} highScore={highScore} totalPoints={totalPoints} questionLength={questionLength} />}
      </Main>
    </div>
  )
}

export default App
