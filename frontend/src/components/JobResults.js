import React from 'react';
import JobCard from './JobCard';
import '../styles/JobResults.css';

const JobResults = ({ jobs, loading, error }) => {
  if (loading) return <p className="loading">Loading jobs...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!jobs || jobs.length === 0) return <p className="no-results">No jobs found.</p>;

  return (
    <div className="job-results">
      <h2>Matching Jobs</h2>
      <div className="job-list">
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobResults;
