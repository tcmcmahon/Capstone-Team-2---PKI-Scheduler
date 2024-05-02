/* import data */
import {CourseDescription, ClassroomTimeData, PriorityQueue, ClassroomTimeSlot} from './Class_Objects.js';
import fs from 'fs';
import { parse } from 'csv-parse';
import rooms from "./uploads/rooms.json" assert {type: "json"};
import { formatTimes } from "./formatTime.js";
import express from 'express';
import cors from 'cors';

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
ex.get("/Algo", (req, res) => {res.json(ft);});//Send data in json

/** Start server listener on port 3001 for data requests 
 * @function
 * @returns {void} Starts a listener for data on http://localhost:3001
 * @memberof Restrictions
 */
ex.listen(3001, () => console.log("Server is up"));//Listen on port 3001 for data requests to /Data and /Algo 

/* global variables */
var classData = []; // will hold instances of classDescription, will end up with the data for all of the classes
var crossListedCoursesToCheck = []; // will temporarily hold classes that are cross listed and skip them if listed
const unassignableClasses =["AREN 3030 - AE DESIGN AND SIMULATION STUDIO III",
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
                            "CNST 225 - INTRODUCTION TO BUILDING INFORMATION MODELING",
                            "ECEN 103 - ELECTRICAL AND COMPUTER ENGINEERING FUNDAMENTALS",
                            "ECEN 106 - MICROPROCESSOR APPLICATIONS",
                            "ECEN 123 - INTRODUCTION TO ELECTRICAL AND COMPUTER ENGINEERING",
                            "ECEN 194 - SPECIAL TOPICS IN ELECTRICAL AND COMPUTER ENGINEERING I",
                            "ECEN 313 - SWITCHING CIRCUITS THEORY",
                            "ECEN 433 - MICROPROCESSOR SYSTEM DESIGN"];
const unassignableClassesSections =[['1', '2', '3', '4'],
                                    ['2', '3', '4'],
                                    ['2', '3', '4'],
                                    ['1', '2', '3', '4'],
                                    ['1', '2', '3', '4'],
                                    ['1', '2', '3', '4'],
                                    ['1', '2', '3', '4'],
                                    ['1', '2', '3', '4'],
                                    ['1', '2', '3', '4'],
                                    ['2', '3'],
                                    ['1', '2', '3', '4'],
                                    ['1', '2', '3', '4'],
                                    ['2'],
                                    ['3', '4'],
                                    ['1', '2', '3', '4'],
                                    ['2', '4'],
                                    ['2', '3'],
                                    ['2']];
const meetOnS = ["ECEN 891 - SPECIAL TOPICS IN ELECTRIC AND COMPUTER ENGINEERING IV",
                "ECEN 491 - SPECIAL TOPICS IN ELECTRIC AND COMPUTER ENGINEERING IV"];
var roomsList = [];
var classDayFrequencies = {'M': {},'T': {},'W': {},'R': {},'F': {},'S': {}}
var classDayTotals = {'M': 0,'T': 0,'W': 0,'R': 0,'F': 0,'S': 0}
var unassignedClasses = [];
const QUEUE = new PriorityQueue();


/* read data from the csv file */
function readCSVData(file_path) {
    return new Promise((resolve) => {
        var prevClassName; // holds the previous class stated in csv file
        fs.createReadStream(file_path)
        .pipe(
            parse({from_line: 4}) // starts reading at line 4 with "AREN 1030 - DESIGN AND SIMULATION STUDIO I"
        ) 
        .on('data', function (row) { // iterates through each row in csv file
            var cd = new CourseDescription(); // creates object to store class data
            if (row[34] !== '' && cd.checkIfCrossListed([row[6], row[7]], row[34], crossListedCoursesToCheck)) { /* cross listed / class is already in classData */ }
            else if (Number(row[7]) >= 800) { /* bad section number */ } 
            else if (row[0] === '' 
                    && unassignableClasses.includes(prevClassName) 
                    && unassignableClassesSections[unassignableClasses.indexOf(prevClassName)].includes(row[7])) { /* class is unassignable with bad section number */ }
            else if (row[29] > 60 || row[35] > 60) { /* too many students to sit */ }
            else if (row[0] === '') {
                cd.setCourseName(prevClassName);
                cd.setSectionNum(row[7]);
                cd.setLab(row[9]);
                cd.spliceTime(row[11]);
                cd.setSession(row[16]);
                cd.setCampus(row[17]);
                cd.setClassSize(row[29], row[35])
                classData.push(cd);
            }
            else { // will save the previous class name for the next row
                prevClassName = row[0];
            } // end of if statement
        })
        .on('end', function() {
            console.log(classData.length);
            resolve(classData); // saves the data for classData
        }) // end of fs read
    }); // end of return
} // end of readCSVData


