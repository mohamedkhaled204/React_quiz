function StartScreen({questionLength , dispatch}) {
    return (
        <div className="start">
            <h2>Welcome To The React Quiz!</h2>
            <h3>{questionLength} Questions To Test Your React Level</h3>
            <button className="btn btn-ui" onClick={()=>dispatch({type:"startQuiz"})}>Start Quiz!</button>
        </div>
    )
}

export default StartScreen
