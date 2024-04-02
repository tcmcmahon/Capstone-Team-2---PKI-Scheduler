/* import data */
import {CourseDescription} from './Class_Objects.js';
import fs from 'fs';
import { parse } from 'csv-parse';
import express from 'express';
import cors from 'cors';
/* Require mysql package */
import mysql from 'mysql2';
import rooms from './uploads/rooms.json' assert {type: 'json'};

/*function sendData(){
const ex = express();
ex.use(express.json());
ex.use(cors());
ex.get("/Data", (req, res) => {
res.json(myobj);
});

ex.listen(3001, () => console.log("Server is up")); 
}*/
/* Create connection to remote database */
/*const connect = mysql.createConnection({
    host: '137.48.186.40',
    user: 'appuser',
    password: 'nnrf1234',
    database: 'scheduler'
});*/

/* Attempt connection, throw error if failed */ 
/*connect.connect((err) => {
    if (err) throw err;
    console.log('Connected to the remote database!');
});*/

// ORIGINAL AUTHOR OF CODE WITHIN THIS METHOD: Jacob Finley    
function getClasses()
{    
    var hash = {};
    var day = 'TR'; // 'M' or 'T' or 'W' or 'R' or 'F' or a combination
    var total_classes = 0;
    for (var _class in classData) 
    {
        var sesList = classData[_class].meetingDates
        for (var ses in sesList) 
        {
            if (!sesList[ses].days.includes(day)) 
            {
                continue;
            }

            // var splicedTime = ${sesList[ses].startTime}-${sesList[ses].endTime};
            var splicedTime = "" + sesList[ses].startTime + "";
            if (splicedTime in hash) 
            {
                hash[splicedTime]++;
            }
            else 
            {
                hash[splicedTime] = 1;
            }
            total_classes++;
        }
    }
    console.log(hash);
    console.log(total_classes);
}

//Constants for all unique start times on each day
const mwTimes = ["1:30pm", "12pm", "4:30pm", "9am", "10:30am", "3pm", "2:30pm", "12:30pm", "9:30am", "11:30am"];
const trTimes = ["10:30am", "9am", "12pm", "1:30pm", "4:30pm", "3pm", "4pm", "6pm", "5:30pm"];
const wfTimes = ["1pm"];
const mtwrfTimes = ["10am"];
const mTimes = ["5:30pm"];
const tTimes = ["7:30am"];
const wTimes = ["8am"];
const rTimes = ["7pm"];
const fTimes = ["2pm", "9:30am", "8:30am", "10:30am", "11am", "12:15pm", "12:45pm", "2:45pm", "3:20pm"];

/*Structure for all classes with room, first pass through*/
var nonFinal = [];

