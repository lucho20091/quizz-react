import './App.css';
import Home from './components/Home'
import Quiz from './components/Quiz'
import { useState, useEffect } from 'react'



function App() {
  const [home, setHome] = useState(true)


  function startQuiz(error){
    if (error){
      window.location.reload()
    } else {
      setHome(prevState => !prevState)
    }
  }

  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setQuiz(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(() => {
      fetchData();
    }, 2000); // Delay of 2 seconds

    return () => clearTimeout(debounceTimeout); // Clean up the timeout on unmount
  }, []);

  let newElem
  if (quiz){
    newElem =  quiz.map((item, index) => {
      return( 
      <Quiz
        key={index}
        question={item.question}
        correct_answer={item.correct_answer}
        all_answers={[item.correct_answer, ...item.incorrect_answers].sort(() => Math.random() -0.5)}
        indexMap={index}
    />)
    })
  }

  return (
    <div className="App">
      {home && <Home startQuiz={startQuiz} loading={loading} error={error}/>}
      <div className="Main">
        {!home && newElem }
        {!home && <button className="quizz-btn">Check answers</button>}
      </div>
    </div>
  );
}

export default App;
