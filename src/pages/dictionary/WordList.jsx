import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from "../Header.js";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchContainer = styled.div`
  position: relative;
  width: 700px;
  display: flex;
  align-items: center;
  margin: 50px auto;
`;

const SearchInput = styled.input`
  width: 100%;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  border-radius: 20px;
`;

const SearchIcon = styled.img`
  position: absolute;
  width: 17px;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  margin: 0;
`;

const Container = styled.div`
  display: grid;
  margin-left : 2.5%;
  margin-right: 2.5%;
  grid-template-columns: repeat(4, 1fr); /* 4개의 열로 구성 */
  grid-gap: 20px; /* 카드 간격 조정 */
`;

const Card = styled.div`
  align-item: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  border: 1px solid #071DA1;
`;

const Word = styled.h3`
  margin-bottom: 10px;
  color: #333;
`;

const Meaning = styled.p`
  margin-bottom: 10px;
  color: #555;
`;

const Sentence = styled.p`
  color: #777;
`;

const TopContainer = styled.div `
  display: flex; 
  justify-content: space-between;
`;

const MyWords = styled.h2` 
  margin-top: 50px;
  margin-left: 3%
`;

const Buttons = styled.div `
  margin-top: 50px;
  display: flex;
  margin-right: 3%
`;

const Addword = styled.button `
  width: 100px;
  height: 50px;
  background-color: #071DA1;
  border-radius: 8px;
  color: white;
  border: none;
`;

const StartQuiz = styled.button `
  width: 100px;
  height: 50px;
  margin-left: 1%;
  background-color: green;
  border-radius: 8px;
  color: white;
  border: none;
`;

const WordList = () => {
  const [words, setWords] = useState([]); // 단어 데이터 배열
  const [isToggled, setIsToggled] = useState(false);
  const [userToggled, setUserToggled] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get('getWords')
    .then((response) =>{
      console.log(response);
      const data = response.data; // 가져온 데이터
      setWords(data); // 단어 데이터 배열에 설정
    })
  }, []);

  // AddWordForm페이지로 이동하는 버튼
   const handlePostButtonClick = () => {
     navigate('/dictionary'); // '/dictionary' 경로로 이동
   };

   // WordQuizPage페이지로 이동하는 버튼
   const handleStartButtonClick = () => {
    navigate('/wordquiz'); // '/wordquiz' 경로로 이동
  };

  return (
    <>
      <Header
      isToggled={isToggled}
      userToggled={userToggled}
      setIsToggled={setIsToggled}
      setUserToggled={setUserToggled}
      />
      <SearchContainer>
        <SearchInput type="text" placeholder="검색어 입력" />
        <SearchIcon src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" />
      </SearchContainer>
      <hr />
      <TopContainer>
        <MyWords>나의 단어장</MyWords>
        <Buttons>
          <Addword className='AddWord' onClick={handlePostButtonClick}>단어추가</Addword>
          <StartQuiz className='StartQuiz' onClick={handleStartButtonClick}>퀴즈보기</StartQuiz>
        </Buttons>
      </TopContainer>
      <br/>
      <Container>
        {words.map((word) => (
          <Card key={word.id}>
            <Word>{word.word}</Word>
            <Meaning>{word.meaning}</Meaning>
            <Sentence>{word.sentence}</Sentence>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default WordList;
