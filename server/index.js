/**
 * @file Handles starting of the server to listen for uploads and stores the upload
 * @author Jacob Finley
 * @namespace ServerIndex
 */

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { parse } from 'csv-parse';

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// Multer configuration
/**
 * Stores the uploaded .CSV file into the uploads folder
 * @function storage 
 * @returns {void} Stores the uploaded .CSV file in uploads
 * @memberof ServerIndex
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Serve the React app
 * @function
 * @returns {void} Serves the react app
 * @memberof ServerIndex
 */ 
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle file upload
/**
 * handles the uploading of a file and outputs the status
 * @function post 
 * @returns {String} status of upload
 * @memberof ServerIndex
 */
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }

  console.log('Uploaded file:', req.file.originalname);
  printCSVtoCLI("./uploads/" + req.file.filename)
  res.send('File uploaded successfully.');
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start the server
/**
 * Starts a server listener to get uploaded files
 * @function listen 
 * @memberof ServerIndex
 * @returns {String} status of server
 */
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

/**
 * Outputs uploaded CSV to console
 * @param {String} filePath Path to uploaded file
 * @returns {void} prints CSV file data to the console
 * @memberof ServerIndex
 */
function printCSVtoCLI(filePath) {
  fs.createReadStream(filePath)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      console.log(row);
    })
}