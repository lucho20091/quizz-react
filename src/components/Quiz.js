import { useState, useEffect } from 'react'
import {decode} from 'html-entities'


export default function Quiz({question, correct_answer, all_answers, indexMap, getDatafromQuiz}) {

    const [answer, setAnswer] = useState("")
    const [answersObject, setAnswersObject] = useState([])

        useEffect(() => {
            const initialAnswers = all_answers.map((item, index) => ({
                id: indexMap + "answer" + index,
                value: decode(item)
            }));
            setAnswersObject(initialAnswers);
        }, [all_answers, indexMap]);

        const newElem = all_answers.map((item, index)=>{
            return (  
            <label className={`quizz-label ${answer.value === decode(item) ? "selected" : ""}`}>{decode(item)}
            <input type="radio"
                    name="answer"
                    id={indexMap + "answer" + index}
                    value={decode(item)}
                    onClick={displayId}
                    className="hidden"/>
        </label>)
        })

    function displayId(event) {
        const {value, name, id} = event.target
        const object = {
            value: decode(value),
            name: name,
            idanswer: id,
            idCorrectAnswer: answersObject.find((item) => item.value === decode(correct_answer)).id,
            correct: decode(correct_answer),
            isSelected: true
        }
        if (event.target.value === correct_answer) {
           object.isCorrect = true
        } else {
           object.isCorrect = false
        }
        setAnswer(object)
        getDatafromQuiz(answer)
    }
    
 

    return (
        <div className="quizz">
            <form className='quizz-form'>
            <legend className='quizz-legend'>{decode(question)}</legend>
            <div className="quizz-div">
                {newElem}
            </div>
            </form>
            <hr />
        </div>
    )
}
