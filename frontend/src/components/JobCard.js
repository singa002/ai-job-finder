import React from 'react';
import '../styles/JobCard.css';

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p className="company">{job.company}</p>
      <p className="location">{job.location}</p>
      {job.salary && <p className="salary">💵 {job.salary}</p>}
      <a href={job.url} target="_blank" rel="noopener noreferrer">
        View Job →
      </a>
    </div>
  );
};

export default JobCard;
