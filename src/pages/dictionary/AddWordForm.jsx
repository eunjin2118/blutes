import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import axios from "axios";

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

const AddWordForm = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    word: '',
    meaning: '',
    sentence: '',
    date: Date.now()
  });

  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name] : [event.target.value]}))
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('addworld', values)
    .then(res => {
        if(res.data.Status === "Success"){
            navigate('/wordlist');
        } else{
            alert("Error");
        }
    })
    .then(err => console.log(err))
}

  return (
    <>
      <Header />
      <Container>
        <Title>단어 추가하기</Title>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="word">단어:</Label>
          <TextInput
            type="text"
            id="word"
            name="word"
            onChange={handleInput}
            required
          />

          <Label htmlFor="meaning">의미:</Label>
          <TextInput
            type="text"
            id="meaning"
            name="meaning"
            onChange={handleInput}
            required
          />

          <Label htmlFor="sentence">예시 문장:</Label>
          <TextArea
            id="sentence"
            name="sentence"
            rows="4"
            onChange={handleInput}
            required
          ></TextArea>

          <SubmitButton type="submit" value="추가" />
        </Form>
      </Container>
    </>
  );
};

export default AddWordForm;
