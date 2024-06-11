export default function Home({startQuiz, loading}){
    console.log(loading)
    return (
        <div className="home">
            <h1 className="home-h1">Quizzical</h1>
            <h2 className="home-h2">Some description if needed</h2>
            {loading && <p className="home-p">Loading Data... please wait</p>}
            {loading===false && <button className="home-btn" onClick={startQuiz}>Start Quiz</button>}
        </div>
    )
}