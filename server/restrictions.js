/* import data */
import {CourseDescription, ClassroomTimeData} from './Class_Objects.js';
import fs, { read } from 'fs';
import { parse } from 'csv-parse';
import rooms from "./uploads/rooms.json" assert {type: "json"};
import { constants } from 'os';


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
                if (ses.startTime in classDayFrequencies[day]) {
                    classDayFrequencies[day][ses.startTime]++;
                }
                else {
                    classDayFrequencies[day][ses.startTime] = 1;
                }
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
    // set total time (in minutes)
    console.log(parsedDate1);
    console.log(parsedDate2);
    // during the same time
    if (parsedDate2.startHour <= parsedDate1.startHour && parsedDate1.startHour < parsedDate2.endHour ||
        parsedDate1.startHour <= parsedDate2.startHour && parsedDate2.startHour < parsedDate1.endHour) { return 0 }
    // date1 is earlier
    else if (parsedDate1.endHour*60 + parsedDate1.endMin <= parsedDate2.startHour*60 + parsedDate2.startMin) { return -1 }
    // date2 is earlier
    else if (parsedDate2.endHour*60 + parsedDate2.endMin <= parsedDate1.startHour*60 + parsedDate1.startMin) { return 1 }
    else { return "ERROR: could handle date comparison" }
}


/* assign the actual rooms */
function assignRooms() {
    for (var _class of classData) {
        var assignedRoom = false // boolean value to tell if class has already been assigned
        var numClasses = 0; // number of classes we have looped through
        var numMeetingDates = _class.meetingDates.length; // some classes have multiple different meeting dates
        // loop through each of the classes meeting dates
        for (meetingDate of _class.meetingDates) { // typically one so this extra loop will not increase the time complexity to O(n^3) more like O(n^2 + k)
            // loop through each classroom
            while (!assignedRoom) {
                // check if we have looped through all available rooms
                if (numClasses === roomsList.length) {
                    console.log("Couldn't find a classroom for " + _class.name);
                    assignedRoom = true;
                }
                // check if correct campus
                if (!roomsList[k].colleges[_class.campus]) { continue }
                // check if both are lab or not lab
                if (_class.lab !== roomsList[k].isLab) { continue }
                else if (_class.lab) {
                    // is lab
                }
                else {
                    // is regular class
                }
                // Check if current class is assignable
                var days = _class.meetingDates
                numClasses++;
            }
        }
    }
}


/* main function, is async because fs.createReadStream() */
export async function mainRestrictions(path) {
    await readCSVData(path);
    createRoomData();
    howManyClassesPerDay();
    console.log(roomsList[0]);
    console.log(classData[0]);
    // assignRooms();
} // end of main


/* launch main */
var test_path = './server/uploads/test.csv';
mainRestrictions(test_path);


export default {mainRestrictions};