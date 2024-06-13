import './App.css';
import Home from './components/Home'
import Quiz from './components/Quiz'
import { useState, useEffect, useRef } from 'react'



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
  const [correct, setCorrect] = useState()



  
  // console.log(quiz[0]?.answerFromQuiz)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        for (let i = 0; i < data.results.length; i++) {
          const shufled = [data.results[i].correct_answer, ...data.results[i].incorrect_answers].sort(() => Math.random() - 0.5);
          data.results[i].id = i
          data.results[i].shufled = shufled
          data.results[i].answerFromQuiz= null
          data.results[i].showAnswer = false
        }
       
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
          idQuiz={item.id}
          key={item.id}
          question={item.question}
          correct_answer={item.correct_answer}
          all_answers={item.shufled} 
          indexMap={index}
          passData={passData}
          showAnswer={item.showAnswer}
      />)
      })
    
    }
  
  




  function passData(id, parametro){
    setQuiz(prevState => prevState.map(item => item.id === id ? {...item, answerFromQuiz: parametro} : item))
  }

  let arrayCorrect = []
  function showAnswer(){
    console.log("hello")
    setQuiz(prevState => prevState.map(item =>  ({...item, showAnswer: true}) ))
      for (let i = 0; i < quiz.length; i++){
        if (quiz[i].answerFromQuiz.isCorrect){
          arrayCorrect.push(1)
        }
      }
      console.log(arrayCorrect)
      setCorrect(arrayCorrect)
      }
  

  // let stateElem 
  // if (quiz){
  //   stateElem = quiz.map(item => <p>{JSON.stringify(item)}</p>)
  // }
  return (
    <div className="App">
      {/* <div className="state-app">
        <p>state App</p>
      {stateElem}
      </div> */}
      {home && <Home startQuiz={startQuiz} loading={loading} error={error}/>}
      <div className="Main">
        {!home && newElem }
        {!home && <button className="quizz-btn" onClick={showAnswer}>Check answers</button>}
        {!home && <a href="index.html" className="reload-a">reload</a>}
        {!home && quiz[0]?.showAnswer && <p className="score-p">{`your score is ${correct.length}/5`}</p>}
      </div>
    </div>
  );
}

export default App;
