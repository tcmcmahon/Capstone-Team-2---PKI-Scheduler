/**
 * @file Renders the upload page so the user can input and upload a .CSV file
 * @author Jacob Finley
 * @author Joshua Shadbolt
 * @namespace Upload
 */

import React, { useState } from 'react';
import img from '../resources/O-UNO_Type_Color_White.png';
import img2 from '../resources/photo-1606761568499-6d2451b23c66.avif';
import "./Upload.css";

export default function Upload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('File uploaded successfully!');
      } else {
        throw new Error('Failed to upload file.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file: ' + error.message);
    }
  };

  return (
    <div className="upload-container">
      <header className="upload-header">
        <img src={img} alt="Logo" className="upload-logo" />
        <h1 className="upload-title">Upload a CSV File Below</h1>
      </header>
      <div className="upload-content">
        <input type="file" accept=".csv" id="fileInput" className="upload-input" onChange={handleFileChange} />
        <label htmlFor="fileInput" className="upload-label">Choose File</label>
        {file && <p>Selected file: {file.name}</p>}
        <button onClick={handleUpload} className="upload-button">Upload</button>
      </div>
    </div>
  );
}

