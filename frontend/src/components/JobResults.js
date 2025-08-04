import React from 'react';
import JobCard from './JobCard';
import '../styles/JobResults.css';

const JobResults = ({ jobs, loading, error, totalFound, searchKeywords }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading">Searching for jobs...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-container">
        <p className="error">{error}</p>
        <button onClick={() => window.history.back()} className="back-button">
          Go Back
        </button>
      </div>
    );
  }
  
  if (!jobs || jobs.length === 0) {
    return (
      <div className="no-results-container">
        <p className="no-results">No jobs found for "{searchKeywords}".</p>
        <p className="no-results-suggestion">Try adjusting your search terms or location.</p>
        <button onClick={() => window.history.back()} className="back-button">
          Try Different Search
        </button>
      </div>
    );
  }

  return (
    <div className="job-results">
      <div className="results-header">
        <h2>Job Search Results</h2>
        {searchKeywords && (
          <p className="search-summary">
            Found {totalFound || jobs.length} jobs for "{searchKeywords}"
          </p>
        )}
      </div>
      
      <div className="job-list">
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
      
      {jobs.length > 0 && (
        <div className="results-footer">
          <p>Showing {jobs.length} of {totalFound || jobs.length} results</p>
          <button onClick={() => window.history.back()} className="back-button">
            New Search
          </button>
        </div>
      )}
    </div>
  );
};

export default JobResults;
