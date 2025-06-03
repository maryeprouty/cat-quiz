import { useState, useRef, useEffect } from 'react'; 
import { calculateScore } from '../helpers/score-calculator.helper.js';
import questions from '../data/questions.json' with { type: 'json' };

export default function Quiz({handleSubmit}) {

    const [num, setNum] = useState(0);
    const [selected, setSelected] = useState(questions[0].possibilities[0].value);
    const [answers, setAnswers] = useState([]);
    const fieldRef = useRef();
    const prevRef = useRef();

    useEffect(() => {
        if (num === 0) {
            prevRef.current.setAttribute('disabled', true);
        } else {
            prevRef.current.removeAttribute('disabled');
        }
    }, [num]);

    const nextQuestion = () => {
        answers[num] = selected;
        setAnswers(answers);
        setNum(num + 1);
        setSelected(answers.length >= num + 2 ? answers[num + 1] : questions[num + 1]?.possibilities[0]?.value);

        focusInput();
    }

    const prevQuestion = () => {
        answers[num] = selected;
        setAnswers(answers);
        setSelected(answers[num - 1]);
        setNum(num - 1);

        focusInput();
    }

    const handleChange = (event) => {
        setSelected(event.target.value);
    }

    const submitAnswers = (event) => {
        event.preventDefault();
        answers[num] = selected;
        let topCat = calculateScore(answers);
        handleSubmit(topCat);
    }

    const focusInput = () => {
        const firstRadioButton = fieldRef.current.querySelector('input');
        firstRadioButton.focus();
    }

    const options = questions[num].possibilities.map((option) => {
        const checked = selected === option.value;
        return (
        <div key={option.id} className='radio-btn'>
            <input type='radio' id={'opt' + option.id} value={option.value} checked={checked} onChange={handleChange}></input>
            <label htmlFor={'opt' + option.id}>{option.label}</label>
        </div>
        )
    });

  const numQuestions = questions.length;

    return (
        <>
            <form className='card' onSubmit={submitAnswers}>
                <div className='questions'>
                    <h2>Question {num + 1} of {numQuestions}</h2>
                    <fieldset ref={fieldRef} tabIndex='-1' aria-labelledby='legend'>
                        <legend id='legend'>{num + 1}. {questions[num].question}</legend>
                        {options}
                    </fieldset>
                </div>
                <div className='controls'>
                    <div className='button-container'>
                        <button ref={prevRef} type='button' id='prev' onClick={prevQuestion}>Previous</button>
                        {num + 1 < numQuestions && <button type='button' id='next' onClick={nextQuestion}>Next</button>}
                        {num + 1 === numQuestions && <button type='submit'>Submit</button>}
                    </div>
                </div>
            </form>
        </>
    );

}