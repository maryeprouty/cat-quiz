import { useState, useRef, useEffect } from 'react'
import './App.css'
import Quiz from './components/Quiz.jsx';
import personalities from './data/personalities.json' with { type: 'json' };

function App() {

  const [quizCompleted, setQuizCompleted] = useState(false);
  const [topCat, setTopCat] = useState(null);
  const quizResult = useRef();

  let personality = personalities.find(cat => cat.name === topCat);

  const handleSubmit = (result) => {
    setQuizCompleted(true);
    setTopCat(result);
  };

  const reset = () => {
    setQuizCompleted(false);
    setTopCat(null);
  }

  useEffect(() => {
    if (quizCompleted) {
      quizResult.current.focus();
    }
  }, [quizCompleted]);

  return (
    <main>
      <h1>
        <img src='../assets/cat_silhouette.png' alt='' width={50}></img>
        Cat Personality Quiz
      </h1>
      {!quizCompleted && <Quiz handleSubmit={handleSubmit}></Quiz>}
      {quizCompleted &&
        <div className='card'>
          <h2 ref={quizResult} tabIndex="-1">Congratulations, your cat personality is {topCat}!</h2>
          <img src={`../assets/${personality.imgSrc}`} alt={`${topCat} cat.`}></img>
          <p>{personality.description}</p>
          <div className='button-container'>
            <button onClick={reset}>Take the quiz again</button>
          </div>
        </div>
      }
    </main>
  )
}

export default App;
