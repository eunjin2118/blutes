import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from "../Header";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Word = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  flex-direction: column;
`;

const Button = styled.button`
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 40px;
  width: 500px;
  height: 80px;
  border: 2px solid #071DA1;
  background-color: white;
  margin-top: 5%;
  transition: background-color 0.3s;

  &:hover {
    background-color: #eee;
  }

  &.correct {
    background-color: green;
    color: white;
  }

  &.wrong {
    background-color: red;
    color: white;
  }
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  justify-content: center;
  height: 100vh;
`;

const AnswerList = styled.ul`
  padding: 2%;
  list-style: none;
  margin: 0;
  width: 500px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* 그림자 추가 */
`;

const AnswerItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
`;

const AnswerText = styled.span`
  margin-right: 10px;
  flex-grow: 1;
  font-weight: bold;
`;

const CheckIcon = styled.span`
  color: green;
  margin-left: 5px;
`;

const CrossIcon = styled.span`
  color: red;
  margin-left: 5px;
`;

const BtnContainer = styled.div `
  display: flex;
  justify-content: center;
  margin-top: 3%;
`;

const ButtonOk = styled.button`
  width: 5vw;
  height: 3vh;
  font-size: 18px;
  margin-right: 4%;
  background-color: white;
  border: 0.5px solid #E0E0E0;
  border-radius: 5px;
  color: #E0E0E0;
`;

const ButtonRetry = styled.button`
  width: 5vw;
  height: 3vh;
  font-size: 18px;
  margin-right: 2%;
  background-color: gray;
  border: 0.5px solid #E0E0E0;
  border-radius: 5px;
  color: white;
`;

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [userToggled, setUserToggled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/quiz');
      const data = response.data.slice(0, 10);
      const quizzesData = data.map((item) => ({
        word: item.word,
        meanings: [item.meaning1, item.meaning2, item.meaning3],
        correctMeaning: item.answer,
        selectedMeaning: null,
      }));
      setQuizzes(quizzesData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMeaningSelect = (meaning) => {
    const selectedQuiz = quizzes[currentQuiz];
    if (selectedQuiz.selectedMeaning === null) {
      selectedQuiz.selectedMeaning = meaning;

      if (meaning === selectedQuiz.correctMeaning) {
        setScore((prevScore) => prevScore + 10);
      }

      setQuizzes([...quizzes]);
      setTimeout(() => {
        if (currentQuiz === quizzes.length - 1) {
          // 퀴즈가 끝났을 때
          setShowResult(true);
        } else {
          setCurrentQuiz((prevQuiz) => prevQuiz + 1);
        }
      }, 1000);
    }
  };

  const handleBtnOk = () => {
    navigate('/wordlist');
  };

  const handleRetry = () => {
    setCurrentQuiz(0);
    setScore(0);
    setShowResult(false);
    setQuizzes([]);
    fetchData();
  };

  if (quizzes.length === 0) {
    return <div>Loading...</div>;
  }

  if (showResult) {
    let feedbackText = '';
    if (score === quizzes.length * 10) {
      feedbackText = '모든 문제를 정확히 맞추셨습니다. 훌륭합니다!';
    } else if (score >= quizzes.length * 5) {
      feedbackText = '대부분의 문제를 맞추셨습니다. 잘하셨어요!';
    } else {
      feedbackText = '더 분발하세요. 다음에는 더 좋은 성적을 얻을 수 있을 거예요.';
    }

    return (
      <>
        <Header
        isToggled={isToggled}
        userToggled={userToggled}
        setIsToggled={setIsToggled}
        setUserToggled={setUserToggled}
      />
      <ResultContainer>
        <h2>점수: {score}점</h2>
        <p>{feedbackText}</p>
        <AnswerList>
          {quizzes.map((quiz, index) => (
            <AnswerItem key={index}>
              <AnswerText>
                <strong>{quiz.word}</strong> - {quiz.correctMeaning}
              </AnswerText>
              {quiz.selectedMeaning === quiz.correctMeaning ? (
                <CheckIcon>&#10003;</CheckIcon>
              ) : (
                <CrossIcon>&#10007;</CrossIcon>
              )}
            </AnswerItem>
          ))}
          <BtnContainer>
            <ButtonOk onClick={handleBtnOk}>확인</ButtonOk>
            <ButtonRetry onClick={handleRetry}>재시험</ButtonRetry>
          </BtnContainer>
        </AnswerList>
      </ResultContainer>
      </>
    );
  }

  const quiz = quizzes[currentQuiz];

  return (
    <>
      <Header
        isToggled={isToggled}
        userToggled={userToggled}
        setIsToggled={setIsToggled}
        setUserToggled={setUserToggled}
      />
      <Container>
        <QuizContainer>
          <Word>{quiz.word}</Word>
          <ButtonContainer>
            {quiz.meanings.map((meaning, index) => (
              <Button
                key={index}
                onClick={() => handleMeaningSelect(meaning)}
                className={
                  quiz.selectedMeaning === meaning
                    ? meaning === quiz.correctMeaning
                      ? 'correct'
                      : 'wrong'
                    : ''
                }
              >
                {meaning}
              </Button>
            ))}
            <div style={{ textAlign: 'center', margin: '5%', color: '#071DA1', fontWeight: 'bold' }}>
              {currentQuiz + 1} / {quizzes.length}
            </div>
          </ButtonContainer>
        </QuizContainer>
      </Container>
    </>
  );
};

export default QuizPage;