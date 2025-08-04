import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/TextSearch.css';

const TextSearch = ({ setJobResults, setLoading, setError, setSearchKeywords, setTotalFound }) => {
  const [query, setQuery] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [localLoading, setLocalLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError('Please enter a job search query.');
      return;
    }

    try {
      setLoading(true);
      setLocalLoading(true);
      setError('');

      // Step 1: Analyze the search text
      const analyzeResponse = await axios.post('http://localhost:5001/api/analyze-text', {
        search_text: query
      });

      if (analyzeResponse.data.success) {
        setAnalysis(analyzeResponse.data.analysis);
        
        // Step 2: Search for jobs using the analyzed keywords
        const searchResponse = await axios.post('http://localhost:5001/api/search-jobs-simple', {
          keywords: query,
          location: analyzeResponse.data.analysis.work_preferences.remote_preferred ? 'remote' : ''
        });

        if (searchResponse.data.success) {
          setJobResults(searchResponse.data.jobs || []);
          setSearchKeywords(searchResponse.data.search_keywords || query);
          setTotalFound(searchResponse.data.total_found || 0);
          navigate('/results');
        } else {
          setError('Failed to search for jobs. Please try again.');
        }
      } else {
        setError('Failed to analyze search text. Please try again.');
      }
    } catch (err) {
      console.error('API Error:', err);
      if (err.response?.status === 404) {
        setError('API endpoint not found. Please check if the backend is running.');
      } else if (err.code === 'ECONNREFUSED') {
        setError('Cannot connect to backend server. Please ensure it\'s running on port 5001.');
      } else {
        setError('Failed to search. Please try again.');
      }
    } finally {
      setLoading(false);
      setLocalLoading(false);
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
          disabled={localLoading}
        />
        <button type="submit" disabled={localLoading}>
          {localLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      {analysis && (
        <div className="analysis-results">
          <h3>Analysis Results</h3>
          <div className="analysis-details">
            <p><strong>Predicted Roles:</strong> {analysis.predicted_roles.join(', ')}</p>
            <p><strong>Skills:</strong> {analysis.mentioned_skills.join(', ')}</p>
            <p><strong>Remote Preferred:</strong> {analysis.work_preferences.remote_preferred ? 'Yes' : 'No'}</p>
            <p><strong>Confidence:</strong> {(analysis.confidence * 100).toFixed(1)}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextSearch;
