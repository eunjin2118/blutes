import React from 'react';
import './App.css';
import MainPage from './pages/MainPage.jsx';
import LoginPage from './pages/login.jsx';
import SignupPage from './pages/Signup';
import DictionaryPage from './pages/dictionary/AddWordForm';
import CommunityPage from './pages/community/CommunityPage';
import PostPage from './pages/community/post';
import WordList from './pages/dictionary/WordList.jsx';
import CommunityDetailPage from './pages/community/CommunityDetail';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route exact path='/main' element={<MainPage/>}/>
          <Route exact path='/' element={<LoginPage/>}/>
          <Route exact path='/signup' element={<SignupPage/>}/>
          <Route exact path='/dictionary' element={<DictionaryPage/>}/>
          <Route exact path='/community' element={<CommunityPage/>}/>
          <Route exact path='/post' element={<PostPage/>}/>
          <Route exact path='/detailcommunity/:postId' element={<CommunityDetailPage />}/>
          <Route exact path='/worldlist' element={<WordList/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;