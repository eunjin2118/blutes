import React from 'react'
import { useState, useEffect } from "react";
import backimg from "../img/company3.jpg";
import Header from "./Header.js";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [isToggled, setIsToggled] = useState(false);
    const [userToggled, setUserToggled] = useState(false);
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name] : [event.target.value]}))
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/signup', values)
        .then(res => {
            if(res.data.Status === "Success"){
                navigate('/');
            } else{
                alert("Error");
            }
        })
        .then(err => console.log(err))
    }

  return (
    <>
    <Header
      isToggled={isToggled}
      userToggled={userToggled}
      setIsToggled={setIsToggled}
      setUserToggled={setUserToggled}
    />
    <div
      className="container"
      style={{
        margin: 0,
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start"
      }}
    >
      <div
        className="img-box"
        style={{
          width: "50vw", // 가로는 화면의 반만 차게
          height: "100vh", // 세로는 화면에 꽉 차게
          overflow: "hidden"
        }}
      >
        <div
          className="background-img"
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${backimg})`,
            backgroundSize: "cover",
            backgroundPosition: "left"
          }}
        ></div>
      </div>
      <div className="login-box" style={{ flex: 1, padding: "2rem" }}>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
      <label htmlFor="email" className="label1">이름</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder='Enter Name'
          onChange={handleInput}
        /><br />
        <label htmlFor="email" className="label2">이메일 또는 아이디</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder='Enter Email'
          onChange={handleInput}
        /><br />
        <label htmlFor="password" className="label3">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder='Enter Password'
          onChange={handleInput}
        /><br />
        <label htmlFor="confirm_password" className="label4">비밀번호 확인</label>
        <input
          type="password"
          id="confirm_password"
          name="confirm_password"
          placeholder='Enter password again'
          onChange={handleInput}
        /><br />
        <button type="submit">회원가입</button>
      </form>
      </div>
    </div>
  </>
  )
}

export default Signup
