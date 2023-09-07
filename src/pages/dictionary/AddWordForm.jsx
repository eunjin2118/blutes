import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import axios from "axios";
import { useLocation } from 'react-router-dom/dist/umd/react-router-dom.development';
import bg from "../../img/addwordbg.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: 100vh;
  margin-top: -5%;
`;

const Title = styled.h1`
  font-family: 'TitleFont';
  margin-bottom: 20px;
  color: #333;
  text-align: center;
  font-family: 'TitleFont';
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
  font-family: 'ContentFont2';
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
  font-family: 'ContentFont2';
  padding: 12px;
  background-color: #071DA1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

const Body = styled.div`
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
`;

const AddWordForm = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [userToggled, setUserToggled] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const name = location.state.value;

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
            navigate('/wordlist', { state: { value: name } });
        } else{
            alert("Error");
        }
    })
    .then(err => console.log(err))
  };

  return (
    <>
      <Header
        isToggled={isToggled}
        userToggled={userToggled}
        setIsToggled={setIsToggled}
        setUserToggled={setUserToggled}
        setUserName={name}
      />
      <Body>
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
      </Body>
    </>
  );
};

export default AddWordForm;
