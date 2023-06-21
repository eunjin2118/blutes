import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faTimes } from "@fortawesome/free-solid-svg-icons";
import logoimg from "../img/blutes.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = ({ isToggled, userToggled, setIsToggled, setUserToggled, setUserName }) => {
  const userName = setUserName;
  const HeaderContainer = styled.div`
  @font-face {
    font-family: 'TitleFont';
    src: url('../fonts/TitleFont.ttf') format('truetype');
  }

  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  background-color: white;
  box-shadow: 1px 1px 2px gray;

  .logo-img {
    width: 70px;
    height: 70px;
  }

  .logo {
    display: flex;
    align-items: center;
    margin: 0.5rem 1rem;
    font-size: 2rem;
  }

  .header__menulist {
    list-style: none;
    display: flex;
  }

  .header__left {
    display: flex;
  }

  .header__right {
    list-style: none;
    display: flex;
  }

  .header__right div {
    margin: 0 1rem;
  }

  li {
    /* 폰트 적용 */
    font-family: 'TitleFont';
    padding: 0 1rem;
    color: black;
    font-size : 20px;
  }

  li:hover {
    color: #071DA1;
  }

  .toggle {
    display: none;
    font-size: 1.5rem;
    padding: 1rem 1rem;
  }

  .user {
    display: none;
    font-size: 1.5rem;
    padding: 1rem 1rem;
  }

  li button{
    background-color: white;
    border: #071DA1 1px solid;
    border-radius: 6px;
    color: #071DA1;
    height: 30px;
  }

  @media screen and (max-width: 1290px) {
    flex-wrap: wrap;

    .header__right {
      display: ${(props) => (props.userToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      background-color: white;
    }

    .header__menulist {
      display: ${(props) => (props.isToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      background-color: white;
    }

    .header__menulist li,
    .header__right li {
      margin: 1rem ;
      padding: 0;
    }

    .header__menulist li:hover {
      color: #071DA1;
    }

    .toggle {
      display: block;
    }

    .user {
      display: block;
    }
  }

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;

    .header__right {
      display: ${(props) => (props.userToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      background-color: white;
    }

    .header__menulist {
      display: ${(props) => (props.isToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      background-color: white;
    }

    .header__menulist li:hover {
      color: #071DA1;
    }

    .header__menulist li,
    .header__right li {
      margin: 1rem 0;
      padding: 0;
    }

    .toggle {
      display: block;
    }

    .user {
      display: block;
    }
  }`


  const navigate = useNavigate();
  const navigateToCommunity = () => {navigate('/community',{state : {value : userName}})};
  const navigateToDictionary = () => {navigate('/wordlist',{state : {value : userName}});};
  const navigateToEmployment = () => {navigate('/employment',{state : {value : userName}})};
  const navigateToCompanyLife = () => {navigate('/companylife',{state : {value : userName}});};
  const navigateToMain = () => {navigate('/main', {state : {value : userName}})};

  const handleLogOut = () => {
    axios.get('/logout')
    .then(res =>{
      navigate('/');
    }) .catch(err => console.log(err));
  }
  return (
    <HeaderContainer isToggled={isToggled} userToggled={userToggled}>
      {/* 햄버거 버튼(bar) */}
      <div
        className="toggle"
        onClick={() => {
          setIsToggled(!isToggled);
        }}
      >
        <FontAwesomeIcon icon={!isToggled ? faBars : faTimes} />
      </div>

      {/* Apple 로고 */}
      <div className="logo">
        <img className="logo-img" src={logoimg} onClick={navigateToMain} alt="logo" />
      </div>

      {/* User 버튼 */}
      <div
        className="user"
        onClick={() => {
          setUserToggled(!userToggled);
        }}
      >
        <FontAwesomeIcon icon={!userToggled ? faUser : faTimes} />
      </div>

      {/* 메뉴 리스트 */}
      <ul className="header__menulist">
        <li onClick={navigateToCommunity}>커뮤니티</li>
        <li onClick={navigateToDictionary}>약어사전·퀴즈</li>
        <li onClick={navigateToEmployment}>채용정보</li>
        <li onClick={navigateToCompanyLife}>회사라이프</li>
        <li>{userName}님 환영합니다</li>
        <li>
          <button onClick={handleLogOut}>로그아웃</button>
        </li>
        {/* <li>면접질문</li> */}
      </ul>

    </HeaderContainer>
  );
};

export default Header;
