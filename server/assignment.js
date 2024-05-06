import { roomsList, QUEUE, classData, classDayFrequencies, unassignedClasses, compareMeetingDates } from "./restrictions.js";
import { ClassroomTimeSlot } from "./Class_Objects.js";
import fs from 'fs';

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
export function assignRooms() {
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
export function Queueify() {
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
export function writeToCSV() {
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