/* primes the room data */
function createRoomData() {
    for (const key in rooms){
        var room = new ClassroomTimeData();
        room.roomNumber = key;
        room.colleges['CoE'] = rooms[key].Info['CoE'];
        room.colleges['IS&T'] = rooms[key].Info['IS&T'];
        room.roomSize = rooms[key].Seats;
        room.isLab = rooms[key].RoomType === "Lab" ? true : false;
        roomsList.push(room);
    }
}


/* Primarily for testing number of assignable classrooms per given day */
function howManyClassesPerDay() {
    var total_count = 0;
    // loop through each class
    for (var _class of classData) {
        // loop through each of the meeting dates
        for (var ses of _class.meetingDates) {
            // loop through each day of the meeting dates
            var days = ses.days.split("");
            for (var day of days) {
                if (ses.start in classDayFrequencies[day]) {
                    classDayFrequencies[day][ses.start]++;
                }
                else {
                    classDayFrequencies[day][ses.start] = 1;
                }
                classDayTotals[day]++;
            }
        }
        total_count++;
    }
}


/* Will compare two meeting dates, return types:
    -2 if stable is null
    -1 if test is earlier
    0  if during the same time 
    1  if stable is earlier
*/
function compareMeetingDates(test, stable) { 
    if (stable === null) {
        return -2;
    }
    var parsedTest = {'startHour': null,
                        'startMin': null,
                        'endHour': null,
                        'endMin': null,
                        'startTotal': null,
                        'endTotal': null};
    var parsedStable = {'startHour': null,
                        'startMin': null,
                        'endHour': null,
                        'endMin': null,
                        'startTotal': null,
                        'endTotal': null};
    // splice the start hours
    var testSplit = test.start.slice(0, -2).split(":");
    var stableSplit = stable.start.slice(0, -2).split(":");
    // set start hours
    parsedTest.startHour = test.start.includes("pm") && parseInt(testSplit[0]) !== 12 
                            ? parseInt(testSplit[0]) + 12 : parseInt(testSplit[0]);
    parsedStable.startHour = stable.start.includes("pm") && parseInt(stableSplit[0]) !== 12 
                            ? parseInt(stableSplit[0]) + 12 : parseInt(stableSplit[0]);
    // set start minutes 
    parsedTest.startMin = isNaN(parseInt(testSplit[1])) ? 0 : parseInt(testSplit[1]);
    parsedStable.startMin = isNaN(parseInt(stableSplit[1])) ? 0 : parseInt(stableSplit[1]);
    // splice the end hours
    testSplit = test.end.slice(0, -2).split(":");
    stableSplit = stable.end.slice(0, -2).split(":");
    // set end hours
    parsedTest.endHour = test.end.includes("pm") && parseInt(testSplit[0]) !== 12 
                            ? parseInt(testSplit[0]) + 12 : parseInt(testSplit[0]);
    parsedStable.endHour = stable.end.includes("pm") && parseInt(stableSplit[0]) !== 12 
                            ? parseInt(stableSplit[0]) + 12 : parseInt(stableSplit[0]);
    // set start minutes 
    parsedTest.endMin = isNaN(parseInt(testSplit[1])) ? 0 : parseInt(testSplit[1]);
    parsedStable.endMin = isNaN(parseInt(stableSplit[1])) ? 0 : parseInt(stableSplit[1]);
    // set totals
    parsedTest.endTotal = parsedTest.endHour*60+parsedTest.endMin;
    parsedTest.startTotal = parsedTest.startHour*60+parsedTest.startMin;
    parsedStable.endTotal = parsedStable.endHour*60+parsedStable.endMin;
    parsedStable.startTotal = parsedStable.startHour*60+parsedStable.startMin;
    // during the same time
    if (parsedStable.startTotal <= parsedTest.startTotal && parsedTest.startTotal < parsedStable.endTotal ||
        parsedTest.startTotal <= parsedStable.startTotal && parsedStable.startTotal < parsedTest.endTotal) { return 0 }
    // date1 is earlier
    else if (parsedTest.endHour*60 + parsedTest.endMin <= parsedStable.startHour*60 + parsedStable.startMin) { return -1 }
    // date2 is earlier
    else if (parsedStable.endHour*60 + parsedStable.endMin <= parsedTest.startHour*60 + parsedTest.startMin) { return 1 }
    else { return null }
}


