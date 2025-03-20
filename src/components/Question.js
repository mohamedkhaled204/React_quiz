import Option from "./Option"

function Question({questions, answer, dispatch}) {
    return (
        <div>
            <h4>{questions.question}</h4>
            <Option questions={questions} answer={answer} dispatch={dispatch} />
        </div>
    )
}

export default Question
