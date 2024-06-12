export default function Home({startQuiz, loading, error}){
    return (
        <div className="home">
            <h1 className="home-h1">Quizzical</h1>
            <h2 className="home-h2">Some description if needed</h2>
            {loading && <p className="home-p">Loading Data... please wait</p>}
            {loading===false && error && <p className="home-p">{error}</p>}
            {loading===false && <button className="home-btn" onClick={() => startQuiz(error)}>{error ? "Refresh Page" : "Start Quiz"}</button>}
        </div>
    )
}