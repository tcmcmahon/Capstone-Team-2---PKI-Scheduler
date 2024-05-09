/**
 * @file Renders the page for display of the algorithms output
 * @author Travis McMahon
 * @namespace AlgorithmResults
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img from '../resources/O-UNO_Type_Color_White.png';
import "./AlgoResult.css";

/**
 * Function for displaying the raw data output from the algorithm
 * @returns {html} Html page containing the raw output data from the algorithm
 * @memberof AlgorithmResults
 */
export default function AlgoResult() {
  const [algoResult, setAlgoResult] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/Algo");
        setAlgoResult(JSON.stringify(response.data, null, 2));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="algo-container">
      <header className="algo-header">
        <img src={img} alt="Logo" className="algo-logo" />
        <h1 className="algo-title">Algorithm Results</h1>
      </header>
      <div className="algo-content">
        <p className="algo-data" style={{textAlign: 'left'}}>{algoResult}</p>
      </div>
    </div>
  );
}

