/**
 * @file Renders the initial page upon opening of application
 * @author Joshua Shadbolt, Travis McMahon
 * @namespace Index
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles.css"
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
