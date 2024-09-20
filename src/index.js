import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import App from './App'; // Your main App component
import './styles.css'; // Adjust the path if you placed it in a subdirectory


// Create a root element in the DOM
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Render the App component using createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
