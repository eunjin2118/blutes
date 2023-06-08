import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faTimes } from "@fortawesome/free-solid-svg-icons";
import logoimg from "../img/blutes.png";

const Header = ({ isToggled, userToggled, setIsToggled, setUserToggled }) => {
  const HeaderContainer = styled.div`
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
    background-color: white;
    box-shadow: 1px 1px 2px gray;

    .logo-img {
      width: 60px;
      height: 60px;
    }

    .logo {
      display: flex;
      align-items: center;
      margin: 0 2rem;
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
      padding: 0 1rem;
      color: black;
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
        margin: 1rem 0;
        padding: 0;
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
    }
  `;

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
        <img className="logo-img" src={logoimg} alt="logo" />
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
        <li>커뮤니티</li>
        <li>약어사전·퀴즈</li>
        <li>채용정보</li>
        <li>회사라이프</li>
        <li>면접질문</li>
      </ul>

      {/* User 메뉴 리스트 */}
      <ul className="header__right">
        <li>
          <button>로그인</button>
        </li>
      </ul>
    </HeaderContainer>
  );
};

export default Header;
