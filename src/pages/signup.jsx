import React from 'react';
import { useState } from 'react';
import backimg from '../img/loginbg.png';
import Header from './Header.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ImageBox = styled.div`
  width: 50vw;
  height: 100vh;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${backimg});
  background-size: cover;
  background-position: left;
`;

const LoginBox = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h1`
  margin-bottom: 1rem;
`;

const Form = styled.form`
  width: 50%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-left: 2%;
  margin-right: 2%;
  padding: 0.8rem;
  margin-top: 20px;
  border: none;
  color: white;
  background-color: #071DA1;
`;

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: [event.target.value] }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('signup', values)
      .then((res) => {
        if (res.data.Status === 'Success') {
          navigate('/');
        } else {
          alert('이미 이름이 존재합니다. 다른 이름을 이용해주세요.');
        }
      })
      .then((err) => console.log(err));
  };

  return (
    <>
      <Container>
        <ImageBox>
          <BackgroundImage />
        </ImageBox>
        <LoginBox>
          <Heading>회원가입</Heading>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="name">이름</Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Name"
              onChange={handleInput}
            />
            <Label htmlFor="email">이메일 또는 아이디</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleInput}
            />
            <Label htmlFor="password">비밀번호</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleInput}
            />
            <SubmitButton type="submit">회원가입</SubmitButton>
          </Form>
        </LoginBox>
      </Container>
    </>
  );
};

export default Signup;
