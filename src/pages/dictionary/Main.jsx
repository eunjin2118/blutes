import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  margin: 0;
`;

const BigBox = styled.div`
  width: 800px;
  height: auto;
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  margin-top: 50px;
`;

const SmallBox = styled.div`
  width: 100px;
  height: 100px;
  /* border: 1px solid black; */
  box-sizing: border-box;
  padding: 10px;
  margin: 5px;
  flex-basis: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:nth-child(1) {
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  &:nth-child(2) {
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  &:nth-child(3),
  &:nth-child(4) {
    flex-basis: calc(50% - 15px);
    margin-top: 20px;
    height: 200px;
    border: 1px solid black;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  border-radius: 20px;
`;

const SearchIcon = styled.img`
  position: absolute;
  width: 17px;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  margin: 0;
`;

const MyWordsTable = styled.table`
  width: 100%;
  margin-top: 10px;
  border-collapse: collapse;
  caption-side: top;
`;

const TableCaption = styled.caption`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px;
`;

const Cap1 = styled.h2`
  font-size: 18px;
  font-weight: bold;
  flex-grow: 1;
`;

const Cap2 = styled.a`
  font-size: 14px;
  color: blue;
  text-decoration: none;
  margin-left: 20px;
`;


const Th = styled.th`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const TodayWordsContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  height: auto;
  width: 700px;
  border: 1px solid black;
  margin-left: 30px;
  margin-right: 50px;
`;

const ReviewTitle = styled.div`
  text-align: left;
`;

function Main() {
  return (
    <MainContainer>
      <SearchContainer>
        <SearchInput type="text" placeholder="검색어 입력" />
        <SearchIcon src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" />
      </SearchContainer>
      <BigBox>
        <SmallBox>
          <TableCaption>
            <Cap1>내 단어장</Cap1>
            <Cap2 href="#">+ 더 보기</Cap2>
          </TableCaption>
          <MyWordsTable>
            <thead>
              <tr>
                <Th>약어</Th>
                <Th>의미</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>HTML</Td>
                <Td>Hypertext Markup Language</Td>
              </tr>
              <tr>
                <Td>CSS</Td>
                <Td>Cascading Style Sheets</Td>
              </tr>
              <tr>
                <Td>API</Td>
                <Td>Application Programming Interface</Td>
              </tr>
              {/* 추가적인 약어와 의미를 여기에 추가할 수 있습니다 */}
            </tbody>
          </MyWordsTable>
        </SmallBox>
        <SmallBox>
          <div className="tit">
            <h3 style={{ textAlign: 'left' }}>오늘의 약어</h3>
          </div>
          <TodayWordsContainer>
            <h2>약어</h2>
            <p>의미</p>
            <p>"예문"</p>
          </TodayWordsContainer>
        </SmallBox>
        <SmallBox>
          <ReviewTitle>약어 복습 &gt;</ReviewTitle>
        </SmallBox>
        <SmallBox>
          <div className="quiztit">약어 퀴즈 &gt;</div>
        </SmallBox>
      </BigBox>
    </MainContainer>
  );
}

export default Main;
