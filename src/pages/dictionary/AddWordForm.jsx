import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f2f2f2;
  height: 100vh;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  max-height: 400px;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

const TextInput = styled.input`
  padding: 10px;
  border: none;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  resize: vertical;
  font-size: 14px;
  background-color: transparent;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: none;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  resize: vertical;
  font-size: 14px;
  background-color: transparent;
`;

const SubmitButton = styled.input`
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

const AddWordForm = ({ addWord }) => {
  const [abbreviation, setAbbreviation] = useState('');
  const [meaning, setMeaning] = useState('');
  const [sentence, setSentence] = useState('');
  const navigate = useNavigate();

  // addWord 함수 정의
  const handleAddWord = (newWord) => {
    addWord(newWord);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newWord = {
      id: Date.now(),
      word: abbreviation,
      meaning,
      sentence,
    };

    addWord(newWord); // 수정된 부분

    // 폼 초기화
    setAbbreviation('');
    setMeaning('');
    setSentence('');

    // 페이지 이동
    navigate('/WordList');
  }; 

  return (
    <>
      <Header />
      <Container>
        <Title>단어 추가하기</Title>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="abbreviation">단어:</Label>
          <TextInput
            type="text"
            id="abbreviation"
            name="abbreviation"
            value={abbreviation}
            onChange={(e) => setAbbreviation(e.target.value)}
            required
          />

          <Label htmlFor="meaning">의미:</Label>
          <TextInput
            type="text"
            id="meaning"
            name="meaning"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
            required
          />

          <Label htmlFor="sentence">예시 문장:</Label>
          <TextArea
            id="sentence"
            name="sentence"
            rows="4"
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            required
          ></TextArea>

          <SubmitButton type="submit" value="추가" />
        </Form>
      </Container>
    </>
  );
};

export default AddWordForm;
