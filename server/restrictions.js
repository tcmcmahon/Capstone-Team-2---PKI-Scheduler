/* import data */
import {CourseDescription, ClassroomTimeData, PriorityQueue, ClassroomTimeSlot} from './Class_Objects.js';
import fs, { read } from 'fs';
import { parse } from 'csv-parse';
import rooms from "./uploads/rooms.json" assert {type: "json"};
import { setUncaughtExceptionCaptureCallback } from 'process';


/* global variables */
var classData = []; // will hold instances of classDescription, will end up with the data for all of the classes
var crossListedCoursesToCheck = []; // will temporarily hold classes that are cross listed and skip them if listed
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
const meetOnS = ["ECEN 891 - SPECIAL TOPICS IN ELECTRIC AND COMPUTER ENGINEERING IV",
                "ECEN 491 - SPECIAL TOPICS IN ELECTRIC AND COMPUTER ENGINEERING IV"]
var roomsList = [];
var classDayFrequencies = {'M': {},'T': {},'W': {},'R': {},'F': {},'S': {}}
var classDayTotals = {'M': 0,'T': 0,'W': 0,'R': 0,'F': 0,'S': 0}


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
            else if (row[0] === '' && unassignableClasses.includes(prevClassName)) { }
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
    -1 if date1 is earlier
    0  if during the same time 
    1  if date2 is earlier
*/
function compareMeetingDates(date1, date2) { 
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
    console.log(_class);
    var days = _class.meetingDates.days.split("");
    var curr_class, prev_class = null;
    var time_diff;
    var exit = true;
    var room_clone = structuredClone(room); // used in case room is unassignable
    for (var day in days && !exit) {
        if (day === 'M') {
            if (room.monClasses === null) { 
                room.monClasses = new ClassroomTimeSlot(_class)
            }
            else {
                curr_class = room.monClasses;
                while ((curr_class !== null) && (time_diff = compareMeetingDates(_class.meetingDates, curr_class.meetingDates) === 1)) {
                    prev_class = curr_class;
                    curr_class = curr_class.nextClass;
                }
                if (curr_class === null) {
                    curr_class.next = new ClassroomTimeSlot(_class);
                }
                else if (time_diff === -1) {
                    prev_class.next = new ClassroomTimeSlot(_class);
                    prev_class.next.next = curr_class;
                }
                else {
                    exit = false
                    break;
                }
            }
        }
        else if (day === 'T') {
            if (room.tueClasses === null) { room.tueClasses = new ClassroomTimeSlot(_class) }
            else {
                curr_class = room.tueClasses;
                while ((curr_class !== null) && (time_diff = compareMeetingDates(_class.meetingDates, curr_class.meetingDates) === 1)) {
                    prev_class = curr_class;
                    curr_class = curr_class.nextClass;
                }
                if (curr_class === null) {
                    curr_class.next = new ClassroomTimeSlot(_class);
                }
                else if (time_diff === -1) {
                    prev_class.next = new ClassroomTimeSlot(_class);
                    prev_class.next.next = curr_class;
                }
                else {
                    exit = false;
                    break;
                }
            }
        }
        else if (day === 'W') {
            if (room.wedClasses === null) { room.wedClasses = new ClassroomTimeSlot(_class) }
            else {
                curr_class = room.wedClasses;
                while ((curr_class !== null) && (time_diff = compareMeetingDates(_class.meetingDates, curr_class.meetingDates) === 1)) {
                    prev_class = curr_class;
                    curr_class = curr_class.nextClass;
                }
                if (curr_class === null) {
                    curr_class.next = new ClassroomTimeSlot(_class);
                }
                else if (time_diff === -1) {
                    prev_class.next = new ClassroomTimeSlot(_class);
                    prev_class.next.next = curr_class;
                }
                else {
                    exit = false;
                    break;
                }
            }
        }
        else if (day === 'R') {
            if (room.thuClasses === null) { room.thuClasses = new ClassroomTimeSlot(_class) }
            else {
                curr_class = room.thuClasses;
                while ((curr_class !== null) && (time_diff = compareMeetingDates(_class.meetingDates, curr_class.meetingDates) === 1)) {
                    prev_class = curr_class;
                    curr_class = curr_class.nextClass;
                }
                if (curr_class === null) {
                    curr_class.next = new ClassroomTimeSlot(_class);
                }
                else if (time_diff === -1) {
                    prev_class.next = new ClassroomTimeSlot(_class);
                    prev_class.next.next = curr_class;
                }
                else {
                    exit = false;
                    break;
                }
            }
        }
        else if (day === 'F') {
            if (room.friClasses === null) { 
                room.friClasses = new ClassroomTimeSlot(_class)
                console.log("Friday Classes: ");
                console.log(room.monClasses);
            }
            else {
                curr_class = room.friClasses;
                while ((curr_class !== null) && (time_diff = compareMeetingDates(_class.meetingDates, curr_class.meetingDates) === 1)) {
                    prev_class = curr_class;
                    curr_class = curr_class.nextClass;
                }
                if (curr_class === null) {
                    curr_class.next = new ClassroomTimeSlot(_class);
                }
                else if (time_diff === -1) {
                    prev_class.next = new ClassroomTimeSlot(_class);
                    prev_class.next.next = curr_class;
                }
                else {
                    exit = false;
                    break;
                }
            }
        }
        else if (day === 'S') {
            if (room.s_sClasses === null) { room.s_sClasses = new ClassroomTimeSlot(_class) }
            else {
                curr_class = room.s_sClasses;
                while ((curr_class !== null) && (time_diff = compareMeetingDates(_class.meetingDates, curr_class.meetingDates) === 1)) {
                    prev_class = curr_class;
                    curr_class = curr_class.nextClass;
                }
                if (curr_class === null) {
                    curr_class.next = new ClassroomTimeSlot(_class);
                }
                else if (time_diff === -1) {
                    prev_class.next = new ClassroomTimeSlot(_class);
                    prev_class.next.next = curr_class;
                }
                else {
                    exit = false;
                    break;
                }
            }
        }
    }
    if (exit) {
        console.log(room);
        return true;
    }
    else {
        room = room_clone;
        return false;
    }
}


