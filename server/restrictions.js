// import modules 
import {CourseDescription} from './Class_Objects.js';
import fs from 'fs';
import { parse } from 'csv-parse';
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import rooms from './uploads/rooms.json' assert {type: 'json'};

//Set up express/cors, create path for GET requests and send data
//function sendData(){
const ex = express();
ex.use(express.json());
ex.use(cors());
ex.get("/Data", (req, res) => {
res.json(myobj);
});

ex.get("/Algo", (req, res) => {
    res.json(nonFinal);
    });

ex.listen(3001, () => console.log("Server is up")); 

// Listen on port 3001 for GET requests
//ex.listen(3001, () => console.log("Server is up")); 

// Create connection to remote database
//const connect = mysql.createConnection({
//     host: '137.48.186.40',
//     user: 'appuser',
//     password: 'nnrf1234',
//     database: 'scheduler'
// });

// Attempt connection, throw error if failed
//connect.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to the remote database!');
// });

// ORIGINAL AUTHOR OF CODE WITHIN THIS METHOD: Jacob Finley, Hash of frequency of classes on each day    
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

// Array of unassignable classes
const unassignableClasses =  ["AREN 3030 - AE DESIGN AND SIMULATION STUDIO III",
                            "CIVE 334 - INTRODUCTION TO GEOTECHNICAL ENGINEERING",
                            "CIVE 378 - MATERIALS OF CONSTRUCTION",
                            "AREN 3220 - ELECTRICAL SYSTEMS FOR BUILDINGS I",
                            "AREN 4250 - LIGHTING DESIGN",
                            "AREN 4940 - SPECIAL TOPICS IN ARCHITECTURAL ENGINEERING IV",
                            "AREN 8220 - ELECTRICAL SYSTEMS FOR BUILDINGS II",
                            "AREN 1030 - DESIGN AND SIMULATION STUDIO I",
                            "AREN 4040 - BUILDING ENVELOPES",
                            "CIVE 102 - GEOMATICS FOR CIVIL ENGINEERING",
                            "CNST 112 - CONSTRUCTION COMMUNICATIONS",
                            "CNST 225 - INTRODUCTION TO BUILDING INFORMATION MODELING "];

//Sort Tuesday/Thursday classes to resolve time conflicts
function sortTR()
{
    let z = Object.keys(rooms);//All rooms
    let h = 0;//Room index counter

    for(let i = 0; i < Object.keys(rooms).length; i++)//For all rooms
    {
        let t = [];//time array to check for duplicate times
        for(let e = 0; e < nonFinal.length && e+1 < nonFinal.length; e++)//for all classes in nonFinal array
        {
            if(h >= 30)//If we are at last room reset to 0 and keep going
            {
                h = 0;
            }
            if(nonFinal[e].room == Object.keys(rooms)[i] && nonFinal[e].days == "TR")//If current class, room and day of TR
            {
                if(t.includes(nonFinal[e].time))//If time array already has the same time entry
                {
                    nonFinal[e].room = z[h+12];//Reassign the class to a room 12 rooms up
                }
                else if(!(t.includes(nonFinal[e].time)))//else if time array doesn't have the time entry
                {
                    t.push(nonFinal[e].time);//Add the time entry to the array
                }
                h++;//increment room index counter
            }
        }
    }
}

