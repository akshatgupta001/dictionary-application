import React, { useState, useEffect } from 'react';
import { fetchTags, searchWordsByTags } from '../services/api';
import './SearchByTag.css'; // Import the CSS file

function SearchByTag() {
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    const getTags = async () => {
      try {
        const response = await fetchTags();
        if (response.error) {
          setError('Failed to fetch tags');
        } else {
          setAvailableTags(response.data); // Directly use the tags array
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching tags:', err);
        setError('Failed to fetch tags');
      }
    };
    getTags();
  }, []);

  const handleTagChange = (e) => {
    setSelectedTags(Array.from(e.target.selectedOptions, option => option.value));
  };

  const handleSearch = async () => {
    if (selectedTags.length === 0) {
      alert('Please select at least one tag.');
      return;
    }
    try {
      const response = await searchWordsByTags(`tag=${selectedTags.join(',')}`);
      if (response.error) {
        setError(response.message);
      } else {
        setResults(response.data);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching words by tags:', err);
      setError('Failed to fetch words');
    }
  };

  return (
    <div className="search-by-tag">
      <h2>Search Words by Tags</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label>Select Tags:</label>
        <select multiple value={selectedTags} onChange={handleTagChange} className="tag-select">
          {availableTags.map(tag => (
            <option key={tag.id} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      <div>
        <h3>Search Results</h3>
        <ul>
          {results.length === 0 ? (
            <p>No words found.</p>
          ) : (
            results.map(word => (
              <li key={word.word}>
                <strong>{word.word}</strong>: {word.description}<br />
                <em>Full Form:</em> {word.fullForm}<br />
                <em>Tags:</em> {word.tags.join(', ')}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default SearchByTag;
