import './App.css';
import Home from './components/Home'
import Quiz from './components/Quiz'
import { useState, useEffect } from 'react'


function App() {
  const [home, setHome] = useState(true)
  const [quiz, setQuiz] = useState([{}])


  function startQuiz(){
    setHome(prevState => !prevState)
  }

  useEffect(()=>{
    setTimeout(()=>{
      fetch("https://opentdb.com/api.php?amount=1&id=538")
      .then(res => res.json())
      .then(data => setQuiz(data.results))
    }, 1000)
  }, [])



  console.log(quiz)

  return (
    <div className="App">
      {home && <Home startQuiz={startQuiz}/>}
      <div className="Main">
        {!home && <Quiz dataQuiz={quiz}/>}
        <button className="quizz-btn">Check answers</button>
      </div>

    </div>
  );
}

export default App;
