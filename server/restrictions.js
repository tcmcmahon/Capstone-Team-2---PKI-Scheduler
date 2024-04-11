/* import data */
import {CourseDescription, ClassroomTimeData, PriorityQueue, ClassroomTimeSlot} from './Class_Objects.js';
import fs, { read } from 'fs';
import { parse } from 'csv-parse';
import rooms from "./uploads/rooms.json" assert {type: "json"};
import { setUncaughtExceptionCaptureCallback } from 'process';


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
                                    ['2']]
const meetOnS = ["ECEN 891 - SPECIAL TOPICS IN ELECTRIC AND COMPUTER ENGINEERING IV",
                "ECEN 491 - SPECIAL TOPICS IN ELECTRIC AND COMPUTER ENGINEERING IV"]
var roomsList = [];
var classDayFrequencies = {'M': {},'T': {},'W': {},'R': {},'F': {},'S': {}}
var classDayTotals = {'M': 0,'T': 0,'W': 0,'R': 0,'F': 0,'S': 0}
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
            if (row[34] !== '' && cd.checkIfCrossListed([row[6], row[7]], row[34], crossListedCoursesToCheck)) { /* cross listed */ }
            else if (row[0] === '' 
                    && unassignableClasses.includes(prevClassName) 
                    && unassignableClassesSections[unassignableClasses.indexOf(prevClassName)].includes(row[7])) { }
            else if (row[29] > 60 || row[35] > 60) {}
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
    -2 if date2 is null
    -1 if date1 is earlier
    0  if during the same time 
    1  if date2 is earlier
*/
function compareMeetingDates(date1, date2) { 
    if (date2 === null) {
        return -2;
    }
    var parsedDate1 = {'startHour': null,
                        'startMin': null,
                        'endHour': null,
                        'endMin': null};
    var parsedDate2 = {'startHour': null,
                        'startMin': null,
                        'endHour': null,
                        'endMin': null};
    // splice the start hours
    var date1split = date1.startTime.slice(0, -2).split(":");
    var date2split = date2.startTime.slice(0, -2).split(":");
    // set start hours
    parsedDate1.startHour = date1.startTime.includes("pm") && parseInt(date1split[0]) !== 12 
                            ? parseInt(date1split[0]) + 12 : parseInt(date1split[0]);
    parsedDate2.startHour = date2.startTime.includes("pm") && parseInt(date2split[0]) !== 12 
                            ? parseInt(date2split[0]) + 12 : parseInt(date2split[0]);
    // set start minutes 
    parsedDate1.startMin = isNaN(parseInt(date1split[1])) ? 0 : parseInt(date1split[1]);
    parsedDate2.startMin = isNaN(parseInt(date2split[1])) ? 0 : parseInt(date2split[1]);
    // splice the end hours
    date1split = date1.endTime.slice(0, -2).split(":");
    date2split = date2.endTime.slice(0, -2).split(":");
    // set end hours
    parsedDate1.endHour = date1.endTime.includes("pm") && parseInt(date1split[0]) !== 12 
                            ? parseInt(date1split[0]) + 12 : parseInt(date1split[0]);
    parsedDate2.endHour = date2.endTime.includes("pm") && parseInt(date2split[0]) !== 12 
                            ? parseInt(date2split[0]) + 12 : parseInt(date2split[0]);
    // set start minutes 
    parsedDate1.endMin = isNaN(parseInt(date1split[1])) ? 0 : parseInt(date1split[1]);
    parsedDate2.endMin = isNaN(parseInt(date2split[1])) ? 0 : parseInt(date2split[1]);
    // during the same time
    if (parsedDate2.startHour <= parsedDate1.startHour && parsedDate1.startHour < parsedDate2.endHour ||
        parsedDate1.startHour <= parsedDate2.startHour && parsedDate2.startHour < parsedDate1.endHour) { return 0 }
    // date1 is earlier
    else if (parsedDate1.endHour*60 + parsedDate1.endMin <= parsedDate2.startHour*60 + parsedDate2.startMin) { return -1 }
    // date2 is earlier
    else if (parsedDate2.endHour*60 + parsedDate2.endMin <= parsedDate1.startHour*60 + parsedDate1.startMin) { return 1 }
    else { return "ERROR: could handle date comparison" }
}


function canBeAssigned(_class, room) {
    var found = true;
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
    for (var classDay of classDays) {
        if (classDay === null) {
            classDay = new ClassroomTimeSlot(_class);
            continue;
        }
        currClass = classDay;
        timeDiff = compareMeetingDates(_class.MeetingDates, currClass.class.meetingDates);
        while (currClass !== null) {
            if (timeDiff === 1) {
                prevClass = currClass;
                currClass = currClass.next
            }
            else if (timeDiff === 0) {
                found = false;
                room = roomClone;
                return found;
            }
            else if (timeDiff < 0) {
                prevClass.next = new ClassroomTimeSlot(_class, currClass);
            }
        }
    }
    return found;
}


/* assign the actual rooms */
function assignRooms() {
    // add courses to queue first
    // var test_limit = [0, 1, 14, 42, 50, 69, 73, 80, 115, 142, 143, 160];
    var test_limit = [0];
    var test_data = [];
    for (var i = 0; i < QUEUE.queue.length; i++) {
        test_data.push(QUEUE.dequeue());
        if (!test_limit.includes(i)) {
            test_data.pop()
        }
    }
    var i = 0;
    var _class = test_data.shift();
    while (_class !== undefined) {
        console.log(i++);
        console.log("\Assigning class: " + _class[0].name);
        // console.log(_class[0]);
        var assignedRoom = false // boolean value to tell if class has already been assigned
        var numRoomsChecked = 0; // number of classes we have looped through
        while (!assignedRoom) {
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
            else if (!canBeAssigned(_class[0], roomsList[numRoomsChecked])) { 
                // console.log("\t\t\tNo Rooms Available");
            }
            else { assignedRoom = true }
            numRoomsChecked++;
        }
        console.log(assignedRoom ? "\tAssigned: " + _class[0].name + "\n\tto: " + roomsList[--numRoomsChecked].roomNumber + "\n\n" : "\tCouldn't find a classroom for " + _class[0].name + "\n\n");
        _class = test_data.shift();
    }
    console.log(roomsList[5]);
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


/* main function, is async because fs.createReadStream() */
export async function mainRestrictions(path) {
    await readCSVData(path);
    createRoomData();
    howManyClassesPerDay();
    Queueify();
    // console.log(QUEUE.queue.length);
    // console.log(QUEUE.queue[0][0]);
    // console.log(QUEUE.queue[3][0]);
    assignRooms();
} // end of main


/* launch main */
var test_path = './server/uploads/test.csv';
mainRestrictions(test_path);


export default {mainRestrictions};