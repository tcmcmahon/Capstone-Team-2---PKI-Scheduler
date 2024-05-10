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
import { preCalendar, finalForCalendar } from './formatCalendar.js';
import { mainRestrictions } from './restrictions.js';

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

export var uploadedFilePath;
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
  uploadedFilePath = "./uploads/" + req.file.filename;
  console.log('Uploaded file:', req.file.originalname);
  // printCSVtoCLI("./uploads/" + req.file.filename)
  res.send('File uploaded successfully.');
  mainRestrictions(uploadedFilePath)
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

//Set up express/cors
const ex = express();
ex.use(express.json());
ex.use(cors());

/** Send calendar data when /Data path is GET requested
 * @function
 * @returns {void} Sends finalForCalendar object to requester
 * @memberof ServerIndex
 */
ex.get("/Data", (req, res) => {res.json(finalForCalendar);});//Send data in json

/** Send final assignment data when /Algo path is GET requested
 * @function
 * @returns {void} Sends final object to requester
 * @memberof ServerIndex
 */
ex.get("/Algo", (req, res) => {res.json(preCalendar);});//Send data in json

/** Start server listener on port 3001 for data requests 
 * @function
 * @returns {void} Starts a listener for data on http://localhost:3001
 * @memberof ServerIndex
 */
ex.listen(3001, () => console.log("Server is up"));//Listen on port 3001 for data requests to /Data and /Algo 

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