//Sort Monday/Wednesday classes to resolve time conflicts
function sortMW()
{
    let z = Object.keys(rooms);//All rooms
    let h = 0;//Room index counter

    for(let i = 0; i < Object.keys(rooms).length; i++)//For all rooms
    {
        let t = [];//Time array
        for(let e = 0; e < nonFinal.length && e+1 < nonFinal.length; e++)//For all classes in nonFinal array
        {
            if(h >= 30)//If we are at the last room, reset to 0 and continue
            {
                h = 0;
            }
            if(nonFinal[e].room == Object.keys(rooms)[i] && nonFinal[e].days == "MW")//If current class, room and day of MW 
            {
                if(t.includes(nonFinal[e].time))//If time array has the time entry already
                {
                    nonFinal[e].room = z[h+12];//Reassign class to room 12 rooms up
                }
                else if(!(t.includes(nonFinal[e].time)))//else if time is not in array
                {
                    t.push(nonFinal[e].time);//add time to array
                }
                h++;//increment room index counter
            }
        }
    }
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

//Structure for all classes with room, first pass through
var nonFinal = [];

//Assign all classes to a class room, and then sort to avoid time conflicts
function algoAssign()
{   let k = 0;//room counter
    let u = [];//startTimes-endTimes
    let o = [];//days

    //ASSIGN MW CLASSES
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
                if(unassignableClasses.includes(classData[i].name))//If class is an unassignable class, skip
                {
                    continue;
                }
                if(classData[i].sectionNumber.includes("82"))//If section has 82 it is Lincoln, skip
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
                    nonFinal.push({room: Object.keys(rooms)[k], class: classData[i].name + " Section " + classData[i].sectionNumber, days: 'MW', time: u});
                    k++;//increment room counter
                }  
            } 
        }
    }
    //Sort Monday/Wednesday classes
    sortMW();

    //ASSIGN TR CLASSES
    for(let i = 0; i < classData.length; i++)
    {
        let y = [];//stores meeting info

        y = classData[i].meetingDates;//store meeting info
        u = y[0].startTime;//store startTimes
        o = y[0].days;//store days

        //For all times in trTimes array, assign a room that has the days MW
        for(let j = 0; j < trTimes.length; j++)
        {
            if(u == trTimes[j] && o == 'TR')
            {
                if(unassignableClasses.includes(classData[i].name))//If class is an unassignable class, skip
                {
                    continue;
                }
                if(classData[i].sectionNumber.includes("82"))//If section has 82 it is Lincoln, skip
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
    }
    //Sort Tuesday/Thursday classes
    sortTR();

    //ASSIGN WF CLASSES
    for(let i = 0; i < classData.length; i++)
    {
        let y = [];//stores meeting info
 
        y = classData[i].meetingDates;//store meeting info
        u = y[0].startTime;//store startTimes
        o = y[0].days;//store days
 
        //For all times in wfTimes array, assign a room that has the days MW
        for(let j = 0; j < wfTimes.length; j++)
        {
            if(u == wfTimes[j] && o == 'WF')
            {
                if(unassignableClasses.includes(classData[i].name))//If class is an unassignable class, skip
                {
                    continue;
                }
                if(classData[i].sectionNumber.includes("82"))//If section has 82 it is Lincoln, skip
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
    }

    //ASSIGN MTWRF CLASSES
    for(let i = 0; i < classData.length; i++)
    {
        let y = [];//stores meeting info

        y = classData[i].meetingDates;//store meeting info
        u = y[0].startTime;//store startTimes
        o = y[0].days;//store days

        //For all times in mtwrfTimes array, assign a room that has the days MW
        for(let j = 0; j < mtwrfTimes.length; j++)
        {
            if(u == mtwrfTimes[j] && o == 'MTWRF')
            {
                if(unassignableClasses.includes(classData[i].name))//If class is an unassignable class, skip
                {
                    continue;
                }
                if(classData[i].sectionNumber.includes("82"))//If section has 82 it is Lincoln, skip
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
    }

    //ASSIGN M CLASSES
    for(let i = 0; i < classData.length; i++)
    {
        let y = [];//stores meeting info

        y = classData[i].meetingDates;//store meeting info
        u = y[0].startTime;//store startTimes
        o = y[0].days;//store days

        //For all times in mTimes array, assign a room that has the days MW
        for(let j = 0; j < mTimes.length; j++)
        {
            if(u == mTimes[j] && o == 'M')
            {
                if(unassignableClasses.includes(classData[i].name))//If class is an unassignable class, skip
                {
                    continue;
                }
                if(classData[i].sectionNumber.includes("82"))//If section has 82 it is Lincoln, skip
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
    }
    
    //ASSIGN T CLASSES
    for(let i = 0; i < classData.length; i++)
    {
        let y = [];//stores meeting info

        y = classData[i].meetingDates;//store meeting info
        u = y[0].startTime;//store startTimes
        o = y[0].days;//store days

        //For all times in tTimes array, assign a room that has the days MW
        for(let j = 0; j < tTimes.length; j++)
        {
            if(u == tTimes[j] && o == 'T')
            {
                if(unassignableClasses.includes(classData[i].name))//If class is an unassignable class, skip
                {
                    continue;
                }
                if(classData[i].sectionNumber.includes("82"))//If section has 82 it is Lincoln, skip
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
    }

    //ASSIGN W CLASSES
    for(let i = 0; i < classData.length; i++)
    {
        let y = [];//stores meeting info

        y = classData[i].meetingDates;//store meeting info
        u = y[0].startTime;//store startTimes
        o = y[0].days;//store days

        //For all times in wTimes array, assign a room that has the days MW
        for(let j = 0; j < wTimes.length; j++)
        {
            if(u == wTimes[j] && o == 'W')
            {
                if(unassignableClasses.includes(classData[i].name))//If class is an unassignable class, skip
                {
                    continue;
                }
                if(classData[i].sectionNumber.includes("82"))//If section has 82 it is Lincoln, skip
                {
                    continue;
                }
                else
                {   
                    //Push class with information
                    nonFinal.push({room: Object.keys(rooms)[k], class: classData[i].name + " Section " + classData[i].sectionNumber, days: 'W', time: u});
                    k++;//increment room counter
                }  
            } 
        }
    }

    //ASSIGN R CLASSES
    for(let i = 0; i < classData.length; i++)
    {
        let y = [];//stores meeting info

        y = classData[i].meetingDates;//store meeting info
        u = y[0].startTime;//store startTimes
        o = y[0].days;//store days

        //For all times in rTimes array, assign a room that has the days MW
        for(let j = 0; j < rTimes.length; j++)
        {
            if(u == rTimes[j] && o == 'R')
            {
                if(unassignableClasses.includes(classData[i].name))//If class is an unassignable class, skip
                {
                    continue;
                }
                if(classData[i].sectionNumber.includes("82"))//If section has 82 it is Lincoln, skip
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
    }

    //ASSIGN F CLASSES
    for(let i = 0; i < classData.length; i++)
    {
        let y = [];//stores meeting info

        y = classData[i].meetingDates;//store meeting info
        u = y[0].startTime;//store startTimes
        o = y[0].days;//store days

        //For all times in fTimes array, assign a room that has the days MW
        for(let j = 0; j < fTimes.length; j++)
        {
            if(u == fTimes[j] && o == 'F')
            {
                if(unassignableClasses.includes(classData[i].name))//If class is an unassignable class, skip
                {
                    continue;
                }
                if(classData[i].sectionNumber.includes("82"))//If section has 82 it is Lincoln, skip
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
    }
    
    //ASSIGN S CLASSES
    for(let i = 0; i < classData.length; i++)
    {
        let y = [];//stores meeting info

        y = classData[i].meetingDates;//store meeting info
        o = y[0].days;//store days

        //For all times in fTimes array, assign a room that has the days MW
        if(o == 'S')
        {
            if(unassignableClasses.includes(classData[i].name))//If class is an unassignable class, skip
            {
                continue;
            }
            if(classData[i].sectionNumber.includes("82"))//If section has 82 it is Lincoln, skip
            {
                continue;
            }
            else
            {   
                //Push class with information
                nonFinal.push({room: Object.keys(rooms)[k], class: classData[i].name + " Section " + classData[i].sectionNumber, days: 'S', time: u});
                k++;//increment room counter
            }  
        } 
    }

    //Arrays for rooms on each day
    var mw = [];
    var tr = [];
    var wf = [];
    var mtwrf = [];
    var m = [];
    var t = [];
    var w = [];
    var r = [];
    var f = [];
    var s = [];

    // For all room numbers, output rooms assigned for each day in order of room numbers
    for(let i = 0; i < Object.keys(rooms).length; i++)//For all rooms
    {
        for(let e = 0; e < nonFinal.length; e++)//For all classes in nonFinal
        {
            //If current class is assigned to current room number and is on certain day, push to respective array.
            if(nonFinal[e].room == Object.keys(rooms)[i] && nonFinal[e].days == "MW")
            {
                mw.push(nonFinal[e]);
            }
            if(nonFinal[e].room == Object.keys(rooms)[i] && nonFinal[e].days == "TR")
            {
                tr.push(nonFinal[e]);
            }
            if(nonFinal[e].room == Object.keys(rooms)[i] && nonFinal[e].days == "WF")
            {
                wf.push(nonFinal[e]);
            }
            if(nonFinal[e].room == Object.keys(rooms)[i] && nonFinal[e].days == "MTWRF")
            {
                mtwrf.push(nonFinal[e]);
            }
            if(nonFinal[e].room == Object.keys(rooms)[i] && nonFinal[e].days == "M")
            {
                m.push(nonFinal[e]);
            }
            if(nonFinal[e].room == Object.keys(rooms)[i] && nonFinal[e].days == "T")
            {
                t.push(nonFinal[e]);
            }
            if(nonFinal[e].room == Object.keys(rooms)[i] && nonFinal[e].days == "W")
            {
                w.push(nonFinal[e]);
            }
            if(nonFinal[e].room == Object.keys(rooms)[i] && nonFinal[e].days == "R")
            {
                r.push(nonFinal[e]);
            }
            if(nonFinal[e].room == Object.keys(rooms)[i] && nonFinal[e].days == "F")
            {
                f.push(nonFinal[e]);
            }
            if(nonFinal[e].room == Object.keys(rooms)[i] && nonFinal[e].days == "S")
            {
                s.push(nonFinal[e]);
            }   
        }
    }
    //Output all classes on each day
    // console.log("\nMonday/Wednesday: ");
    // console.log(mw);
    // console.log("\nTuesday/Thursday: ");
    // console.log(tr);
    // console.log("\nWednesday/Friday: ");
    // console.log(wf);
    // console.log("\nMonday/Tuesday/Wednesday/Thursday/Friday: ");
    // console.log(mtwrf);
    // console.log("\nMonday: ");
    // console.log(m);
    // console.log("\nTuesday: ");
    // console.log(t);
    // console.log("\nWednesday: ");
    // console.log(w);
    // console.log("\nThursday: ");
    // console.log(r);
    // console.log("\nFriday: ");
    // console.log(f);
    // console.log("\nSaturday/Sunday: ");
    // console.log(s);
}

// global variables 
var classData = []; // will hold instances of classDescription, will end up with the data for all of the classes
var crossListedCoursesToCheck = []; // will temporarily hold classes that are cross listed and skip them if listed

// read data from the csv file 
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

// verify that the data is saved 
function main2ElectricBoogaloo() {
    console.log(classData[74]);
}
let myobj = [];

// Store parsed data in db and store calendar formatted data in myobj
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
            // insert class into myobj
            myobj.push({startDate: (dates[0] + "T" + y[0].startTime), endDate: (dates[0] + "T" + y[0].endTime), title: (x[0] + ", Section " + x[1])});
            myobj.push({startDate: (dates[2] + "T" + y[0].startTime), endDate: (dates[2] + "T" + y[0].endTime), title: (x[0] + ", Section " + x[1])});
            
        }
        else if(x[2] == 'TR')//if days are Tuesday Thursday
        {
            // insert class into myobj
            myobj.push({startDate: (dates[1] + "T" + y[0].startTime), endDate: (dates[1] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
            myobj.push({startDate: (dates[3] + "T" + y[0].startTime), endDate: (dates[3] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
        }
        else if(x[2] == 'WF')//if days are Wednesday Friday
        {
            // insert class into myobj
            myobj.push({startDate: (dates[2] + "T" + y[0].startTime), endDate: (dates[2] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
            myobj.push({startDate: (dates[4] + "T" + y[0].startTime), endDate: (dates[4] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
        }
        else if(x[2] == 'MWF')//if days are Monday Wednesday Friday
        {
            // insert class into myobj
            myobj.push({startDate: (dates[0] + "T" + y[0].startTime), endDate: (dates[0] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
            myobj.push({startDate: (dates[2] + "T" + y[0].startTime), endDate: (dates[2] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
            myobj.push({startDate: (dates[4] + "T" + y[0].startTime), endDate: (dates[4] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
        }
        else if(x[2] == 'MTWRF')//if days are everyday
        {
            // insert class into myobj
            myobj.push({startDate: (dates[0] + "T" + y[0].startTime), endDate: (dates[0] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
            myobj.push({startDate: (dates[1] + "T" + y[0].startTime), endDate: (dates[1] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
            myobj.push({startDate: (dates[2] + "T" + y[0].startTime), endDate: (dates[2] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
            myobj.push({startDate: (dates[3] + "T" + y[0].startTime), endDate: (dates[3] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
            myobj.push({startDate: (dates[4] + "T" + y[0].startTime), endDate: (dates[4] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
        }
        else if(x[2] == 'M')//if days are Monday
        {
            // insert class into myobj
            myobj.push({startDate: (dates[0] + "T" + y[0].startTime), endDate: (dates[0] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
        }
        else if(x[2] == 'T')//if days are Tuesday
        {
            // insert class into myobj
            myobj.push({startDate: (dates[1] + "T" + y[0].startTime), endDate: (dates[1] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
        }
        else if(x[2] == 'W')//if days are Wednesday
        {
            // insert class into myobj
            myobj.push({startDate: (dates[2] + "T" + y[0].startTime), endDate: (dates[2] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
        }
        else if(x[2] == 'R')//if days are Thursday
        {
            // insert class into myobj
            myobj.push({startDate: (dates[3] + "T" + y[0].startTime), endDate: (dates[3] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
        }
        else if(x[2] == 'F')//if days are Friday
        {
            // insert class into myobj
            myobj.push({startDate: (dates[4] + "T" + y[0].startTime), endDate: (dates[4] + "T" + y[0].endTime), title: x[0] + ", Section " + x[1]});
        }
        //Store data in db with INSERT INTO sql query
        //var query = "INSERT INTO Stage_Course_Sheet (Course_Header, Section_Num, Meeting_Pattern, Session, Campus, Maximum_Enrollment) VALUES (?)";
        // connect.query(query, [x], function(err, result){
        //     if(err) throw err;
        //     console.log(result.affectedRows);
        // });
    }   
}

// main function, is async because fs.createReadStream() 
async function main() {
    await readCSVData();
    //main2ElectricBoogaloo();
    storeParsedData();
    // getClasses();
    algoAssign();
    //sendData();
} // end of main

// launch main 
main();
// EOF