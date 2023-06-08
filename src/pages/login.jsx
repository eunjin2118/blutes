import React, { useState } from "react";
import styled from "styled-components";
import backimg from "../img/company3.jpg";
import Header from "./Header.js";

const Container = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ImgBox = styled.div`
  width: 50vw;
  height: 100vh;
  overflow: hidden;
`;

const BackgroundImg = styled.div`
  margin-top: 2px;
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

const Label = styled.label`
  &.label1 {
    /* styles for label1 */
  }

  &.label2 {
    /* styles for label2 */
  }

  &.label3 {
    /* styles for label3 */
  }

  &.label4 {
    /* styles for label4 */
  }
`;

const LoginButton = styled.button`
  /* styles for the login button */
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isToggled, setIsToggled] = useState(false);
  const [userToggled, setUserToggled] = useState(false);
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Use username and password for login logic
  };

  return (
    <>
      <Header
        isToggled={isToggled}
        userToggled={userToggled}
        setIsToggled={setIsToggled}
        setUserToggled={setUserToggled}
      />
      <Container>
        <ImgBox>
          <BackgroundImg />
        </ImgBox>
        <LoginBox>
          <h1>로그인</h1>
          <form onSubmit={handleSubmit}>
            <Label htmlFor="username" className="label1">이메일 또는 아이디</Label><br />
            <Input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleInputChange}
              required
            />
            <Label htmlFor="password" className="label2">비밀번호</Label><br />
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              required
            />
            <Label className="label3">아이디/비밀번호 찾기</Label>
            <Label className="label4">회원가입</Label><br />
            <LoginButton type="submit">로그인</LoginButton>
          </form>
        </LoginBox>
      </Container>
    </>
  );
};

export default Login;
