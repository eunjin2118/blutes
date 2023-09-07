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
import { useLocation } from 'react-router-dom/dist/umd/react-router-dom.development';

const StyledSlider = styled(Slider)`

  .slick-slider{  
    width: 100%;
    background-color: #e9ecef;
    margin: 0 10px;
  }
  .slick-slide{
    img{
      object-fit: cover;
      width: 100%;
      height: 300px;
    }
  }

  .slick-prev {
    z-index: 1;
    left: 30px;
  }

  .slick-next {
    right: 40px;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 50px;
    opacity: 0.5;
    color: #E0E0E0;
  }

  .slick-dots {
    display: flex;
    justify-content: center;
    bottom: 30px;
    color: #071DA1;

    li button:before {
      color: gray;
    }

    li.slick-active button:before {
      color: #071DA1;
    }
  }
`;

const Container = styled.div `
  width: 100%;
  background: #E0E0E0;
`

const SliderContainer = styled.div`
  width: 100%;
  max-width: 95%;
  margin: 0 auto;
  margin-top: 4%;
`;

const SlideImage = styled.img`
  width: 100%;
  height: auto;
`;

const MainContainer = styled.div `
  margin-top: 3%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 100%;
  height: auto;
`;

const Card = styled.div`
  font-family: 'ContentFont2';  
  background: ${(props) => props.cardColor || '#FFFFFF'};
  margin: 10px;
  padding: 16px;
  width: 160px;
  height: 250px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  align-self: ${(props) => (props.index % 2 === 0 ? 'auto' : 'center')};

  @media (max-width: 600px) {
    width: calc(100% - 40px);
  }
`;

const cardContents = [
  {
    title: '첫 출근시 복장은 어떻게 해야 할까?',
    content: (
      <>
        첫 출근은 조금 깔끔하게,<br /> 
        인터넷에 회사 검색해보기,<br /> 
        노트나 필기구 들고 다니기(첫 출근에 꼭 필수)<br />
      </>
    ),
    color: '#64B5F6',
    fontSize: '18px',
  },
  { 
    title: '첫 출근 시 식사는 어떻게 하는 것이 좋을까?',
    content: (
      <>
        점심 약속 잡지 말기!<br /> 
        점심 메뉴 몇 개 생각해가는 것이 좋다!
      </>
    ),
    color: '#1976D2',
    fontSize: '18px',
   },
  { 
    title: (
        <>
        회사에서 업무를 받았을 때 갖춰야 할 점이나<br/>
        지향하는 태도가 있을까?
        </>
    ),
    content: (
        <>
         안된다고 말하는 개발자보다는 항상 긍정적인 마인드로 할 수 있다고 말해주는 개발자<br/>
         (물어서라도 방법을 찾아오는 자세가 중요하다)<br/>
         마감일 잘 지키기!<br/>
         도움을 받을 때는 일찍 요청하기
        </>
    ), 
    color: '#0D47A1', 
    fontSize: '17px'
   },
  { 
    title: (
        <>
        회사에 갔을 때 보통 갓허브 계정을 새로 생성하나요?
        </>
    ),
    content: (
        <>
         개인의 자유지만 기존의 것을 많이 사용한다 보통은 자유!<br/>
         보안상의 문제 아니면 굳이 새로 만들 필요 없음
        </>
    ), 
    color: '#82B1FF', 
    fontSize: '18px'
   },
  { title: (
        <>
        출퇴근 거리는 어느 정도가 적당할까?<br/>
        회사에서 권장하는 출퇴근 거리가 있을까?
        </>
    ), 
    content: (
        <>
         회사 권장 거리는 없음<br/>
        하지만 1시간을 넘기지 않는 것이 좋음 <br/>
        그렇지 않으면 너무 힘들다..
        </>
    ), 
    color: '#2196F3', 
    fontSize: '18px' 
  },
  { 
    title: (
        <>
        회사 업무에 빠르게 적응하는 방법이 있을까?
        </>
    ), 
    content: (
        <>
         부트캠프, 세미나 참여!<br/>
         팀원들이 많이 도움을 준다
        </>
    ),
    color: '#BBDEFB', 
    fontSize: '18px' 
  },
];

const CardComponent = ({ title, content, color, fontSize }) => (
  <Card style={{ background: color, fontSize, color: 'white' }}>
    <h3>{title}</h3>
    <p>{content}</p>
  </Card>
);


const CardContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1300px; /* Adjust the max-width as per your requirement */

  ${Card} {
    flex-basis: calc(50% - 20px); /* Adjust the width as per your requirement */
  }
`;

const CompanyLife = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [userToggled, setUserToggled] = useState(false);
  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
  ];

  const location = useLocation();
  const name = location.state.value;

  const PrevArrow = (props) => (
    <button {...props} className="slick-prev">
      이전
    </button>
  );

  const NextArrow = (props) => (
    <button {...props} className="slick-next">
      다음
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
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
      <Container>
        <SliderContainer>
          <StyledSlider {...settings}>
            {images.map((image, index) => (
              <div key={index}>
                <SlideImage src={image} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </StyledSlider>
        </SliderContainer>
      </Container>
      <MainContainer>
        <CardContainer>
          {cardContents.map((card, index) => (
            <CardComponent
              key={index}
              title={card.title}
              content={card.content}
              color={card.color}
              fontSize={card.fontSize}
            />
          ))}
        </CardContainer>
      </MainContainer>
    </>
  );
};

export default CompanyLife;
