// import modules 
import { CourseDescription } from './Class_Objects.js';
import fs from 'fs';
import { parse } from 'csv-parse';
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import rooms from './uploads/rooms.json' assert {type: 'json'};

//Set up express/cors
const ex = express();
ex.use(express.json());
ex.use(cors());

//Setup /Data path for sending data to the calendar
ex.get("/Data", (req, res) => {
res.json(finalForCalendar);//Send data in json
});

//Setup /Algo for sending data to the algorithm results page
ex.get("/Algo", (req, res) => {
    res.json(final);//Send data in json
    });

//Listen on port 3001 for data requests to /Data and /Algo
ex.listen(3001, () => console.log("Server is up")); 

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

//Total number of Rooms
let z = Object.keys(rooms);

//Seats for each room
let seatNumbers = [];

//For all rooms add seat number to b
for(let i = 0; i < z.length; i++)
{
    seatNumbers.push(rooms[z[i]].Seats);//Put seat number in array seatNumbers
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

//Array for final assignment
let final = [];

//Sort Monday/Wednesday classes to resolve time conflicts
function sortNonFinal(totalRooms)
{
    for(let i = 0; i < totalRooms.length; i++)//For all totalRooms
    { 
        let t = [];//Time array
        for(let e = 0; e < nonFinal.length; e++)//For all classes in nonFinal array
        {
            if(nonFinal[e].days == "MW" && nonFinal[e].room == z[i] && !(t.includes(nonFinal[e].startTime)) && nonFinal[e].maxEnrollment <= seatNumbers[i])//If current Monday/Wednesday class has same room as current room and its start time is not in the time array
            {
                t.push(nonFinal[e].startTime);//Add startTime of current room into current time array
                final.push(nonFinal[e]);//Add class to sorted Monday/Wednesday array
            }
        }
    }
    for(let i = 0; i < totalRooms.length; i++)//For all totalRooms
    { 
        let t = [];//Time array
        for(let e = 0; e < nonFinal.length; e++)//For all classes in nonFinal array
        {
            if(nonFinal[e].days == "TR" && nonFinal[e].room == z[i] && !(t.includes(nonFinal[e].startTime)) && nonFinal[e].maxEnrollment <= seatNumbers[i])//If current Tuesday/Thursday class has same room as current room and its start time is not in the time array
            {
                t.push(nonFinal[e].startTime);//Add startTime into current time array
                final.push(nonFinal[e]);//Add class into sorted Tuesday/Thursday array
            }
        } 
    }
    for(let i = 0; i < totalRooms.length; i++)//For all totalRooms
    { 
        let t = [];//Time array
        for(let e = 0; e < nonFinal.length; e++)//For all classes in nonFinal array
        {
            if(nonFinal[e].days == "WF" && nonFinal[e].room == z[i] && !(t.includes(nonFinal[e].startTime)) && nonFinal[e].maxEnrollment <= seatNumbers[i])//If current Wednesday/Friday class has same room as current room and its start time is not in the time array
            {
                t.push(nonFinal[e].startTime);//Add startTime into current time array
                final.push(nonFinal[e]);//Add class into sorted Tuesday/Thursday array
            }
        } 
    }
    for(let i = 0; i < totalRooms.length; i++)//For all totalRooms
    { 
        let t = [];//Time array
        for(let e = 0; e < nonFinal.length; e++)//For all classes in nonFinal array
        {
            if(nonFinal[e].days == "MTWRF" && nonFinal[e].room == z[i] && !(t.includes(nonFinal[e].startTime)) && nonFinal[e].maxEnrollment <= seatNumbers[i])//If current Monday/Tuesday/Wednesday/Thursday/Friday class has same room as current room and its start time is not in the time array
            {
                t.push(nonFinal[e].startTime);//Add startTime into current time array
                final.push(nonFinal[e]);//Add class into sorted Tuesday/Thursday array
            }
        } 
    }
    for(let i = 0; i < totalRooms.length; i++)//For all totalRooms
    { 
        let t = [];//Time array
        for(let e = 0; e < nonFinal.length; e++)//For all classes in nonFinal array
        {
            if(nonFinal[e].days == "M" && nonFinal[e].room == z[i] && !(t.includes(nonFinal[e].startTime)) && nonFinal[e].maxEnrollment <= seatNumbers[i])//If current Monday class has same room as current room and its start time is not in the time array
            {
                t.push(nonFinal[e].startTime);//Add startTime into current time array
                final.push(nonFinal[e]);//Add class into sorted Tuesday/Thursday array
            }
        } 
    }
    for(let i = 0; i < totalRooms.length; i++)//For all totalRooms
    { 
        let t = [];//Time array
        for(let e = 0; e < nonFinal.length; e++)//For all classes in nonFinal array
        {
            if(nonFinal[e].days == "T" && nonFinal[e].room == z[i] && !(t.includes(nonFinal[e].startTime)) && nonFinal[e].maxEnrollment <= seatNumbers[i])//If current Tuesday class has same room as current room and its start time is not in the time array
            {
                t.push(nonFinal[e].startTime);//Add startTime into current time array
                final.push(nonFinal[e]);//Add class into sorted Tuesday/Thursday array
            }
        } 
    }
    for(let i = 0; i < totalRooms.length; i++)//For all totalRooms
    { 
        let t = [];//Time array
        for(let e = 0; e < nonFinal.length; e++)//For all classes in nonFinal array
        {
            if(nonFinal[e].days == "W" && nonFinal[e].room == z[i] && !(t.includes(nonFinal[e].startTime)) && nonFinal[e].maxEnrollment <= seatNumbers[i])//If current Wednesday class has same room as current room and its start time is not in the time array
            {
                t.push(nonFinal[e].startTime);//Add startTime into current time array
                final.push(nonFinal[e]);//Add class into sorted Tuesday/Thursday array
            }
        } 
    }
    for(let i = 0; i < totalRooms.length; i++)//For all totalRooms
    { 
        let t = [];//Time array
        for(let e = 0; e < nonFinal.length; e++)//For all classes in nonFinal array
        {
            if(nonFinal[e].days == "R" && nonFinal[e].room == z[i] && !(t.includes(nonFinal[e].startTime)) && nonFinal[e].maxEnrollment <= seatNumbers[i])//If current Thursday class has same room as current room and its start time is not in the time array
            {
                t.push(nonFinal[e].startTime);//Add startTime into current time array
                final.push(nonFinal[e]);//Add class into sorted Tuesday/Thursday array
            }
        } 
    }
    for(let i = 0; i < totalRooms.length; i++)//For all totalRooms
    { 
        let t = [];//Time array
        for(let e = 0; e < nonFinal.length; e++)//For all classes in nonFinal array
        {
            if(nonFinal[e].days == "F" && nonFinal[e].room == z[i] && !(t.includes(nonFinal[e].startTime)) && nonFinal[e].maxEnrollment <= seatNumbers[i])//If current Friday class has same room as current room and its start time is not in the time array
            {
                t.push(nonFinal[e].startTime);//Add startTime into current time array
                final.push(nonFinal[e]);//Add class into sorted Tuesday/Thursday array
            }
        } 
    }
    console.log(final.length);
}

//Structure for all classes with room, first pass through
var nonFinal = [];

//Assign all classes to a class room, and then sort to avoid time conflicts
function algoAssign(totalRooms)
{   let k = 0;//room counter
    let u = [];//startTimes
    let d = [];//endTimes
    let o = [];//days
    let m = [];

    //For all classes in class data, assign a room number. Will be sorted later
    for(let i = 0; i < classData.length; i++)
    {
        let y = [];//stores meeting info

        y = classData[i].meetingDates;//store meeting info
        u = y[0].startTime;//store startTimes
        d = y[0].endTime;//store endTimes
        o = y[0].days;//store days
        m = classData[i].maximumEnrollments;//stores max enrollment number

        if(k >= 30)//If we are at the last room reset to room 0
        {
            k = 0;
        }
        else if(unassignableClasses.includes(classData[i].name))//If class is an unassignable class, skip
        {
            continue;
        }
        else if(classData[i].sectionNumber.includes("82"))//If section has 82 it is Lincoln, skip
        {
            continue;
        }
        else if(o == 'MW')//If days are Monday/Wednesday
        {    
            //Push class with information
            nonFinal.push({room: totalRooms[k], class: classData[i].name + " Section " + classData[i].sectionNumber, days: 'MW', startTime: u, endTime: d, maxEnrollment: m});
        }
        else if(o == 'TR')//If days are Tuesday/Thursday
        {
 
            //Push class with information
            nonFinal.push({room: totalRooms[k], class: classData[i].name + " Section " + classData[i].sectionNumber, days: 'TR', startTime: u, endTime: d, maxEnrollment: m});  
        } 
        else if(o == 'WF')//If days are Wednesday/Friday
        {
            //Push class with information
            nonFinal.push({room: totalRooms[k], class: classData[i].name + " Section " + classData[i].sectionNumber, days: 'WF', startTime: u, endTime: d, maxEnrollment: m});
        } 
        else if(o == 'MTWRF')//If days are Monday/Tuesday/Wednesday/Thursday/Friday
        {
            //Push class with information
            nonFinal.push({room: totalRooms[k], class: classData[i].name + " Section " + classData[i].sectionNumber, days: 'MTWRF', startTime: u, endTime: d, maxEnrollment: m});
        } 
        else if(o == 'M')//If days are Monday only
        {  
            //Push class with information
            nonFinal.push({room: totalRooms[k], class: classData[i].name + " Section " + classData[i].sectionNumber, days: 'M', startTime: u, endTime: d, maxEnrollment: m});
        } 
        else if(o == 'T')//If days are Tuesday only
        { 
            //Push class with information
            nonFinal.push({room: totalRooms[k], class: classData[i].name + " Section " + classData[i].sectionNumber, days: 'T', startTime: u, endTime: d, maxEnrollment: m});
        } 
        else if(o == 'W')//If days are Wednesday only
        {   
            //Push class with information
            nonFinal.push({room: totalRooms[k], class: classData[i].name + " Section " + classData[i].sectionNumber, days: 'W', startTime: u, endTime: d, maxEnrollment: m});
        } 
        else if(o == 'R')//If days are Thursday only
        { 
            //Push class with information
            nonFinal.push({room: totalRooms[k], class: classData[i].name + " Section " + classData[i].sectionNumber, days: 'R', startTime: u, endTime: d, maxEnrollment: m});
        } 
        else if(o == 'F')//If days are Friday only
        {  
            //Push class with information
            nonFinal.push({room: totalRooms[k], class: classData[i].name + " Section " + classData[i].sectionNumber, days: 'F', startTime: u, endTime: d, maxEnrollment: m});
        } 
        k++;//Increment to next room number
    }
    console.log(nonFinal.length);
    //Sort nonFinal into final
    sortNonFinal(z);
    //Store assignment data in object to send to the calendar
    storeAssigninCalendar();
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

//Array of final sorted data to send to the calendar
let finalForCalendar = [];

//Stores final assignment data into finalForCalendar object to be passed to the calendar page
function storeAssigninCalendar()
{
    var dates = ["2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04", "2024-01-05"];//Dates for calendar data
        //For all assigned classes store in calendar format
        for(let i = 0; i < final.length; i++)
        {
            if(nonFinal[i].days == 'MW')//if days are Monday/Wednesday
            {
                // insert class into finalForCalendar
                finalForCalendar.push({startDate: (dates[0] + "T" + final[i].startTime), endDate: (dates[0] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
                finalForCalendar.push({startDate: (dates[2] + "T" + final[i].startTime), endDate: (dates[2] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
            }
            else if(nonFinal[i].days == 'TR')//if days are Tuesday/Thursday
            {
                // insert class into finalForCalendar
                finalForCalendar.push({startDate: (dates[1] + "T" + final[i].startTime), endDate: (dates[1] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
                finalForCalendar.push({startDate: (dates[3] + "T" + final[i].startTime), endDate: (dates[3] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
            }
            if(nonFinal[i].days == 'WF')//if days are Wednesday/Friday
            {
                // insert class into finalForCalendar
                finalForCalendar.push({startDate: (dates[2] + "T" + final[i].startTime), endDate: (dates[2] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
                finalForCalendar.push({startDate: (dates[4] + "T" + final[i].startTime), endDate: (dates[4] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
            }
            else if(nonFinal[i].days == 'MTWRF')//if days are everyday
            {
                // insert class into finalForCalendar
                finalForCalendar.push({startDate: (dates[0] + "T" + final[i].startTime), endDate: (dates[0] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
                finalForCalendar.push({startDate: (dates[1] + "T" + final[i].startTime), endDate: (dates[1] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
                finalForCalendar.push({startDate: (dates[2] + "T" + final[i].startTime), endDate: (dates[2] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
                finalForCalendar.push({startDate: (dates[3] + "T" + final[i].startTime), endDate: (dates[3] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
                finalForCalendar.push({startDate: (dates[4] + "T" + final[i].startTime), endDate: (dates[4] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
            }
            else if(nonFinal[i].days == 'M')//if days are Monday
            {
                // insert class into finalForCalendar
                finalForCalendar.push({startDate: (dates[0] + "T" + final[i].startTime), endDate: (dates[0] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
            }
            else if(nonFinal[i].days == 'T')//if days are Tuesday
            {
                // insert class into finalForCalendar
                finalForCalendar.push({startDate: (dates[1] + "T" + final[i].startTime), endDate: (dates[1] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
            }
            else if(nonFinal[i].days == 'W')//if days are Wednesday
            {
                // insert class into finalForCalendar
                finalForCalendar.push({startDate: (dates[2] + "T" + final[i].startTime), endDate: (dates[2] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
            }
            else if(nonFinal[i].days == 'R')//if days are Thursday
            {
                // insert class into finalForCalendar
                finalForCalendar.push({startDate: (dates[3] + "T" + final[i].startTime), endDate: (dates[3] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
            }
            else if(nonFinal[i].days == 'F')//if days are Friday
            {
                // insert class into finalForCalendar
                finalForCalendar.push({startDate: (dates[4] + "T" + final[i].startTime), endDate: (dates[4] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
            }
    }
    //Reformat the dateTime so the calendar can use it
    formatCalendar();
}

// Store parsed data in db
function storeParsedData(){
    var x = [];//holds all values to be stored in database
    var y = [];//holds meeting time information

    //loops through and assigns data from classData object into array x to be stored in database
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
        //Store data in db with INSERT INTO sql query
        //var query = "INSERT INTO Stage_Course_Sheet (Course_Header, Section_Num, Meeting_Pattern, Session, Campus, Maximum_Enrollment) VALUES (?)";
        // connect.query(query, [x], function(err, result){
        //     if(err) throw err;
        //     console.log(result.affectedRows);
        // });
    }   
}

//Reformats time and date information to work with the calendar page
function formatCalendar()
{   
    //For all calendar data, if startDate or endDate has pm or am in the time, remove it
    for(let i = 0; i < finalForCalendar.length; i++)
    {
        if(finalForCalendar[i].startDate.includes("pm"))
        {
            finalForCalendar[i].startDate = finalForCalendar[i].startDate.replaceAll("pm", "");
        }
        if(finalForCalendar[i].endDate.includes("pm"))
        {
            finalForCalendar[i].endDate = finalForCalendar[i].endDate.replaceAll("pm", "");
        }
        if(finalForCalendar[i].startDate.includes("am"))
        {
            finalForCalendar[i].startDate = finalForCalendar[i].startDate.replaceAll("am", "");
        }
        if(finalForCalendar[i].endDate.includes("am"))
        {
            finalForCalendar[i].endDate = finalForCalendar[i].endDate.replaceAll("am", "");
        }
    }
    //For all calendar data, reformat startTime from 12hr to 24hr format
    for(let i = 0; i < finalForCalendar.length; i++)
    {
        if(finalForCalendar[i].startDate.includes("1:"))
        {
            finalForCalendar[i].startDate = finalForCalendar[i].startDate.replace("1:", "13:");
        }
        else if(finalForCalendar[i].startDate.includes("2:"))
        {
            finalForCalendar[i].startDate = finalForCalendar[i].startDate.replace("2:", "14:");
        }
        else if(finalForCalendar[i].startDate.includes("3:"))
        {
            finalForCalendar[i].startDate = finalForCalendar[i].startDate.replace("3:", "15:");
        }
        else if(finalForCalendar[i].startDate.includes("4:"))
        {
            finalForCalendar[i].startDate = finalForCalendar[i].startDate.replace("4:", "16:");
        }
        else if(finalForCalendar[i].startDate.includes("5:"))
        {
            finalForCalendar[i].startDate = finalForCalendar[i].startDate.replace("5:", "17:");
        }
        else if(finalForCalendar[i].startDate.includes("6:"))
        {
            finalForCalendar[i].startDate = finalForCalendar[i].startDate.replace("6:", "18:");
        }
        //Handle special cases to ensure proper reformatting of startTimes. I.e. for the first case, cases above will reformat T11:45 to T113:45.
        //cases below will only reformat correct times, I.e. T1:45 to T13:45. /.$/ matches any character at the end of a string
        else if(finalForCalendar[i].startDate.endsWith("T1") == true)
        {
            finalForCalendar[i].startDate = finalForCalendar[i].startDate.replace(/.$/, "13");
        }
        else if(finalForCalendar[i].startDate.endsWith("T2") == true)
        {
            finalForCalendar[i].startDate = finalForCalendar[i].startDate.replace(/.$/, "14");
        }
        else if(finalForCalendar[i].startDate.endsWith("T3") == true)
        {
            finalForCalendar[i].startDate = finalForCalendar[i].startDate.replace(/.$/, "15");
        }
        else if(finalForCalendar[i].startDate.endsWith("T4") == true)
        {
            finalForCalendar[i].startDate = finalForCalendar[i].startDate.replace(/.$/, "16");
        }
        else if(finalForCalendar[i].startDate.endsWith("T6") == true)
        {
            finalForCalendar[i].startDate = finalForCalendar[i].startDate.replace(/.$/, "17");
        }
    }
    //For all calendar data, reformat endTime from 12hr to 24hr format
    for(let i = 0; i < finalForCalendar.length; i++)
    {
        if(finalForCalendar[i].endDate.includes("T1:"))
        {
            finalForCalendar[i].endDate = finalForCalendar[i].endDate.replace("1:", "13:");
        }
        else if(finalForCalendar[i].endDate.includes("T2:"))
        {
            finalForCalendar[i].endDate = finalForCalendar[i].endDate.replace("2:", "14:");
        }
        else if(finalForCalendar[i].endDate.includes("3:"))
        {
            finalForCalendar[i].endDate = finalForCalendar[i].endDate.replace("3:", "15:");
        }
        else if(finalForCalendar[i].endDate.includes("4:"))
        {
            finalForCalendar[i].endDate = finalForCalendar[i].endDate.replace("4:", "16:");
        }
        else if(finalForCalendar[i].endDate.includes("5:"))
        {
            finalForCalendar[i].endDate = finalForCalendar[i].endDate.replace("5:", "17:");
        }
        else if(finalForCalendar[i].endDate.includes("6:"))
        {
            finalForCalendar[i].endDate = finalForCalendar[i].endDate.replace("6:", "18:");
        }
        else if(finalForCalendar[i].endDate.includes("7:"))
        {
            finalForCalendar[i].endDate = finalForCalendar[i].endDate.replace("7:", "19:");
        }
        else if(finalForCalendar[i].endDate.includes("8:"))
        {
            finalForCalendar[i].endDate = finalForCalendar[i].endDate.replace("8:", "20:");
        } 
        //Handle special cases to ensure proper reformatting of endTimes. I.e. for the first case, cases above will reformat T11:45 to T113:45.
        //cases below will only reformat correct times, I.e. T1:45 to T13:45. /.$/ matches any character at the end of a string
        else if(finalForCalendar[i].endDate.endsWith("T1"))
        {
            finalForCalendar[i].endDate = finalForCalendar[i].endDate.replace(/.$/, "13");
        }
        else if(finalForCalendar[i].endDate.endsWith("T2") == true)
        {
            finalForCalendar[i].endDate = finalForCalendar[i].endDate.replace(/.$/, "14");
        }
        else if(finalForCalendar[i].endDate.endsWith("T3") == true)
        {
            finalForCalendar[i].endDate = finalForCalendar[i].endDate.replace(/.$/, "15");
        }
        else if(finalForCalendar[i].endDate.endsWith("T4") == true)
        {
            finalForCalendar[i].endDate = finalForCalendar[i].endDate.replace(/.$/, "16");
        }
        else if(finalForCalendar[i].endDate.endsWith("T5") == true)
        {
            finalForCalendar[i].endDate = finalForCalendar[i].endDate.replace(/.$/, "17");
        }
        else if(finalForCalendar[i].endDate.endsWith("T6") == true)
        {
            finalForCalendar[i].endDate = finalForCalendar[i].endDate.replace(/.$/, "18");
        }
        else if(finalForCalendar[i].endDate.endsWith("T7") == true)
        {
            finalForCalendar[i].endDate = finalForCalendar[i].endDate.replace(/.$/, "19");
        }
        else if(finalForCalendar[i].endDate.endsWith("T8") == true)
        {
            finalForCalendar[i].endDate = finalForCalendar[i].endDate.replace(/.$/, "20");
        }
    }
}

// main function, is async because fs.createReadStream() 
async function main() {
    await readCSVData();
    storeParsedData();
    algoAssign(z);
} // end of main

// launch main 
main();
// EOF