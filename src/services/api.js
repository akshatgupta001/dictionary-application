import axios from 'axios';

const API_BASE_URL = 'https://c9f7b82a-b412-4ec3-ac6d-a18f0709a49d.mock.pstmn.io'; // Replace with actual backend URL

// Function to handle errors
const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    console.error('Error Response:', error.response.data);
    console.error('Status Code:', error.response.status);
    console.error('Headers:', error.response.headers);
    return { error: true, message: 'An error occurred while fetching data.', status: error.response.status };
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Error Request:', error.request);
    return { error: true, message: 'No response received from the server. Please try again later.' };
  } else {
    // Something happened in setting up the request
    console.error('Error Message:', error.message);
    return { error: true, message: 'An unexpected error occurred.' };
  }
};

// Fetch all words
export const fetchWords = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/words`);
      if (response.data && Array.isArray(response.data)) {
        return { error: false, data: response.data };
      } else {
        return { error: true, message: 'Invalid response format' };
      }
    } catch (error) {
      return handleError(error);
    }
  };
  

// Fetch details of a word
export const fetchWordDetails = async (word) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/words/${word}`);
    return { error: false, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// Add a new word
export const addWord = async (wordData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/words`, wordData);
    return { error: false, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// Update a word's tags or description
export const updateWord = async (word, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/words/${word}`, updatedData);
    return { error: false, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// Fetch top N searched words
export const fetchTopSearches = async (n) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/words/top/${n}`);
      // Ensure the response is in the correct format
      if (Array.isArray(response.data)) {
        return response.data; // Return the array directly
      } else {
        throw new Error('Invalid data format'); // Throw error if not an array
      }
    } catch (error) {
      return handleError(error);
    }
  };

// Search words by tags
export const searchWordsByTags = async (tags) => {
    try {
      // Pass tags as a single query parameter in the format 'tag=protocol'
      const response = await axios.get(`${API_BASE_URL}/words`, { params: { tag: tags } });
      return { error: false, data: response.data };
    } catch (error) {
      return handleError(error);
    }
  };
  

// Fetch all tags
export const fetchTags = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tags`);
      // Assuming response.data is the correct structure
      return { error: false, data: response.data.tags }; // Extracting tags directly
    } catch (error) {
      return handleError(error);
    }
  };
  