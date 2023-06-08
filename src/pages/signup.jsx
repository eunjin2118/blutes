import React, { useState, useEffect } from "react";
import backimg from "../img/company3.jpg";
import Header from "./Header.js";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // this.state.username과 this.state.password를 사용하여 로그인 처리 로직을 구현합니다.
  };

  render() {
    const { isToggled, userToggled, setIsToggled, setUserToggled } = this.props;

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
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="username" className="label">
                이름
              </label>
              <br />
              <input
                type="text"
                id="username"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
                required
              />
              <br />
              <label htmlFor="email" className="label">
                이메일
              </label>
              <br />
              <input
                type="text"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                required
              />
              <br />
              <label htmlFor="password" className="label">
                비밀번호
              </label>
              <br />
              <input
                type="password"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                required
              />
              <br />
              <button type="submit">회원가입</button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Signup;
