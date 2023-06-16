import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RiHeart2Line, RiChat1Line } from 'react-icons/ri';
import Header from "../Header.js";
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

// 스타일드 컴포넌트 정의 ...

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

const CommentWrapper = styled.div`
  width: 600px;
  height: auto;
`;

const CommentForm = styled.form`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const CommentInput = styled.input`
  width: 400px;
  height: 30px;
  margin-left: 10px;
`;

const CommentButton = styled.button`
  height: 35px;
  border-radius: 2px;
`;

const Comment = styled.div`
  margin-top: 10px;
`;

const CommentAuthor = styled.h2`
  font-size: 18px;
`;

const CommentContent = styled.p`
  margin-top: 5px;
`;

const CommunityDetail = (props) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { postId } = useParams();

  useEffect(() => {
    // 포스트 데이터 및 댓글 목록을 가져오는 함수
    const fetchPostAndComments = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`);
        const data = await response.json();
        console.log(data);
        const { id, title, post_data, board_content } = data.result[0];
        const comments = data.result.map(comment => ({
          nickname: comment.nickname,
          content: comment.comment_content
        }));

        setPost({ id, title, post_data, content: board_content });
        setComments(comments);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPostAndComments();
  }, [postId]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/comments/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: newComment,
          nickname: 'User', // Replace 'User' with the actual nickname of the commenter
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // 댓글 추가 후 새로운 댓글 목록을 가져옴
        const commentsResponse = await fetch(`http://localhost:3000/comments/${postId}`);
        const commentsData = await commentsResponse.json();

        const updatedComments = commentsData.result.map(comment => ({
          nickname: comment.nickname,
          content: comment.comment_content
        }));

        setComments(updatedComments);
        setNewComment('');
      } else {
        console.log('Error occurred while adding comment.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  // post페이지로 이동하는 버튼
  const handlePostButtonClick = () => {
    window.location.href = '/post'; // '/post' 경로로 이동
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
      <Wrapper style={{ width: '100%', justifyContent: "center" }}>
        <PageContainer>
          {post && (
            <div>
              <WriteDate className='WriteDate'>{post.post_date}</WriteDate>
              <TitleWrapper>
                <Title className='Title'>{post.title}</Title>
              </TitleWrapper>
              <Content
                className='Content'
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></Content>
              <ViewWrapper>
                <View className='View'>조회수 0</View>
                <IconWrapper>
                  <CommentIcon />
                  <HeartIcon />
                </IconWrapper>
              </ViewWrapper>
              <hr />
              <CommentWrapper>
                <CommentForm onSubmit={handleCommentSubmit}>
                  <CommentInput
                    type="text"
                    value={newComment}
                    onChange={handleCommentChange}
                  />
                  <CommentButton type="submit">댓글 작성</CommentButton>
                </CommentForm>
                <hr />
                {comments.map((comment, index) => (
                  <Comment key={index}>
                    <CommentAuthor>{comment.nickname}</CommentAuthor>
                    <CommentContent>{comment.content}</CommentContent>
                    <hr />
                  </Comment>
                ))}
              </CommentWrapper>
            </div>
          )}
        </PageContainer>
      </Wrapper>
    </div>
  );
};

export default CommunityDetail;
