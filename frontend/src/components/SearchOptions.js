import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchOptions.css';

const SearchOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="search-options">
      <h2>How would you like to find jobs?</h2>
      <div className="options-container">
        <button onClick={() => navigate('/resume-upload')}>
          Upload Resume
        </button>
        <button onClick={() => navigate('/text-search')}>
          Enter Text Search
        </button>
      </div>
    </div>
  );
};

export default SearchOptions;
