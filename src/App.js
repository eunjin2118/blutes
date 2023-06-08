import React from 'react';
import './App.css';
import MainPage from './pages/MainPage.jsx';
import LoginPage from './pages/login.jsx';
import SignupPage from './pages/signup';
import DictionaryPage from './pages/dictionary/addWord';
import CommunityPage from './pages/community/post';

function App() {
  return (
    <div className='App'>
      <SignupPage/>
    </div>
  );
}

export default App;