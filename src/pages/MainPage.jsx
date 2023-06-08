import React, { useState, useEffect } from "react";
import styled from "styled-components";
import img1 from "../img/company.jpg";
import img2 from "../img/company2.jpg";
import img3 from "../img/company3.jpg";
import Header from "./Header.js";

function App() {
  const [isToggled, setIsToggled] = useState(false);
  const [userToggled, setUserToggled] = useState(false);

  const Body = styled.div``;

  const SlideshowContainer = styled.div`
    position: relative;
    width: 100%;
    height: auto;
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

  const Slideshow = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [img1, img2, img3];
    const interval = 3000;

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
      />
      <Slideshow />
    </Body>
  );
}

export default App;
