import React, { useState } from 'react';
import styled from 'styled-components';
import Header from "../Header.js";
import AddWordForm from './AddWordForm';

const Container = styled.div`
  margin-top: 8%;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4개의 열로 구성 */
  grid-gap: 20px; /* 카드 간격 조정 */
`;

const Card = styled.div`
  align-item: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
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

const WordList = () => {
  const [words, setWords] = useState([]); // 단어 데이터 배열

  const addWord = (newWord) => {
    setWords([...words, newWord]);
  };

  return (
    <>
      <Header />
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