function algoAssign()
{   let k = 0;//room counter
    let u = [];//startTimes-endTimes
    let o = [];//days

    /*Assign classes a room, first pass through*/
    for(let i = 0; i < classData.length; i++)
    {
        let y = [];//stores meeting info

        y = classData[i].meetingDates;//store meeting info
        u = y[0].startTime;//store startTimes
        o = y[0].days;//store days

        //For all times in mwTimes array, assign a room that has the days MW
        for(let j = 0; j < mwTimes.length; j++)
        {
            if(u == mwTimes[j] && o == 'MW')
            {
                if(classData[i].sectionNumber.includes("8"))
                {
                    continue;
                }
                if(k == 30)//If room counter is equal to the last room, reset and keep going
                {
                    //Reset room counter to 0
                    k = 0;
                    //Push class with information
                    nonFinal.push({room: Object.keys(rooms)[k], class: classData[i].name + " Section " + classData[i].sectionNumber, days: 'MW', time: u});
                    k++;//increment room counter
                }
                else
                {   
                    //Push class with information
                    nonFinal.push({room: Object.keys(rooms)[k+2], class: classData[i].name + " Section " + classData[i].sectionNumber, days: 'MW', time: u});
                    // k++;//increment room counter
                }  
            } 
        }
        for(let j = 0; j < trTimes.length; j++)
        {
            if(u == trTimes[j] && o == 'TR')
            {
                if(classData[i].sectionNumber.includes("8"))
                {
                    continue;
                }
                if(k == 30)//If room counter is equal to the last room, reset and keep going
                {
                    //Reset room counter to 0
                    k = 0;
                    //Push class with information
                    nonFinal.push({room: Object.keys(rooms)[k], class: classData[i].name + " Section " + classData[i].sectionNumber, days: 'TR', time: u});
                    k++;//increment room counter
                }
                else
                {   
                    //Push class with information
                    nonFinal.push({room: Object.keys(rooms)[k], class: classData[i].name + " Section " + classData[i].sectionNumber, days: 'TR', time: u});
                    k++;//increment room counter
                }   
            } 
        }

        for(let j = 0; j < fTimes.length; j++)
        {
            if(u == fTimes[j] && o == 'F')
            {
                if(classData[i].sectionNumber.includes("8"))
                {
                    continue;
                }
                else
                {   
                    //Push class with information
                    nonFinal.push({room: Object.keys(rooms)[k], class: classData[i].name + " Section " + classData[i].sectionNumber, days: 'F', time: u});
                    k++;//increment room counter
                }  
            } 
        }
        for(let j = 0; j < mTimes.length; j++)
        {
            if(u == mTimes[j] && o == 'M')
            {
                if(classData[i].sectionNumber.includes("8"))
                {
                    continue;
                }
                else
                {   
                    //Push class with information
                    nonFinal.push({room: Object.keys(rooms)[k], class: classData[i].name + " Section " + classData[i].sectionNumber, days: 'M', time: u});
                    k++;//increment room counter
                }  
            } 
        }
        for(let j = 0; j < tTimes.length; j++)
        {
            if(u == tTimes[j] && o == 'T')
            {
                if(classData[i].sectionNumber.includes("8"))
                {
                    continue;
                }
                else
                {   
                    //Push class with information
                    nonFinal.push({room: Object.keys(rooms)[k], class: classData[i].name + " Section " + classData[i].sectionNumber, days: 'T', time: u});
                    k++;//increment room counter
                }  
            } 
        }
        for(let j = 0; j < rTimes.length; j++)
        {
            if(u == rTimes[j] && o == 'R')
            {
                if(classData[i].sectionNumber.includes("8"))
                {
                    continue;
                }
                else
                {   
                    //Push class with information
                    nonFinal.push({room: Object.keys(rooms)[k], class: classData[i].name + " Section " + classData[i].sectionNumber, days: 'R', time: u});
                    k++;//increment room counter
                }  
            } 
        }
        for(let j = 0; j < wfTimes.length; j++)
        {
            if(u == wfTimes[j] && o == 'WF')
            {
                if(classData[i].sectionNumber.includes("8"))
                {
                    continue;
                }
                else
                {   
                    //Push class with information
                    nonFinal.push({room: Object.keys(rooms)[k], class: classData[i].name + " Section " + classData[i].sectionNumber, days: 'WF', time: u});
                    k++;//increment room counter
                }  
            } 
        }
        for(let j = 0; j < mtwrfTimes.length; j++)
        {
            if(u == mtwrfTimes[j] && o == 'MTWRF')
            {
                if(classData[i].sectionNumber.includes("8"))
                {
                    continue;
                }
                else
                {   
                    //Push class with information
                    nonFinal.push({room: Object.keys(rooms)[k], class: classData[i].name + " Section " + classData[i].sectionNumber, days: 'MTWRF', time: u});
                    k++;//increment room counter
                }  
            } 
        }
        for(let j = 0; j <= wTimes.length; j++)
        {
            if(u == wTimes[j] && o == 'W')
            {
                if(classData[i].sectionNumber.includes("8"))
                {
                    continue;
                }
                if(j == 1 && nonFinal[j].room == nonFinal[j-1].room)
                {
                    nonFinal[j].room == Object.keys(rooms)[k+1];
                }
                    //Push class with information
                    nonFinal.push({room: Object.keys(rooms)[k], class: classData[i].name + " Section " + classData[i].sectionNumber, days: 'W', time: u});
            } 
        }
    }
    //For all room numbers, output rooms assigned in order of room numbers
    for(let i = 0; i < Object.keys(rooms).length; i++)
    {
        for(let e = 0; e < nonFinal.length; e++)
        {
            if(nonFinal[e].room == Object.keys(rooms)[i] && nonFinal[e].days == "TR")//if class room number is the current room in the loop, output the class
            {
                console.log(nonFinal[e]);
            }
        }
    }
}


