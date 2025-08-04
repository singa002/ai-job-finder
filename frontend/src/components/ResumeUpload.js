import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ResumeUpload.css';

const ResumeUpload = ({ setJobResults, setLoading, setError }) => {
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

      const response = await axios.post('http://localhost:5000/api/analyze-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setJobResults(response.data.jobs || []);
      navigate('/results');
    } catch (err) {
      console.error(err);
      setError('Failed to analyze resume. Please try again.');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

    const file = acceptedFiles[0];
    setFileName(file.name);
    uploadFile(file);
  },[setError, setLoading, setUploading, setJobResults, navigate]);

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

      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop your resume here...</p>
        ) : (
          <p>Drag and drop a PDF or TXT file, or click to select</p>
        )}
      </div>

      {uploading && <p className="loading">Uploading...</p>}
      {fileName && !uploading && <p className="filename">Uploaded: {fileName}</p>}
    </div>
  );
};

export default ResumeUpload;
