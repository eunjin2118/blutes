import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WordQuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedMeaning, setSelectedMeaning] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/quiz');
        const data = response.data.slice(0, 10);
        const quizzesData = data.map((item) => ({
          word: item.word,
          meanings: [item.meaning1, item.meaning2, item.meaning3],
          correctMeaning: item.correctMeaning,
        }));
        setQuizzes(quizzesData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleNextQuestion = () => {
    if (currentQuizIndex === quizzes.length - 1) {
      setShowResults(true);
    } else {
      setCurrentQuizIndex((prevIndex) => prevIndex + 1);
      setSelectedMeaning(null);
    }
  };

  const handleSelectMeaning = (meaning) => {
    setSelectedMeaning(meaning);
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedMeaning(null);
    setShowResults(false);
  };

  if (quizzes.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuiz = quizzes[currentQuizIndex];
  const { word, meanings, correctMeaning } = currentQuiz;

  return (
    <div>
      <h2>Word Quiz</h2>
      {!showResults ? (
        <>
          <p>Question {currentQuizIndex + 1}</p>
          <p>Word: {word}</p>
          <p>Select one meaning:</p>
          <ul>
            {meanings &&
              meanings.map((meaning, index) => (
                <li key={index}>
                  <button
                    className={selectedMeaning === meaning ? 'selected' : ''}
                    onClick={() => handleSelectMeaning(meaning)}
                    disabled={selectedMeaning !== null}
                  >
                    {meaning}
                  </button>
                </li>
              ))}
          </ul>
          <div>
            <p>Selected meaning:</p>
            <p>{selectedMeaning}</p>
            <button onClick={handleNextQuestion} disabled={selectedMeaning === null}>
              {currentQuizIndex === quizzes.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        </>
      ) : (
        <div>
          <h2>Quiz Results</h2>
          <p>You have completed the quiz!</p>
          {quizzes.map((quiz, index) => (
            <div key={index}>
              <p>Question {index + 1}</p>
              <p>Word: {quiz.word}</p>
              <p>Correct Meaning: {quiz.meanings[quiz.correctMeaning]}</p>
              <p>Your Selected Meaning:</p>
              <p>{selectedMeaning}</p>
              <hr />
            </div>
          ))}
          <button onClick={handleRestartQuiz}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
};

export default WordQuizPage;
