/**
 * @file Handles reading/parsing uploaded .CSV file, storing said data in database, taking classes from that data and
 * running the assignment algorithm on them, and formatting the data to send it to the calendar page.
 * Also sends data to the Calendar.js and AlgoResult.js pages.
 * @author Jacob Finley, Travis McMahon 
 * @namespace Restrictions
 */

import { CourseDescription } from './Class_Objects.js';
import fs from 'fs';
import { parse } from 'csv-parse';
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import rooms from './uploads/rooms.json' assert {type: 'json'};
import { finalForCalendar, formatTimes, storeAssigninCalendar} from './calendarFormat.js';
import { exit } from 'process';
import { link } from 'fs/promises';
import { all } from 'axios';

//Set up express/cors
const ex = express();
ex.use(express.json());
ex.use(cors());

/** Send calendar data when /Data path is GET requested
 * @function
 * @returns {void} Sends finalForCalendar object to requester
 * @memberof Restrictions
 */
ex.get("/Data", (req, res) => {res.json(finalForCalendar);});//Send data in json

/** Send final assignment data when /Algo path is GET requested
 * @function
 * @returns {void} Sends final object to requester
 * @memberof Restrictions
 */
ex.get("/Algo", (req, res) => {res.json(final);});//Send data in json

/** Start server listener on port 3001 for data requests 
 * @function
 * @returns {void} Starts a listener for data on http://localhost:3001
 * @memberof Restrictions
 */
ex.listen(3001, () => console.log("Server is up"));//Listen on port 3001 for data requests to /Data and /Algo 

// Create connection to remote database
//const connect = mysql.createConnection({
//     host: '137.48.186.40',
//     user: 'appuser',
//     password: 'nnrf1234',
//     database: 'scheduler'
// });

/** Attempt connection to remote database using credentials from connect
 * @function
 * @returns {void} Logs status of attempted connection to the console
 * @memberof Restrictions
 */ 
// connect.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to the remote database!');
// });

let z = Object.keys(rooms);//Total number of Rooms
let seatNumbers = [];//Seats for each room

for(let i = 0; i < z.length; i++)//For all rooms add seat number to seatNumbers
{
    seatNumbers.push(rooms[z[i]].Seats);//Put seat number in array seatNumbers
}

// Array of unassignable classes
const unassignableClasses =  ["AREN 3030 - AE DESIGN AND SIMULATION STUDIO III", "CIVE 334 - INTRODUCTION TO GEOTECHNICAL ENGINEERING",
                              "CIVE 378 - MATERIALS OF CONSTRUCTION",            "AREN 3220 - ELECTRICAL SYSTEMS FOR BUILDINGS I",
                              "AREN 4250 - LIGHTING DESIGN",                     "AREN 4940 - SPECIAL TOPICS IN ARCHITECTURAL ENGINEERING IV",
                              "AREN 8220 - ELECTRICAL SYSTEMS FOR BUILDINGS II", "AREN 1030 - DESIGN AND SIMULATION STUDIO I",
                              "AREN 4040 - BUILDING ENVELOPES",                  "CIVE 102 - GEOMATICS FOR CIVIL ENGINEERING",
                              "CNST 112 - CONSTRUCTION COMMUNICATIONS",          "CNST 225 - INTRODUCTION TO BUILDING INFORMATION MODELING "];

export var final = [];//Array for final assignment

/**
 * Sort nonFinal array of classes to resolve time conflicts in rooms
 * @param {Array<String>} totalRooms The total number of rooms in the building. Taken as parameter incase this ever changes
 * @returns {void} Stores sorted output in array final
 * @memberof Restrictions
*/

let leftOver = [];
// let t1 = [];
// let e1 = [];
function sort(v)
{
    if(v.length > 0)
    {
        for(let i = 0; i < z.length; i++)
        {   let t = [];
            let e = [];
            for(let j = 0; j < v.length; j++)
            {   
                if(v[j].maxEnrollment <= seatNumbers[i] && !e.includes(v[j].endTime.slice(0,2)) && !t.includes(v[j].startTime.slice(0,2)) && !e.includes(v[j].startTime.slice(0,2)))
                {
                    v[j].room = z[i];
                    t.push(v[j].startTime.slice(0,2));
                    e.push(v[j].endTime.slice(0,2));
                    final.push(v[j]);
                    v.splice(j, 1);
                }
            }
            // t1.push(t);
            // e1.push(e);
        }
        leftOver = nonFinal.filter(a => final.find(b => (a.class === b.class)));
        console.log(leftOver.length);
        sort(leftOver);
    }
    else
    {
        return final;
    }
    // finish();
}

// function finish()
// {
//     if(leftOver.length > 0)
//     {
//         for(let i = 0; i < z.length; i++)
//         {
//             for(let j = 0; j < leftOver.length; j++)
//             {
//                 if(leftOver[j].maxEnrollment <= seatNumbers[i] && !e1[i].includes(leftOver[j].endTime.slice(0,2)) && t1[i].includes(leftOver[j].startTime.slice(0,2)) && !t.includes(v[j].endTime.slice(0,2)))
//                 {
//                     leftOver[j].room = z[i];
//                     t1[i].push(leftOver[j].startTime.slice(0,2));
//                     e1[i].push(leftOver[j].endTime.slice(0,2));
//                     final.push(leftOver[j]);
//                     leftOver.splice(j,1);
//                 }
//             }
//         }
        
