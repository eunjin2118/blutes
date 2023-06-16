import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RiHeart2Line, RiChat1Line } from 'react-icons/ri'; // 하트와 댓글 아이콘 추가
import Header from "../Header.js";
import { useNavigate } from 'react-router-dom';

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
  margin-top: -5%;
  flex-grow: 1;
`;

const WriteDate = styled.p`
  margin-top: 0.5%;
  text-align: right;
`;

const Content = styled.p`
  text-align: left;
  margin-top: 10px;
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

const ViewWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [todayDate, setTodayDate] = useState(''); // 오늘 날짜 state 추가
  const navigate = useNavigate();


  useEffect(() => {
    // API를 통해 포스트 데이터를 가져오는 함수
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/getPosts');
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    const getTodayDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;
      setTodayDate(formattedDate);
    };

    fetchPosts();
    getTodayDate();
  }, []);

  // post페이지로 이동하는 버튼
  const handlePostButtonClick = () => {
    navigate('/post'); // '/post' 경로로 이동
  };

  // detail 페이지로 이동하는 버튼
  const handleDetailIconClick = (postId) => {
    navigate(`/detailcommunity/${postId}`);
  };

  return (
    <div>
      <Header />
      <SearchContainer>
        <SearchInput type="text" placeholder="검색어 입력" />
        <SearchIcon src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" />
        <PostButton onClick={handlePostButtonClick}>작성하기</PostButton>
      </SearchContainer>
      <hr />
      <Wrapper>
        <PageContainer>
          {posts &&
            posts.map((p) => (
              <div style={{ width: '100%' }} key={p.id}>
                <WriteDate className='WriteDate'>{p.post_date}</WriteDate>
                <TitleWrapper>
                  <Title className='Title'>{p.title}</Title>
                </TitleWrapper>
                <Content
                  className='Content'
                  dangerouslySetInnerHTML={{ __html: p.content }}
                ></Content>
                <ViewWrapper>
                  <View className='View'>조회수 0</View>
                  <IconWrapper>
                    <CommentIcon onClick={() => handleDetailIconClick(p.id)} />
                    <HeartIcon />
                  </IconWrapper>
                </ViewWrapper>
                <hr />
              </div>
            ))}
        </PageContainer>
        <TodayContainer>
          <Todate className='Todate'>{todayDate}</Todate>
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
