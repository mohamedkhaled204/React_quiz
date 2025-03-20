function progress({questionLength, index, points, totalPoints}) {
    return (
        <header className="progress">
            <progress max={questionLength} value={index} />
            <p>Question {index + 1} / {questionLength} </p>
            <p>{points} / {totalPoints} </p>
        </header>
    )
}

export default progress