function canBeAssigned(_class, room) {
    var roomClone = structuredClone(room); // backup in case room isn't available
    var currClass, prevClass = null;
    var classDays = [];
    var timeDiff;
    for (var day of _class.meetingDates.days.split("")) {
        switch (day) {
            case 'M':
                classDays.push(room.monClasses);
                break;
            case 'T':
                classDays.push(room.tueClasses);
                break;
            case 'W':
                classDays.push(room.wedClasses);
                break;
            case 'R':
                classDays.push(room.thuClasses);
                break;
            case 'F':
                classDays.push(room.friClasses);
                break;
            case 'S':
                classDays.push(room.s_sClasses);
                break;
            default:
                console.log("WE HAVE A PROBLEM");
        }
    }
    for (var i in classDays) {
        if (classDays[i].class === null) {
            classDays[i].class = _class;
            continue;
        }
        currClass = classDays[i];
        
        while (currClass !== null) {
            timeDiff = compareMeetingDates(_class.meetingDates, currClass.class.meetingDates);
            if (timeDiff === null) {
                process.exit();
            }
            else if (timeDiff > 0) {
                prevClass = currClass;
                currClass = currClass.getNext()
            }
            else if (timeDiff === 0) {
                room = roomClone;
                return false;
            }
            else if (timeDiff < 0) {
                if (prevClass === null) {
                    currClass.setNext(new ClassroomTimeSlot(currClass.getClass(), currClass.getNext()));
                    currClass.setClass(_class);
                }
                else {
                    prevClass.setNext(new ClassroomTimeSlot(_class, currClass));
                }
                break;
            }
        }
        if (currClass === null) {
            prevClass.setNext(new ClassroomTimeSlot(_class, currClass));
        }
    }
    return true;
}


/* assign the actual rooms */
function assignRooms() {
    // add courses to queue first
    var test_data = [];
    var len = QUEUE.queue.length;
    for (var i = 0; i < len; i++) {
        test_data.push(QUEUE.dequeue());
    }
    var i = 0;
    var _class = test_data.shift();
    while (_class !== undefined) {
        var possibleRooms = {}; // {points : [room, room, ...], points : [room, room, ...], ...} is also stored in order in memory
        console.log(i++);
        console.log("\Assigning class: " + _class[0].name);
        var assignedRoom = false // boolean value to tell if class has already been assigned
        var numRoomsChecked = 0; // number of classes we have looped through
        while (numRoomsChecked < roomsList.length) {
            if (numRoomsChecked >= roomsList.length) { break } // checked everyroom and couldn't find a slot
            // console.log("\t\tChecking room: ", roomsList[numRoomsChecked].roomNumber);
            if (!roomsList[numRoomsChecked].colleges[_class[0].campus]) { 
                // console.log("\t\t\tWrong College");
            }
            else if (_class[0].isLab !== roomsList[numRoomsChecked].isLab) {
                // console.log("\t\t\tLab Issue");
            }
            else if (_class[0].maximumEnrollments > roomsList[numRoomsChecked].roomSize) { 
                // console.log("\t\t\tSmall Size");
            }
            else { 
                var points = roomsList[numRoomsChecked].roomSize - _class[0].maximumEnrollments;
                if (possibleRooms[points] !== undefined) {
                    possibleRooms[points].push(roomsList[numRoomsChecked])
                }
                else {
                    possibleRooms[points] = [roomsList[numRoomsChecked]];
                }
            }
            numRoomsChecked++;
        }
        var r;
        for (const [points, rooms] of Object.entries(possibleRooms)) {
            for (var room of rooms) {
                if (!canBeAssigned(_class[0], room)) {
                    // console.log("\t\t\tNo Rooms Available");
                }
                else {
                    // console.log(points);
                    // console.log(room);
                    _class[0].room = room.roomNumber;
                    assignedRoom = true;
                    r = room;
                    break;
                }
            }
            if (assignedRoom) {
                break;
            }
        }
        if (!assignedRoom) {
            unassignedClasses.push(_class[0]);
        }
        // console.log(assignedRoom ? "\tAssigned: " + _class[0].name + "\n\tto: " + roomsList[--numRoomsChecked].roomNumber : "\tCouldn't find a classroom for " + _class[0].name);
        console.log(assignedRoom ? "\tAssigned: " + _class[0].name + "\n\tto: " + r.roomNumber : "\tCouldn't find a classroom for " + _class[0].name);
        _class = test_data.shift();
    }
    return null;
}


