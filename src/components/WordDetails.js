import React, { useState, useEffect } from 'react';
import { fetchWordDetails, updateWord, fetchTags } from '../services/api';
import { useParams } from 'react-router-dom';
// import '../styles.css'; // Adjust the path if you placed it in a subdirectory
import './WordDetail.css';

function WordDetails() {
  const { word } = useParams();
  const [wordData, setWordData] = useState(null);
  const [tags, setTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wordResponse = await fetchWordDetails(word);

        console.log('Word Response:', wordResponse.data); // Log the word response

        if (wordResponse.data && typeof wordResponse.data === 'object') {
          setWordData(wordResponse.data);
          setTags(wordResponse.data.tags || []); // Set tags from fetched data
        } else {
          throw new Error('Invalid word data format');
        }

      
      } catch (err) {
        setError(err.message || 'Failed to fetch word details or tags');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [word]);

  const handleTagChange = (e) => {
    setTags(Array.from(e.target.selectedOptions, option => option.value));
  };

  const handleUpdate = async () => {
    try {
      await updateWord(word, { tags });
      alert('Tags updated successfully!');
    } catch (err) {
      alert('Failed to update tags: ' + (err.message || 'Unknown error'));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="word-details">
    <h2 className="word-title">{wordData.word}</h2>
    <p className="word-full-form"><strong>Full Form:</strong> {wordData.fullForm}</p>
    <p className="word-description"><strong>Description:</strong> {wordData.description}</p>
    
    <div className="tags-section">
      <h3>Tags:</h3>
      {wordData.tags && wordData.tags.length > 0 ? (
        <ul className="tags-list">
          {wordData.tags.map((tag, index) => (
            <li key={index} className="tag-item">{tag}</li>
          ))}
        </ul>
      ) : (
        <p>No tags available.</p>
      )}
    </div>
  </div>  
  );
}

export default WordDetails;
