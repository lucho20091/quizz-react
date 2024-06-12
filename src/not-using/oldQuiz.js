import { useState, useEffect } from 'react'
import {decode} from 'html-entities'

export default function Quiz({question, correct_answer, incorrect_answers, indexMap}) {


    const [answer, setAnswer] = useState({
        question: question,
        correct_answer: correct_answer,
        isCorrect: false,
    })

    const [allAnswer, setAllAnswer] = useState("")

    useEffect(() => {
        const allanswers = [correct_answer, ...incorrect_answers];
        const randomAnswers = allanswers.sort(() => Math.random() - 0.5);
        setAllAnswer(renderRandomAnswers(randomAnswers));
    }, []); // Empty dependency array ensures this effect runs only once on mount

    
    function renderRandomAnswers(arr){
        return arr.map((item, index)=>{
            return (  
            <label className={`quizz-label ${answer?.id === indexMap + "answer" + index ? "selected" : ""}`}>{decode(item)}
            <input type="radio"
                    name="answer"
                    id={indexMap + "answer" + index}
                    value={decode(item)}
                    onClick={displayId}
                    className="hidden"/>
        </label>)
        })
    }



    function displayId(event) {
        const {value, name, id} = event.target
        const object = {
            value: value,
            name: name,
            id: id
        }
        if (event.target.value === correct_answer) {
           object.isCorrect = true
        } else {
           object.isCorrect = false
        }
        setAnswer(prevState => {
            return {
                ...prevState,
                isCorrect: object.isCorrect,
                selected: object.value,
                isSelected: true,
                id: object.id
            }
        })
      

    }
    
    return (
        <div className="quizz">
            <form className='quizz-form'>
            <legend className='quizz-legend'>{decode(question)}</legend>
            <div className="quizz-div">
                {allAnswer}
            </div>
            </form>
            <hr />
        </div>
    )
}

