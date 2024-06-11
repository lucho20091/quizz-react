import { useState } from 'react'

export default function Quiz(props) {
    console.log(props.dataQuiz[0])

    const [answer, setAnswer] = useState({})


    function displayId(event) {
        console.log(event.target.id)
        setAnswer({ answer: event.target.value})
    }

    return (
        <div className="quizz">
            <form className='quizz-form'>
            <legend className='quizz-legend'>{props.dataQuiz[0].question}</legend>
            <div className="quizz-div">
                <label className="quizz-label"> {props.dataQuiz[0].incorrect_answers[0]}
                    <input type="radio"
                            name="answer"
                            id={"answer1"}
                            value={props.dataQuiz[0].incorrect_answers[0]}
                            onClick={displayId}
                            className="hidden"/>
                </label>
                <label className="quizz-label"> {props.dataQuiz[0].incorrect_answers[1]}
                    <input type="radio"
                            name="answer"
                            id={"answer2"} 
                            value={props.dataQuiz[0].incorrect_answers[1]}
                            onClick={displayId}
                            className="hidden"/>
                </label>
                <label className="quizz-label"> {props.dataQuiz[0].incorrect_answers[2]}
                    <input type="radio"
                            name="answer"
                            value={props.dataQuiz[0].incorrect_answers[2]}
                            id={"answer3"} 
                            onClick={displayId}
                            className="hidden"/>
                </label>
                <label className="quizz-label"> {props.dataQuiz[0].correct_answer}
                    <input type="radio"
                            name="answer"
                            value={props.dataQuiz[0].correct_answer}
                            id={"answer4"} 
                            onClick={displayId}
                            className="hidden"/>
                </label>
            </div>
            </form>
            <hr />
        </div>
    )
}

