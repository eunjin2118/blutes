import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RiHeart2Line, RiChat1Line } from 'react-icons/ri'; // 하트와 댓글 아이콘 추가
import Header from "../Header.js";

// 스타일드 컴포넌트 정의
const SearchContainer = styled.div`
  position: relative;
  width: 700px;
  margin: 50px auto;
  display: flex;
  align-items: center;
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
  right: 20%;
  transform: translateY(-50%);
  margin: 0;
`;

const PostButton = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #071DA1;
  color: #fff;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  word-break: keep-all;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  flex-grow: 1;
`;

const WriteDate = styled.p`
  margin: 0 0 0 460px; // 왼쪽 마진만 설정
  text-align: right;
`;

const Content = styled.p`
  text-align: center;
  margin-top: 40px;
`;

const View = styled.p`
  align-self: flex-start;
  margin-bottom: 0;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px; /* 아이콘과 조회수 간격 조정 */
  align-self: flex-end; /* 아이콘을 오른쪽으로 정렬 */
`;

const HeartIcon = styled(RiHeart2Line)`
  margin-right: 13px;
`;

const CommentIcon = styled(RiChat1Line)`
  margin-right: 8px;
`;  

const PageContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 600px;
  height: auto;
  border: 1px solid #E0E0E0;
  margin-left: auto;
  margin-right: 10px; /* Updated margin-right */
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
`;

const TodayContainer = styled.div`
  margin-top: 40px;
  width: 200px;
  height: 200px;
  border: 1px solid #E0E0E0;
  margin-left: 10px; /* Updated margin-left */
  margin-right: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
`;

const Wrapper = styled.div`
  display: flex;
`;

const Todate = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  color: #E0E0E0;
`;

const TodayVisitor = styled.div`
  margin-top: 10px;
  margin-left: 20px; 
`;

const VisitorCount = styled.p`
  margin-left: 20px; 
  color: #071DA1;
`;

const TodayComment = styled.p`
  margin-top: 10px;
  margin-left: 20px; 
`;

const CommenterCount = styled.p`
  margin-left: 20px;
  color: #071DA1;
`;
const CommunityPage = () => {
  return (
    <div>
      <Header />
      <SearchContainer>
        <SearchInput type="text" placeholder="검색어 입력" />
        <SearchIcon src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" />
        <PostButton>작성하기</PostButton>
      </SearchContainer>
      <hr />
      <Wrapper>
        <PageContainer>
          <TitleWrapper>
            <Title className='Title'>제목</Title>
            <WriteDate className='WriteDate'>작성일자</WriteDate>
          </TitleWrapper>
          <Content className='Content'>내용</Content>
          <View className='View'>조회수 0</View>
          <IconWrapper>
            <CommentIcon />
            <HeartIcon />
          </IconWrapper>
          <hr/>
        </PageContainer>
        <TodayContainer>
          <Todate className='Todate'>2023.06.14</Todate>
          <TodayVisitor className='TodayVisitor'>오늘의 방문자</TodayVisitor>
          <VisitorCount className='VisitorCount'>00명</VisitorCount>
          <TodayComment className='TodayComment'>오늘의 포스트/답글</TodayComment>
          <CommenterCount className='CommenterCount'>00명</CommenterCount>
        </TodayContainer>
    </Wrapper>
    </div>
  );
};

export default CommunityPage;