/* global variables */
var classData = []; // will hold instances of classDescription, will end up with the data for all of the classes
var crossListedCoursesToCheck = []; // will temporarily hold classes that are cross listed and skip them if listed


/* read data from the csv file */
function readCSVData() {
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
let myobj = [];

/* Store parsed data in db */
function storeParsedData(){
    var x = [];//holds all values to be stored in database
    var y = [];//holds meeting time information

    var dates = ["2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04", "2024-01-05"];//Dates for calendar data
    //loops through and assigns data from classData object into array x to be stored
    for(var i = 0; i < classData.length; i++)
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
        //check for what class days and assign startDate, endDate, and title in myobj to be used in calendar
        if(x[2] == 'MW')//if days are Monday Wednesday
        {
            myobj.push({startDate: (dates[0] + "T" + y[0].startTime), endDate: (dates[0] + "T" + y[0].endTime), title: (x[0] + ", Section " + x[1])});
            myobj.push({startDate: (dates[2] + "T" + y[0].startTime), endDate: (dates[2] + "T" + y[0].endTime), title: (x[0] + ", Section " + x[1])});
            
        }
        else if(x[2] == 'TR')//if days are Tuesday Thursday
        {
            myobj.push({startDate: (dates[1] + "T" + y[0].startTime), endDate: (dates[1] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
            myobj.push({startDate: (dates[3] + "T" + y[0].startTime), endDate: (dates[3] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
        }
        else if(x[2] == 'WF')//if days are Wednesday Friday
        {
            myobj.push({startDate: (dates[2] + "T" + y[0].startTime), endDate: (dates[2] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
            myobj.push({startDate: (dates[4] + "T" + y[0].startTime), endDate: (dates[4] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
        }
        else if(x[2] == 'MWF')//if days are Monday Wednesday Friday
        {
            myobj.push({startDate: (dates[0] + "T" + y[0].startTime), endDate: (dates[0] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
            myobj.push({startDate: (dates[2] + "T" + y[0].startTime), endDate: (dates[2] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
            myobj.push({startDate: (dates[4] + "T" + y[0].startTime), endDate: (dates[4] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
        }
        else if(x[2] == 'MTWRF')//if days are everyday
        {
            myobj.push({startDate: (dates[0] + "T" + y[0].startTime), endDate: (dates[0] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
            myobj.push({startDate: (dates[1] + "T" + y[0].startTime), endDate: (dates[1] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
            myobj.push({startDate: (dates[2] + "T" + y[0].startTime), endDate: (dates[2] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
            myobj.push({startDate: (dates[3] + "T" + y[0].startTime), endDate: (dates[3] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
            myobj.push({startDate: (dates[4] + "T" + y[0].startTime), endDate: (dates[4] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
        }
        else if(x[2] == 'M')//if days are Monday
        {
            myobj.push({startDate: (dates[0] + "T" + y[0].startTime), endDate: (dates[0] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
        }
        else if(x[2] == 'T')//if days are Tuesday
        {
            myobj.push({startDate: (dates[1] + "T" + y[0].startTime), endDate: (dates[1] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
        }
        else if(x[2] == 'W')//if days are Wednesday
        {
            myobj.push({startDate: (dates[2] + "T" + y[0].startTime), endDate: (dates[2] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
        }
        else if(x[2] == 'R')//if days are Thursday
        {
            myobj.push({startDate: (dates[3] + "T" + y[0].startTime), endDate: (dates[3] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
        }
        else if(x[2] == 'F')//if days are Friday
        {
            myobj.push({startDate: (dates[4] + "T" + y[0].startTime), endDate: (dates[4] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
        }
        //Store data in db with INSERT INTO sql query
        /*var query = "INSERT INTO Stage_Course_Sheet (Course_Header, Section_Num, Meeting_Pattern, Session, Campus, Maximum_Enrollment) VALUES (?)";
        connect.query(query, [x], function(err, result){
            if(err) throw err;
            console.log(result.affectedRows);
        });*/
    }   
}

/* main function, is async because fs.createReadStream() */
async function main() {
    await readCSVData();
    /*main2ElectricBoogaloo();*/
    storeParsedData();
    // getClasses();
    algoAssign();
    /*sendData();*/
} // end of main


/* launch main */
main();
// EOF