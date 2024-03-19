/* import data */
import {CourseDescription} from './Class_Objects.js';
import fs from 'fs';
import { parse } from 'csv-parse';

/* Require mysql package */
import mysql from 'mysql2';

/* Create connection to remote database */
const connect = mysql.createConnection({
    host: '137.48.186.40',
    user: 'appuser',
    password: 'nnrf1234',
    database: 'scheduler'
});

/* Attempt connection, throw error if failed */
connect.connect((err) => {
    if (err) throw err;
    console.log('Connected to the remote database!');
});

// import rooms from './uploads/rooms.json' assert {type: 'json'};


/* global variables */
var classData = []; // will hold instances of classDescription, will end up with the data for all of the classes
var crossListedCoursesToCheck = []; // will temporarily hold classes that are cross listed and skip them if listed


/* read data from the csv file */
function readCSVData() {
    return new Promise((resolve) => {
        var prevClassName; // holds the previous class stated in csv file
        var crossListedCourses; // will either be empty or hold values for cross listed courses
        fs.createReadStream('./server/uploads/test.csv')
        .pipe(
            parse({from_line: 4}) // starts reading at line 4 with "AREN 1030 - DESIGN AND SIMULATION STUDIO I"
        ) 
        .on('data', function (row) { // iterates through each row in csv file
            var cd = new CourseDescription(); // creates object to store class data
            if (row[18] === 'Distance Education') { } // ASK : are classes that are labeled Distance Education fully remote?
                                                      // ASK : will all Distance Education classes that are cross listed with other class also be cross lised?
            else if (row[0] === '') {
                cd.setCourseName(prevClassName);
                cd.setSectionNum(row[7]);
                cd.setLab(row[9]);
                cd.spliceTime(row[11]); //  ASK : what is the diff between meeting and meeting pattern in csv sheet
                cd.setSession(row[16]);
                cd.setCampus(row[17]);
                if (crossListedCourses = cd.setClassSize(row[29], row[34], row[35])) {
                    crossListedCoursesToCheck.push(crossListedCourses);
                }
                classData.push(cd);
            }
            else { // will save the previous class name for the next row
                prevClassName = row[0];
            } // end of if statement
        })
        .on('end', function() {
            resolve(classData); // saves the data for classData
        }) // end of fs read
    }); // end of return
} // end of readCSVData


/* verify that the data is saved */
function main2ElectricBoogaloo() {
    console.log(classData[74]);
}

/* Store parsed data in db */
function storeParsedData(){
    var query = "INSERT INTO Stage_Course_Sheet (Course) VALUES ?";
    connect.query(query, classData[0].name, function(err, result){
        if(err) throw err;
        console.log(result.affectedRows);
    });
}

/* main function, is async because fs.createReadStream() */
async function main() {
    await readCSVData();
    console.log(classData[0]); 
    console.log(classData.length);
    main2ElectricBoogaloo();
    storeParsedData();
    var x = classData[0].name;
    console.log(x);
} // end of main


/* launch main */
main();
// EOF