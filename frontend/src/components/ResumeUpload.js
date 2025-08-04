import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ResumeUpload.css';

const ResumeUpload = ({ setJobResults, setLoading, setError, setSearchKeywords, setTotalFound }) => {
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      setError('Invalid file type. Please upload a PDF or TXT file.');
      return;
    }

    const uploadFile = async (file) => {
      const formData = new FormData();
      formData.append('resume', file);

      try {
        setLoading(true);
        setUploading(true);
        setError('');

        const response = await axios.post('http://localhost:5001/api/analyze-resume', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.success) {
          setJobResults(response.data.jobs || []);
          setSearchKeywords(response.data.search_keywords || 'Resume Analysis');
          setTotalFound(response.data.total_found || 0);
          navigate('/results');
        } else {
          setError('Failed to analyze resume. Please try again.');
        }
      } catch (err) {
        console.error('Resume upload error:', err);
        if (err.response?.status === 404) {
          setError('Resume analysis endpoint not found. Please check if the backend is running.');
        } else if (err.code === 'ECONNREFUSED') {
          setError('Cannot connect to backend server. Please ensure it\'s running on port 5001.');
        } else {
          setError('Failed to analyze resume. Please try again.');
        }
      } finally {
        setLoading(false);
        setUploading(false);
      }
    };

    const file = acceptedFiles[0];
    setFileName(file.name);
    uploadFile(file);
  }, [setError, setLoading, setUploading, setJobResults, setSearchKeywords, setTotalFound, navigate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
    },
    multiple: false,
    onDrop,
  });

  return (
    <div className="resume-upload">
      <h2>Upload Your Resume</h2>
      <p className="upload-description">
        Upload your resume to get personalized job recommendations based on your skills and experience.
      </p>

      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop your resume here...</p>
        ) : (
          <p>Drag and drop a PDF or TXT file, or click to select</p>
        )}
      </div>

      {uploading && (
        <div className="upload-status">
          <div className="loading-spinner"></div>
          <p className="loading">Analyzing your resume...</p>
        </div>
      )}
      {fileName && !uploading && <p className="filename">Uploaded: {fileName}</p>}
    </div>
  );
};

export default ResumeUpload;
