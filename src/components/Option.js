function Option({ questions, answer, dispatch }) {
    const HasAnswer = answer !== null;

    return (
        <div className="options">
            {questions.options.map((option, index) => (
                <button
                    className={`btn btn-option 
                        ${index === answer ? "answer" : ""} 
                        ${HasAnswer ? (questions.correctOption === index ? "correct" : "wrong") : ""}`}
                    key={index}
                    disabled={HasAnswer}
                    onClick={() => dispatch({ type: "newAnswer", payload: index })}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}

export default Option;