/* Put the classes from classData into a Queue */ 
function Queueify() {
    var totalCourseTime;
    var classBusyness;
    var start, end, startSplit, endSplit;
    var i;
    // loop through each class
    for (var _class of classData) {
        classBusyness = 0;
        i = 0;
        // loop through each meeting time
        for (var date of _class.meetingDates) {
            // loop through each day
            totalCourseTime = 0;
            // loop through each day of the individual meeting date
            for (var day of date.days) { 
                classBusyness += classDayFrequencies[day][date.start];
                startSplit = date.start.split(":");
                endSplit = date.end.split(":");
                if (date.start.includes("pm") && !date.start.includes("12")) {
                    start = startSplit.length > 1 
                            ? 12*60 + parseInt(startSplit[0])*60 + parseInt(startSplit[1])
                            : 12*60 + parseInt(startSplit[0])*60;
                }
                else {
                    start = startSplit.length > 1 
                            ? parseInt(startSplit[0])*60 + parseInt(startSplit[1])
                            : parseInt(startSplit[0])*60;
                }
                if (date.end.includes("pm") && !date.end.includes("12")) {
                    end = endSplit.length > 1 
                            ? 12*60 + parseInt(endSplit[0])*60 + parseInt(endSplit[1])
                            : 12*60 + parseInt(endSplit[0])*60;
                }
                else {
                    end = endSplit.length > 1 
                            ? parseInt(endSplit[0])*60 + parseInt(endSplit[1])
                            : parseInt(endSplit[0])*60;
                }
                totalCourseTime += end - start;
            }
            QUEUE.enqueue(structuredClone(_class), i, totalCourseTime);
            i++;
        }
    }
    // QUEUE.displayContents();
}

/* writes roomsList into readable from */
function writeToCSV() {
    var data = "";
    var days;
    var daysLetter = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sat/Sun"];
    var currClass;
    var counter = 0;
    // loop through each room
    for (var r of roomsList) {
        data += `${r.roomNumber}, \n`;
        days = [r.monClasses, r.tueClasses, r.wedClasses, r.thuClasses, r.friClasses, r.s_sClasses];
        // loop through each of the classes
        for (var i in days) {
            data += " , " + daysLetter[i] + ", ";
            // loop through each class
            currClass = days[i];
            while (currClass !== null && currClass.getClass() !== null) {
                data += currClass.getClass().meetingDates.start + "-" + currClass.getClass().meetingDates.end + ", ";
                currClass = currClass.getNext();
                counter++;
            }
            data += "\n"; 
        }
    }
    // write to file
    fs.writeFile("./uploads/output.csv", data, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Data has been written to output.csv");
        }
    });
}

let ft = [];
let finalForCalendar = [];

