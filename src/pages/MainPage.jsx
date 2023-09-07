import React, { useState, useEffect } from "react";
import styled from "styled-components";
import img1 from "../img/image1.jpg";
import img2 from "../img/image2.jpg";
import img3 from "../img/image3.jpg";
import img4 from "../img/image4.jpg";
import img5 from "../img/image5.jpg";
import Header from "./Header.js";
import axios from "axios";
import { useLocation } from "react-router-dom/dist/umd/react-router-dom.development";

function App() {
  const [isToggled, setIsToggled] = useState(false);
  const [userToggled, setUserToggled] = useState(false);
  const [userName, setUserName] = useState('');

  const Body = styled.div``;

  const SlideshowContainer = styled.div`
    position: relative;
    margin-top: 112px;
    width: 100%;
    height: 100%;
    padding-bottom: 46%; /* 16:9 비율을 유지하기 위한 값 */
    object-fit: cover;
    overflow: hidden;
  `;

  const SlideshowImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  `;

  const location = useLocation();
  const name = location.state.value;
  console.log(name);

  const Slideshow = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [img1, img2, img3, img4, img5];
    const interval = 3000;

    useEffect(()=>{
      const userData = async () => {
        try{
          const res = await axios.get("auth");
          console.log(res);
        } catch (err){console.log(err)}
      }
      userData();
    }, [])


    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, interval);

      return () => {
        clearInterval(intervalId);
      };
    }, [images.length]);

    return (
      <SlideshowContainer>
        <SlideshowImage src={images[currentImageIndex]} alt="Slideshow" />
      </SlideshowContainer>
    );
  };

  return (
    <Body>
      <Header
        isToggled={isToggled}
        userToggled={userToggled}
        setIsToggled={setIsToggled}
        setUserToggled={setUserToggled}
        setUserName={name}
      />
      <Slideshow />
    </Body>
  );
}

export default App;
