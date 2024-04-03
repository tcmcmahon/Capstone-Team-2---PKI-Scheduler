import React, { useState } from 'react';
import img from '../resources/O-UNO_Type_Color_White.png';
import img2 from '../resources/photo-1606761568499-6d2451b23c66.avif';

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
      alert('Error uploading file: ' + error.message); // Log the error message received from the server
    }
  };

  return (
    <div className="App">
      <h1 style={{backgroundImage: `url(${img})`, backgroundSize: "cover", height: "110px", backgroundColor: "black"}}></h1>
      <h2 style={{textAlign: "center", margin: "auto"}}>Upload a CSV File below:</h2>
      <p style={{margin: "auto", textAlign: "center", backgroundColor: "black", color: "white", width: "30%", padding: "5px"}}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </p>
      <body style={{backgroundImage: `url(${img2})`, backgroundSize: "cover", height: "100vh", width: "90%", display: "block", margin: "auto"}}></body>
    </div>
  );
}

