export default function Home({startQuiz}){
    return (
        <div className="home">
            <h1 className="home-h1">Quizzical</h1>
            <h2 className="home-h2">Some description if needed</h2>
            <button className="home-btn" onClick={startQuiz}>Start Quiz</button>
        </div>
    )
}