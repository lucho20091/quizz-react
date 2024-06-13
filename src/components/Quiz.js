import { useState, useEffect } from 'react'
import {decode} from 'html-entities'


export default function Quiz({question, correct_answer, all_answers, indexMap, passData, idQuiz, showAnswer}) {

    const [answer, setAnswer] = useState("")
    const [answersObject, setAnswersObject] = useState([])

    // let stateElem 
    // if (answer){
    //   stateElem =  ( <p>{JSON.stringify(answer)}</p> )
    // }

    // let stateElem2
    // if (answersObject){
    //     stateElem2 = answersObject.map(item => (<p>{JSON.stringify(answersObject)}</p>))
    // }

        useEffect(() => {
            const initialAnswers = all_answers.map((item, index) => ({
                id: indexMap + "answer" + index,
                value: decode(item)
            }));
            setAnswersObject(initialAnswers);
        }, [all_answers, indexMap]);


        let newElem
        if (answersObject){
             newElem = answersObject.map((item, index)=>{
                return (  
                <label 
                className={`quizz-label ${answer.value === decode(item.value) ? "selected" : ""}
                ${showAnswer && answer.idCorrectAnswer === item.id ? "correct" : ""}`}
                >{decode(item.value)}
                <input type="radio"
                        name="answer"
                        id={indexMap + "answer" + index}
                        value={decode(item.value)}
                        onClick={displayId}
                        className="hidden"/>
            </label>)
            })
        }
   

    function displayId(event) {
        const {value, id} = event.target
        const object = {
            value: decode(value),
            idanswer: id,
            idCorrectAnswer: answersObject.find((item) => item.value === decode(correct_answer)).id,
            isSelected: true
        }
        if (event.target.value === correct_answer) {
           object.isCorrect = true
        } else {
           object.isCorrect = false
        }
        setAnswer(object)
        }
    
    

useEffect(() => {
    passData(idQuiz, {
        selected: answer.value, 
        idAnswer: answer.idanswer, 
        correctAnswerId: answer.idCorrectAnswer,
        isSelected: answer.isSelected,
        isCorrect: answer.isCorrect
    })
}, )


    return (
        <div className="quizz">
            {/* <div className="state-quiz">
                <p>answers quiz</p>
                {stateElem}
            </div>
            <div className="state-quiz2">
                <p>answerobject quiz</p>
                {stateElem2}
            </div> */}
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
