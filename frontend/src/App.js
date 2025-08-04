import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchOptions from './components/SearchOptions';
import ResumeUpload from './components/ResumeUpload';
import TextSearch from './components/TextSearch';
import JobResults from './components/JobResults';
import './styles/App.css';

const App = () => {
  // Centralized state for job results, loading, and error handling
  const [jobResults, setJobResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchKeywords, setSearchKeywords] = useState('');
  const [totalFound, setTotalFound] = useState(0);

  return (
    <Router>
      <div className="app-container">
        <h1>AI Job Finder</h1>

        <Routes>
          <Route path="/" element={<SearchOptions />} />

          <Route
            path="/resume-upload"
            element={
              <ResumeUpload
                setJobResults={setJobResults}
                setLoading={setLoading}
                setError={setError}
                setSearchKeywords={setSearchKeywords}
                setTotalFound={setTotalFound}
              />
            }
          />

          <Route
            path="/text-search"
            element={
              <TextSearch
                setJobResults={setJobResults}
                setLoading={setLoading}
                setError={setError}
                setSearchKeywords={setSearchKeywords}
                setTotalFound={setTotalFound}
              />
            }
          />

          <Route
            path="/results"
            element={
              <JobResults
                jobs={jobResults}
                loading={loading}
                error={error}
                searchKeywords={searchKeywords}
                totalFound={totalFound}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
