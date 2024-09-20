import React, { useState, useEffect } from 'react';
import { fetchTopSearches } from '../services/api';

function TopSearches() {
  const [topWords, setTopWords] = useState([]);
  const [n, setN] = useState(10); // Default to top 10 searches
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const getTopSearches = async () => {
      try {
        const response = await fetchTopSearches(n);
        if (Array.isArray(response)) {
          setTopWords(response); // Ensure response is an array
          setError(null); // Reset error on successful fetch
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch top searches'); // Handle fetch error
        console.error('Error fetching top searches:', err);
      }
    };

    getTopSearches();
  }, [n]);

  return (
    <div>
      <h2>Top {n} Searched Words</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <div>
        <label htmlFor="numTopWords">Number of Top Words to Display:</label>
        <input
          type="number"
          id="numTopWords"
          value={n}
          onChange={(e) => setN(Math.min(Math.max(1, Number(e.target.value)), 50))} // Clamp value between 1 and 50
          min="1"
          max="50"
        />
      </div>
      <ul>
        {topWords.length === 0 ? (
          <p>No top searches available.</p>
        ) : (
          topWords.map((item, index) => (
            <li key={index}>
              <strong>{item.word}</strong>: {item.searchCount} searches
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TopSearches;
