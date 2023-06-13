import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import Header from '../Header';
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const FormWrapper = styled.div`
  width: 80vw;
  max-width: 1000px;
  padding: 20px;
  background-color: #f8f8f8;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-top: 0;
  font-size: 24px;
  color: #333;
`;

const Form = styled.form`
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
`;

const EditorContainer = styled.div`
  .ql-container {
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .ql-editor {
    min-height: 200px;
    font-size: 16px;
    padding: 10px;
  }
`;

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  text-transform: uppercase;

  &:hover {
    background-color: #45a049;
  }
`;

function POST() {
  const [isToggled, setIsToggled] = useState(false);
  const [userToggled, setUserToggled] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleTagsChange = (e) => {
    let input = e.target.value;
    // '#' 기호가 입력되지 않은 경우 자동으로 '#' 기호를 추가합니다.
    if (input && !input.startsWith('#')) {
      input = `#${input}`;
    }
    setTags(input);
  };

  const handleKeyDown = (e) => {
    // 스페이스바를 눌렀을 때 '#' 기호를 추가합니다.
    if (e.key === ' ') {
      e.preventDefault();
      setTags((prevTags) => {
        let updatedTags = prevTags;
        if (!updatedTags.endsWith('#')) {
          updatedTags += ' #';
        }
        return updatedTags;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 입력한 데이터를 서버로 전송
      const response = await axios.post('/add', {
        title,
        content,
      });

      console.log('데이터 추가 완료:', response.data);

      // 페이지 리디렉션
      window.location.href = '/community';
    } catch (error) {
      console.error('Error occurred while adding data:', error);
      // 에러 처리
    }
  };
  

  return (
    <>
      <Header
        isToggled={isToggled}
        userToggled={userToggled}
        setIsToggled={setIsToggled}
        setUserToggled={setUserToggled}
      />
      <Container>
        <FormWrapper>
          <Title>글 작성하기</Title>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="title">제목</Label>
              <Input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
                placeholder="제목을 입력하세요"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="content">내용</Label>
              <EditorContainer>
                <ReactQuill
                  value={content}
                  onChange={handleContentChange}
                  placeholder="내용을 입력하세요"
                />
              </EditorContainer>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="tags">해시태그</Label>
              <Input
                type="text"
                id="tags"
                value={tags}
                onChange={handleTagsChange}
                onKeyDown={handleKeyDown}
                placeholder="해시태그를 입력하세요"
              />
            </FormGroup>
            <SubmitButton type="submit">글 작성</SubmitButton>
          </Form>
        </FormWrapper>
      </Container>
    </>
  );
}

export default POST;