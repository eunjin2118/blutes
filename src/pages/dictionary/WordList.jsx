import React, { useState } from 'react';
import styled from 'styled-components';

// WordList 컴포넌트 스타일링
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  max-width: 800px;
  width: 100%;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Word = styled.h3`
  margin-bottom: 10px;
`;

const Meaning = styled.p`
  margin-bottom: 10px;
`;

const Sentence = styled.p`
  font-style: italic;
`;

// WordList 컴포넌트
const WordList = () => {
  const [words, setWords] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newWord = {
      abbreviation: form.abbreviation.value,
      meaning: form.meaning.value,
      sentence: form.sentence.value,
    };
    setWords((prevWords) => [...prevWords, newWord]);
    form.reset();
  };

  return (
    <Container>
      <CardContainer>
        {words.map((word, index) => (
          <Card key={index}>
            <Word>{word.abbreviation}</Word>
            <Meaning>{word.meaning}</Meaning>
            <Sentence>{word.sentence}</Sentence>
          </Card>
        ))}
      </CardContainer>

      <AddWordForm onSubmit={handleFormSubmit} />
    </Container>
  );
};

// AddWordForm 컴포넌트 (이전에 작성한 코드 재활용)
const AddWordForm = ({ onSubmit }) => {
  return (
    <Form onSubmit={onSubmit}>
      {/* 입력 필드와 버튼 등의 내용 */}
    </Form>
  );
};

// 나머지 코드는 이전에 작성한 AddWordForm 컴포넌트와 동일하므로 생략

export default WordList;