function calendarFormat()
{
    var days;
    var currClass;
    var counter = 0;

    // loop through each room
    for (var r of roomsList) {
        days = [r.monClasses, r.tueClasses, r.wedClasses, r.thuClasses, r.friClasses, r.s_sClasses];
        // loop through each of the classes
        for (var i in days) {
            // loop through each class
            currClass = days[i];
            while (currClass !== null && currClass.getClass() !== null) {
                ft.push({startTime: currClass.getClass().meetingDates.start, endTime: currClass.getClass().meetingDates.end, days: currClass.getClass().meetingDates.days, title: currClass.getClass().name, room: currClass.getClass().room, section: currClass.getClass().sectionNumber})
                currClass = currClass.getNext();
                counter++;
            }
        }
    }
    formatTimes(ft);
    let dates = ["2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04", "2024-01-05"];
    let y = [];
    for(let i = 0; i < ft.length; i++)
    {
        if(ft[i].days === "MW" && !y.includes(ft[i].title))
        {   
            y.push(ft[i].title);
            finalForCalendar.push({startDate: (dates[0] + "T" + ft[i].startTime), endDate: (dates[0] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
            finalForCalendar.push({startDate: (dates[2] + "T" + ft[i].startTime), endDate: (dates[2] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
        }
        else if(ft[i].days === "MWF" && !y.includes(ft[i].title))
        {
            y.push(ft[i].title);
            finalForCalendar.push({startDate: (dates[0] + "T" + ft[i].startTime), endDate: (dates[0] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
            finalForCalendar.push({startDate: (dates[2] + "T" + ft[i].startTime), endDate: (dates[2] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
            finalForCalendar.push({startDate: (dates[4] + "T" + ft[i].startTime), endDate: (dates[4] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
        }
        else if(ft[i].days === "MTWRF" && !y.includes(ft[i].title))
        {
            y.push(ft[i].title);
            finalForCalendar.push({startDate: (dates[0] + "T" + ft[i].startTime), endDate: (dates[0] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
            finalForCalendar.push({startDate: (dates[1] + "T" + ft[i].startTime), endDate: (dates[1] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
            finalForCalendar.push({startDate: (dates[2] + "T" + ft[i].startTime), endDate: (dates[2] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
            finalForCalendar.push({startDate: (dates[3] + "T" + ft[i].startTime), endDate: (dates[3] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
            finalForCalendar.push({startDate: (dates[4] + "T" + ft[i].startTime), endDate: (dates[4] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
        }
        else if(ft[i].days === "TR" && !y.includes(ft[i].title))
        {
            y.push(ft[i].title);
            finalForCalendar.push({startDate: (dates[1] + "T" + ft[i].startTime), endDate: (dates[1] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
            finalForCalendar.push({startDate: (dates[3] + "T" + ft[i].startTime), endDate: (dates[3] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
        }
        else if(ft[i].days === "WF" && !y.includes(ft[i].title))
        {
            y.push(ft[i].title);
            finalForCalendar.push({startDate: (dates[2] + "T" + ft[i].startTime), endDate: (dates[2] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
            finalForCalendar.push({startDate: (dates[4] + "T" + ft[i].startTime), endDate: (dates[4] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
        }
        else if(ft[i].days === "M" && !y.includes(ft[i].title))
        {
            y.push(ft[i].title);
            finalForCalendar.push({startDate: (dates[0] + "T" + ft[i].startTime), endDate: (dates[0] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
        }
        else if(ft[i].days === "T" && !y.includes(ft[i].title))
        {
            y.push(ft[i].title);
            finalForCalendar.push({startDate: (dates[1] + "T" + ft[i].startTime), endDate: (dates[1] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
        }
        else if(ft[i].days === "W" && !y.includes(ft[i].title))
        {
            y.push(ft[i].title);
            finalForCalendar.push({startDate: (dates[2] + "T" + ft[i].startTime), endDate: (dates[2] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
        }
        else if(ft[i].days === "R" && !y.includes(ft[i].title))
        {
            y.push(ft[i].title);
            finalForCalendar.push({startDate: (dates[3] + "T" + ft[i].startTime), endDate: (dates[3] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
        }
        else if(ft[i].days === "F" && !y.includes(ft[i].title))
        {
            y.push(ft[i].title);
            finalForCalendar.push({startDate: (dates[4] + "T" + ft[i].startTime), endDate: (dates[4] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
        }
    }
}

/* main function, is async because fs.createReadStream() */
export async function mainRestrictions(path) {
    await readCSVData(path);
    createRoomData();
    howManyClassesPerDay();
    Queueify();
    assignRooms();
    writeToCSV();
    if (unassignedClasses.length > 0) 
    {
        for (var i in unassignedClasses) {
            console.log(`#${i+1} : ${unassignedClasses[i].name}`);
        }
    }
    else 
    {
        console.log("Number of unassigned classes: " + unassignedClasses.length);
    }
    calendarFormat();
} // end of main


/* launch main */
var test_path = './uploads/test.csv';
mainRestrictions(test_path);

export default {mainRestrictions};