import React, { useState, useEffect } from 'react';
import img1 from '../../img/image1.jpg';
import img2 from '../../img/image2.jpg';
import img3 from '../../img/image3.jpg';
import img4 from '../../img/image4.jpg';
import img5 from '../../img/image5.jpg';
import Header from '../Header';
import Slider from 'react-slick';
import styled from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StyledSlider = styled(Slider)`

  .slick-prev {
    z-index: 1;
    left: 30px;
  }

  .slick-next {
    right: 40px;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 30px;
    opacity: 0.5;
    color: white;
  }

  .slick-dots {
    display: flex;
    justify-content: center;
    bottom: 30px;
    color: white;

    li button:before {
      color: white;
    }

    li.slick-active button:before {
      color: white;
    }
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  max-width: 600px; /* 슬라이더의 최대 너비를 조정할 수 있습니다 */
  margin: 0 auto;
`;

const SlideImage = styled.img`
  width: 100%;
  height: auto;
`;

const CompanyLife = () => {
  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <SliderContainer>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <SlideImage src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </SliderContainer>
  );
};

export default CompanyLife;

