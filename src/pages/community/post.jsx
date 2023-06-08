// PostForm.js
import React, { useState } from 'react';
import styled from 'styled-components';
import Header from "../Header.js";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  max-width: 400px;
  padding: 50px;
  margin-top: -5%;
  border: 1px solid #071DA1;
  border-radius: 5px;
  text-align: center;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const TagInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

function PostForm({ onSubmit }) {
  const [isToggled, setIsToggled] = useState(false);
  const [userToggled, setUserToggled] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, tags });
    setTitle('');
    setContent('');
    setTags('');
  };

  return (
    <div>
      <Header
        istoggled={isToggled}
        usertoggled={userToggled}
        setIsToggled={setIsToggled}
        setUserToggled={setUserToggled}
      />
      <PageContainer>
        <FormContainer>
          <h2>글 작성</h2>
          <form onSubmit={handleSubmit}>
            <TitleInput
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목"
            />
            <ContentTextarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용"
            ></ContentTextarea>
            <TagInput
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="태그"
            />
            <SubmitButton type="submit">작성</SubmitButton>
          </form>
        </FormContainer>
      </PageContainer>
    </div>
  );
}

export default PostForm;
