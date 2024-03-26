import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component for navigation
import img from './O-UNO_Type_Color_White.png';
import img2 from './photo-1606761568499-6d2451b23c66.avif';

function App() {
  const [file, setFile] = useState(null);
  const [classData, setClassData] = useState([]); // State to store class data array

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
        // Fetch class data array from server after successful upload
        const dataResponse = await fetch('http://localhost:3000/classData');
        const data = await dataResponse.json();
        setClassData(data);
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
      <h2 style={{textAlign: "center", margin: "auto", padding: "10px"}}>Welcome to the PKI Classroom Scheduler!</h2>
      <h3 style={{textAlign: "center", margin: "auto"}}>Upload a CSV File below to get started</h3>
      <p style={{margin: "auto", textAlign: "center", backgroundColor: "black", color: "white", width: "25%", padding: "10px"}}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        {/* Add Link to navigate to calendar page */}
        <Link to="/calendar">Go to Calendar</Link>
      </p>
      <body style={{backgroundImage: `url(${img2})`, backgroundSize: "cover", height: "100vh", width: "90%", display: "block", margin: "auto"}}></body>
    </div>
  );
}

export default App;
