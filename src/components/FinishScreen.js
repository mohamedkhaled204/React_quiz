function FinishScreen({ totalPoints, points, highScore, dispatch }) {
    const percentage = (points / totalPoints) * 100; 
    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 100) emoji = "🎉";
    if (percentage >= 50 && percentage < 80) emoji = "🙃";
    if (percentage >= 0 && percentage < 50) emoji = "🤨";
    if (percentage === 0) emoji = "🤦‍♂️";
  
    return (
        <>
            <p className="result">
                {emoji} You Scored <strong>{points}</strong> out of {totalPoints} ({percentage.toFixed(0)}%)
            </p>
            <p className="highscore">Higher Score Is ({highScore}%)</p>
            <button className="btn btn-ui" onClick={()=>dispatch({type:"restart" })}>
                Restart Quiz!
            </button>
        </>
    );
}

export default FinishScreen;
