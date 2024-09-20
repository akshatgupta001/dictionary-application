import React, { useState, useEffect } from 'react';
import { addWord, fetchTags } from '../services/api';
import './AddWordForm.css'; // Import the CSS file

function AddWordForm() {
  const [word, setWord] = useState('');
  const [fullForm, setFullForm] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTags = async () => {
      const result = await fetchTags();
      if (result.error) {
        setError(result.message);
      } else {
        if (Array.isArray(result.data)) {
          setAvailableTags(result.data);
        } else {
          setError('Invalid tags data format');
        }
        setError(null);
      }
    };
    getTags();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newWord = { word, full_form: fullForm, description, tags };
    addWord(newWord)
      .then(() => {
        alert('Word added successfully!');
        setWord('');
        setFullForm('');
        setDescription('');
        setTags([]);
      })
      .catch((error) => alert('Failed to add word: ', error.message));
  };

  return (
    <div className="add-word-form">
      <h2>Add a New Word</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Word:</label>
          <input value={word} onChange={(e) => setWord(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Full Form:</label>
          <input value={fullForm} onChange={(e) => setFullForm(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Tags:</label>
          <select multiple value={tags} onChange={(e) => setTags(Array.from(e.target.selectedOptions, option => option.value))}>
            {availableTags.map((tag) => (
              <option key={tag.name} value={tag.name}>{tag.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Add Word</button>
      </form>
    </div>
  );
}

export default AddWordForm;
