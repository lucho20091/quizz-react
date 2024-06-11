import './App.css';
import Home from './components/Home'
import Quiz from './components/Quiz'
import { useState, useEffect } from 'react'


function App() {
  const [home, setHome] = useState(true)


  function startQuiz(){
    setHome(prevState => !prevState)
  }

  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
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

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  // if (!quiz) {
  //   return <div>No data available</div>;
  // }

  console.log(quiz)
  console.log(loading)
  return (
    <div className="App">
      {home && <Home startQuiz={startQuiz} loading={loading}/>}
      {loading && <div>Loading...</div>}
      <div className="Main">
        {!home && <Quiz dataQuiz={quiz}/>}
        <button className="quizz-btn">Check answers</button>
      </div>

    </div>
  );
}

export default App;