/* assign the actual rooms */
function assignRooms() {
    // add courses to queue first
    // var test_data = classData;
    // var test_data =[classData[0], classData[143], classData[1], classData[180],
    //                 classData[50], classData[73], classData[115], classData[14],
    //                 classData[80], classData[69], classData[42], classData[142]];
    var test_data =[classData[0]];
    const Q = new PriorityQueue();
    for (var i in test_data) {
        Q.enqueue(test_data[i]);
    }
    console.log("Queue created");
    var _class = Q.dequeue();
    while (_class !== undefined) {
        console.log("\tPopped class: " + _class.name);
        var assignedRoom = false // boolean value to tell if class has already been assigned
        var numRoomsChecked = 0; // number of classes we have looped through
        while (!assignedRoom) {
            if (numRoomsChecked >= roomsList.length) { break }
            console.log("\t\tChecking room: ", roomsList[numRoomsChecked].roomNumber);
            if (!roomsList[numRoomsChecked].colleges[_class.campus]) { }
            else if (_class.lab !== roomsList[numRoomsChecked].isLab) { }
            else if (_class.maximumEnrollments > roomsList[numRoomsChecked].roomSize) { }
            else if (canBeAssigned(_class, roomsList[numRoomsChecked])) { 
                assignedRoom = true;
            }
            numRoomsChecked++;
        }
        console.log(assignedRoom ? "\tAssigned: " + _class.name + "\n\tto: " + roomsList[--numRoomsChecked].roomNumber : "\tCouldn't find a classroom for " + _class.name);
        _class = Q.dequeue();
    }
}



// things to keep track of
/* 
    Y | How long does the class last
    Y | How busy is the class at that time during that day
    N | Take into account how important that time is at that day during the week
*/
function testQueue() {
    const QUEUE = new PriorityQueue();
    const TOTAL_AVAILABLE_TIME = (15*60 + 15) * 6; // Overall time of when classes can be scheduled throughout the week
    var totalCourseTime;
    var classBusyness;
    var start, end, startSplit, endSplit;
    // loop through each class
    for (var _class of classData) {
        classBusyness = 0;
        // loop through each meeting time
        for (var meetingDate of _class.meetingDates) {
            // loop through each day
            totalCourseTime = 0;
            for (var day of meetingDate.days) { 
                classBusyness += classDayFrequencies[day][meetingDate.start];
                startSplit = meetingDate.start.split(":");
                endSplit = meetingDate.end.split(":");
                if (meetingDate.start.includes("pm") && !meetingDate.start.includes("12")) {
                    start = startSplit.length > 1 
                            ? 12*60 + parseInt(startSplit[0])*60 + parseInt(startSplit[1])
                            : 12*60 + parseInt(startSplit[0])*60;
                }
                else {
                    start = startSplit.length > 1 
                            ? parseInt(startSplit[0])*60 + parseInt(startSplit[1] )
                            : parseInt(startSplit[0])*60;
                }
                if (meetingDate.end.includes("pm") && !meetingDate.end.includes("12")) {
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
            console.log(meetingDate);
            console.log("Start: " + start);
            console.log("End: " + end);
            console.log("Total: " + totalCourseTime);
            console.log("Number of shared classes at start time: " + classBusyness);
            console.log("Frequency      : " + totalCourseTime/TOTAL_AVAILABLE_TIME * 100);
        }
        console.log("\n");
        // QUEUE.enqueue(classData[i]);
    }
    console.log(TOTAL_AVAILABLE_TIME);
    // QUEUE.displayContents();
}


/* main function, is async because fs.createReadStream() */
export async function mainRestrictions(path) {
    await readCSVData(path);
    createRoomData();
    howManyClassesPerDay();
    // console.log(classDayFrequencies);
    // console.log(classDayTotals);
    testQueue();
} // end of main


/* launch main */
var test_path = './server/uploads/test.csv';
mainRestrictions(test_path);


export default {mainRestrictions};