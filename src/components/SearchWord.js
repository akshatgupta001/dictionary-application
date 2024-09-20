import React, { useState } from 'react';
import { fetchWordDetails } from '../services/api'; // Adjust the import based on your API structure
import './SearchWord.css'; // Import a CSS file for styling

function SearchWord() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query) {
      alert('Please enter a word to search.');
      return;
    }

    try {
      const response = await fetchWordDetails(query); // Call the API with the word
      if (response.error) {
        setError(response.message);
        setResult(null);
      } else {
        setResult(response.data);
        setError(null);
      }
    } catch (err) {
      setError('Error fetching word details');
      console.error(err);
    }
  };

  return (
    <div className="search-word">
      <h2>Search for a Word</h2>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        placeholder="Enter a word..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">Search</button>
      <div className="search-results">
        {result && (
          <div className="word-details">
            <h3 className="word-title">{result.word}</h3>
            <p className="word-full-form"><strong>Full Form:</strong> {result.fullForm}</p>
            <p className="word-description"><strong>Description:</strong> {result.description}</p>
            <h4>Tags:</h4>
            <ul className="tags-list">
              {result.tags.length > 0 ? (
                result.tags.map((tag, index) => <li key={index} className="tag-item">{tag}</li>)
              ) : (
                <p>No tags available.</p>
              )}
            </ul>
          </div>
        )}
        {!result && !error && <p>No results found.</p>}
      </div>
    </div>
  );
}

export default SearchWord;
