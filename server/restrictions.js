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

/*Structure for all classes with room, first pass through*/
var nonFinal = [];

function algoAssign()
{   let k = 0;//room counter
    let u = [];//startTimes-endTimes
    let o = [];

    /*Assign classes a room, first pass through*/
    for(let i = 0; i < classData.length; i++)
    {
        let y = [];//stores meeting info

        y = classData[i].meetingDates;//store meeting info
        u = y[0].startTime + "-" + y[0].endTime;//store startTimes-endTimes
        
        if(k == 39)//if room number is greater than 39 reset to 0
        {
            k = 0;
            //push room with info
            nonFinal[i] = ({room: Object.keys(rooms)[k], class: classData[i].name + " Section " + classData[i].sectionNumber, time: u});  
        }
        else
        {
            //push room with info
            nonFinal[i] = ({room: Object.keys(rooms)[k], class: classData[i].name + " Section " + classData[i].sectionNumber, time: u});
        }
        k++;//increment room counter
        }   
        /*Check for duplicate timeslots and assign to array l*/
        let l = [];
        for(let j = 0; j < nonFinal.length; j++)
        {
            let p = 1;//counter for next class in each pair of classes 
            for(let g = 0; g <= nonFinal.length && (j + p) < 295; g++)
            {
                if(nonFinal[j].room == nonFinal[j+p].room && nonFinal[j].time == nonFinal[j+p].time)//if room/time and next room/time are the same
                {
                    if(nonFinal[j].class.includes("CONE") || nonFinal[j].class.includes("AREN"))//if class name contains unnassignable class
                    {
                        continue;
                    }
                    else
                    {
                        l.push(nonFinal[j]);//push room to array l, will store duplicate timeslots
                    }
                }
                p++;//increment counter for next class
            }
        }
        /*Get unique duplicate timeslots*/
        l = [... new Set(l)];

        /*Get rooms that are available*/
        let q = [];
        let f = 0;//counter for classes with duplicate timeslots
        for(let p = 0; p < Object.keys(rooms).length; p++)//loop for all rooms
        {
            for(let h = 0; h < nonFinal.length; h++)//loop for all first class assignments
            {
                if(nonFinal[h].room == Object.keys(rooms)[p] && nonFinal[h].room == l[f].room && nonFinal[h].time != l[f].time)//if class room is valid and class room is in list of duplicates and time is not 
                {
                    q.push(nonFinal[h].room);//push class to array q
                    if(f > 80)//if we are above the length of the duplicates array
                    {
                        break;
                    }
                    f++;//increment duplicate timeslot counter
                }
            }
        }
        
        /*Check if rooms are same, and if so move to next room up*/
        let m = 0;//counter for available classes
        for(let b = 0; b < l.length && b + 1 < l.length; b++)//if b is less than number of duplicates and b + 1 is also
        {
            let x = 1;//counter for next class
            if(m == 19)//if we are at the end of available rooms
            {
                m = 0;
            }
            for(let z = 0; z < l.length && m < 19 && m + 1 <= 19 && b + x < 52; z++)//while we have more rooms that need to be assigned
            {
                if(x == 52)//reset next class counter
                {
                    x = 0;
                }
                else
                {
                    if(l[b].room == l[b+x].room)//if room is the same as the next room, assign to the next room in the list of available rooms
                    {
                        l[b].room = q[m+1];
                    }
                    else//else assign current room in list of rooms
                    {
                        l[b].room = q[m];
                    }
                }
                x++;//increment next class counter
            }
            m++;//increment available room counter
        }
        
        /*If room and time are the same replace with new room from previous loop*/
        let d = 0;
        //loop and re assign to the first array with the new values
        for(let n = 0; n < nonFinal.length; n++)
        {
            if(d == 52)
            {
                d = 0;
            }
            if(nonFinal[n].room == l[d].room && nonFinal[n].time == l[d].time)
            {
                nonFinal[n] = l[d];
            }
            d++;
            if((!(nonFinal[n].class.includes("CONE")) || !(nonFinal[n].class.includes("AREN"))) && nonFinal[n].room == "149")
            {
                console.log(nonFinal[n]);
            }
        }
        /*Output all classes by room*/
        /*for(let s = 0; s < Object.keys(rooms).length; s++)
        {
            for(let a = 0; a < nonFinal.length; a++)
            {
                if(nonFinal[a].room == Object.keys(rooms)[s])
                {
                    console.log(nonFinal[a]);
                }
            }
        }*/
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
    algoAssign();
    /*sendData();*/
} // end of main


/* launch main */
main();
// EOF