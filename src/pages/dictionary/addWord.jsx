import React, { useState } from 'react';

const AddWord = ({ addWord }) => {
  const [newWord, setNewWord] = useState('');

  const handleAddWord = () => {
    if (newWord) {
      addWord(newWord);
      setNewWord('');
    }
  };

  return (
    <div>
      <h1>단어 추가</h1>
      <input
        type="text"
        value={newWord}
        onChange={(e) => setNewWord(e.target.value)}
        placeholder="단어를 입력하세요"
      />
      <button onClick={handleAddWord}>추가</button>
    </div>
  );
};

export default AddWord;
