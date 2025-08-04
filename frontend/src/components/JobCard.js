import React from 'react';
import '../styles/JobCard.css';

const JobCard = ({ job }) => {
  const handleViewJob = () => {
    if (job.url) {
      window.open(job.url, '_blank', 'noopener,noreferrer');
    }
  };

  const truncateDescription = (description, maxLength = 150) => {
    if (!description) return '';
    return description.length > maxLength 
      ? description.substring(0, maxLength) + '...' 
      : description;
  };

  return (
    <div className="job-card">
      <div className="job-header">
        <h3 className="job-title">{job.title}</h3>
        <span className="job-source">{job.source}</span>
      </div>
      
      <div className="job-company">
        <p className="company-name">{job.company}</p>
        <p className="job-location">📍 {job.location}</p>
      </div>
      
      {job.salary && (
        <p className="job-salary">💵 {job.salary}</p>
      )}
      
      {job.description && (
        <p className="job-description">
          {truncateDescription(job.description)}
        </p>
      )}
      
      <div className="job-meta">
        {job.posted_date && (
          <span className="posted-date">📅 {job.posted_date}</span>
        )}
        
        {job.tags && job.tags.length > 0 && (
          <div className="job-tags">
            {job.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
            {job.tags.length > 3 && (
              <span className="tag-more">+{job.tags.length - 3} more</span>
            )}
          </div>
        )}
      </div>
      
      <button 
        className="view-job-button" 
        onClick={handleViewJob}
        disabled={!job.url}
      >
        {job.url ? 'View Job →' : 'No Link Available'}
      </button>
    </div>
  );
};

export default JobCard;
