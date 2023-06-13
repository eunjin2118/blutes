import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from "../Header.js";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h1`
  margin-bottom: 20px;
`;

const PostButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const CommunityPage = () => {
  const posts = [
    { id: 1, author: '사용자1', date: '2023-06-10', title: '글 제목 1', views: 100 },
    { id: 2, author: '사용자2', date: '2023-06-09', title: '글 제목 2', views: 75 },
    { id: 3, author: '사용자3', date: '2023-06-08', title: '글 제목 3', views: 50 },
    { id: 4, author: '사용자4', date: '2023-06-07', title: '글 제목 4', views: 25 }
  ];

  return (
    <div>
      <Header />
        <PageContainer>
          <Heading>커뮤니티 페이지</Heading>
          <Link to="/post">
            <PostButton>작성하기</PostButton>
          </Link>
          <Table>
            <TableHead>
              <tr>
                <TableHeader>작성자</TableHeader>
                <TableHeader>작성일</TableHeader>
                <TableHeader>제목</TableHeader>
                <TableHeader>조회수</TableHeader>
              </tr>
            </TableHead>
            <TableBody>
              {posts.map(post => (
                <TableRow key={post.id}>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell>
                    <StyledLink to={`/post/${post.id}`}>{post.title}</StyledLink>
                  </TableCell>
                  <TableCell>{post.views}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </PageContainer>
    </div>
  );
};

export default CommunityPage;