//         leftOver = leftOver.filter(a => final.find(b => (a.class === b.class)));
//         console.log(leftOver.length)
//         finish();
//     }
//     else
//     {
//         return final;
//     }
// }

export var nonFinal = [];//Structure for all classes with room, first pass through

/**
 * Function to assign all classes a room for first pass through. Rooms will have conflicts. Then calls the sorting algorithms to resolve conflicts.
 * @param {Array<String>} totalRooms Total number of rooms in the building. Taken as parameter in case this ever changes
 * @returns {void} Stores unsorted assignment in array nonFinal
 * @memberof Restrictions
 */

let lowP = [];

function firstAssign(totalRooms)
{   
    let k = 0;//room counter
    let u = [];//startTimes
    let d = [];//endTimes
    let o = [];//days
    let m = [];//maximumEnrollment
    for(let i = 0; i < classData.length; i++)//For all classes in class data, assign a room number. Will be sorted later
    {
        let y = [];//stores meeting info
            
        y = classData[i].meetingDates;//store meeting info
        u = y[0].startTime;//store startTimes
        d = y[0].endTime;//store endTimes
        o = y[0].days;//store days
        m = classData[i].maximumEnrollments;//stores max enrollment number

        if(k > 29)//If we are at the last room
        {
            k = 0;//Reset to room 0
        }
        else if(unassignableClasses.includes(classData[i].name) || classData[i].sectionNumber.includes("82"))//If class is an unassignable class or it is Lincoln, skip
        {
            continue;
        }
        else if(o == "MW" || o == "TR")//Store each class for each high priority day slot
        {    
            //Push class with information
            nonFinal.push({room: totalRooms[k], class: (classData[i].name + " Section " + classData[i].sectionNumber), days: o, startTime: u, endTime: d, maxEnrollment: m});
        }
        else if(o == "MWF" || o == "MTWRF" || o == "WF" || o == "M" || o == "T" || o == "W" || o == "R" || o == "F")
        {
            lowP.push({room: totalRooms[k], class: (classData[i].name + " Section " + classData[i].sectionNumber), days: o, startTime: u, endTime: d, maxEnrollment: m});
        }
        k++;//Increment to next room number
    }
    formatTimes(nonFinal);//Reformat times to 24hr format
    sort(nonFinal);
    // formatTimes(lowP);
    // sort(lowP);
    storeAssigninCalendar();
}

// global variables 
var classData = []; // will hold instances of classDescription, will end up with the data for all of the classes
var crossListedCoursesToCheck = []; // will temporarily hold classes that are cross listed and skip them if listed

/**
 * Function for reading data from the uploaded .CSV file and storing it into an array
 * @returns {array} Array classData with parsed classroom information from uploaded .CSV file
 * @memberof Restrictions
 */
function readCSVData()// read data from the csv file 
{
    return new Promise((resolve) => {
        var prevClassName; // holds the previous class stated in csv file
        var crossListedCourses; // will either be empty or hold values for cross listed courses
        fs.createReadStream('./uploads/test.csv')
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
            else { 
                prevClassName = row[0];// save the previous class name for the next row
            } // end of if statement
        })
        .on('end', function() {
            resolve(classData); // saves the data for classData
        }) // end of fs read
    }); // end of return
} // end of readCSVData

/**
 * Function for taking data read from .CSV file and storing it into the remote MySQL database
 * Output: Data inserted into MySQL table successfully, or an error if unsuccessful
 * @returns {void} stores parsed CSV data in array classData
 * @memberof Restrictions
 */
function storeParsedData()// Store parsed data in db
{
    var x = [];//holds all values to be stored in database
    var y = [];//holds meeting time information

    for(var i = 0; i < classData.length; i++)//loops through and assigns data from classData object into array x to be stored in database
    {
        y = classData[i].meetingDates;//meeting information
      
        x[0] = classData[i].name;//class name
        x[1] = classData[i].sectionNumber;//class section number
        x[2] = y[0].days;//days of class i.e. MW

        x[3] = classData[i].session;//class session
        x[4] = classData[i].campus;//class campus
        if(classData[i].maximumEnrollments == '')//if no maximum enrollment skip
        {
            continue;
        }
        else
        {
            x[5] = classData[i].maximumEnrollments;//else maximum enrollment
        }
        //Store data in db with INSERT INTO sql query
        //var query = "INSERT INTO Stage_Course_Sheet (Course_Header, Section_Num, Meeting_Pattern, Session, Campus, Maximum_Enrollment) VALUES (?)";
        // connect.query(query, [x], function(err, result){
        //     if(err) throw err;
        //     console.log(result.affectedRows);
        // });
    }   
}

async function main()// main function, is async because fs.createReadStream() 
{
    await readCSVData();
    storeParsedData();
    firstAssign(z);
    for(let i = 0; i < z.length; i++)
    {
        for(let j = 0; j < final.length; j++)
        {
            if(final[j].room == z[i] && (final[j].days == "MW"))
            {
                console.log(final[j]);
            }
        }
    }
    console.log(final.length);
} // end of main

main();// launch main
// EOF