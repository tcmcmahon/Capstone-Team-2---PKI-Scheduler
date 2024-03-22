// const express = require('express');
import express from 'express';
// const cors = require('cors')
import cors from 'cors';
// const multer = require('multer');
import multer from 'multer';
// const path = require('path');
import path from 'path';
// const readCSVData = require('./restrictions');
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


import {mainRestrictions} from './restrictions.js';

const app = express();
const PORT = 3001;

// const fs = require("fs");
import fs from 'fs';
// const { parse } = require("csv-parse");
import { parse } from 'csv-parse';

// Enable CORS for all routes
app.use(cors());

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

// Serve the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }

  console.log('Uploaded file:', req.file.originalname);
  // printCSVtoCLI("./uploads/" + req.file.filename)
  mainRestrictions("./uploads/" + req.file.filename);
  res.send('File uploaded successfully.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

function printCSVtoCLI(filePath) {
  fs.createReadStream(filePath)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      console.log(row);
    })
}