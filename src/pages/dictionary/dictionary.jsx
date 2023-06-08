import React from 'react';

const VocabularyList = ({ wordList }) => {
  return (
    <div>
      <h1>단어장</h1>
      <ul>
        {wordList.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
};

export default VocabularyList;
