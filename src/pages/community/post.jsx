import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import Header from '../Header';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import bg from "../../img/postbg.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
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
  margin-top: -70px;
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
  background-color: #071DA1;;
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

const POST = () => {
  const navigate = useNavigate();
  const [isToggled, setIsToggled] = useState(false);
  const [userToggled, setUserToggled] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const location = useLocation();
  const name = location.state.value;


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('add', {
        title,
        content,
      })
      .then((res) => {
        console.log(res.data.Status);
        if (res) {
          navigate('/community', { state: { value: name } });
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
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
            <SubmitButton type="submit" onClick={handleSubmit}>글 작성</SubmitButton>
          </Form>
        </FormWrapper>
      </Container>
    </>
  );
};

export default POST;
