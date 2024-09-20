import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WordList from './components/WordList';
import WordDetails from './components/WordDetails';
import AddWordForm from './components/AddWordForm';
import TopSearches from './components/TopSearches';
import SearchByTag from './components/SearchByTag';
import SearchWord from './components/SearchWord'; // Import the new SearchWord component

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Dictionary Application</h1>
        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/add-word"> Add Word</Link> | 
          <Link to="/top-searches"> Top Searches</Link> | 
          <Link to="/search-by-tag"> Search by Tag</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/word/:word" element={<WordDetails />} />
          <Route path="/add-word" element={<AddWordForm />} />
          <Route path="/top-searches" element={<TopSearches />} />
          <Route path="/search-by-tag" element={<SearchByTag />} />
        </Routes>
      </div>
    </Router>
  );
}

// New Home Component
const Home = () => {
  return (
    <div>
      <SearchWord /> {/* Place SearchWord component here */}
      <WordList /> {/* Render WordList below the search */}
    </div>
  );
}

export default App;
