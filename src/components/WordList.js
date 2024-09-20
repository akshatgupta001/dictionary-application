import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchWords } from '../services/api';

function WordList() {
  const [words, setWords] = useState([]);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const getWords = async () => {
      const result = await fetchWords();
      if (result.error) {
        setError(result.message);
      } else {
        setWords(result.data);
        setError(null);
      }
    };
    getWords();
  }, []);

  return (
    <div>
      <h2>Word List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <ul>
        {words.length === 0 ? (
          <p>No words available.</p>
        ) : (
          words.map((word) => (
            <li key={word.word}>
              <Link to={`/word/${word.word}`}>{word.word}</Link>
            </li>
          ))
        )}
      </ul>
      <Link to="/add-word">Add a New Word</Link>
    </div>
  );
}

export default WordList;
