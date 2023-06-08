// CommunityPage.js
import React, { useState } from 'react';

function CommunityPage() {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState([]);

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim() !== '') {
      setPosts([...posts, newPost]);
      setNewPost('');
    }
  };

  return (
    <div>
      <h1>커뮤니티 페이지</h1>
      <form onSubmit={handlePostSubmit}>
        <input type="text" value={newPost} onChange={handlePostChange} />
        <button type="submit">게시</button>
      </form>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>{post}</li>
        ))}
      </ul>
    </div>
  );
}

export default CommunityPage;
