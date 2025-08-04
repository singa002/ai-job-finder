import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/TextSearch.css';

const TextSearch = ({ setJobResults, setLoading, setError }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError('Please enter a job search query.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await axios.post('http://localhost:5000/api/analyze-text', { query });

      setJobResults(response.data.jobs || []);
      navigate('/results');
    } catch (err) {
      console.error(err);
      setError('Failed to search. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-search">
      <h2>Search Jobs by Text</h2>
      <form onSubmit={handleSubmit} className="text-search-form">
        <input
          type="text"
          placeholder="e.g. remote React developer"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default TextSearch;
