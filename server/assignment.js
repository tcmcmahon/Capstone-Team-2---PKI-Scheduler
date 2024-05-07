import { roomsList, QUEUE, classData, classDayFrequencies, compareMeetingDates, 
    assignedClassData, logger } from "./restrictions.js";
import { ClassroomTimeSlot } from "./Class_Objects.js";
import fs from 'fs';

var finalUnassignedClasses = [];

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
                logger.warn("Please check the days of class " + _class.name);
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
    // prioritize assigned rooms
    for (var _class of assignedClassData) {
        test_data.push([_class, -1]);
    }
    // push unassigned rooms by priority
    for (var i = 0; i < len; i++) {
        test_data.push(QUEUE.dequeue());
    }
    var i = 0;
    var _class = test_data.shift();
    while (_class !== undefined) {
        var possibleRooms = {}; // {points : [room, room, ...], points : [room, room, ...], ...} is also stored in order in memory
        logger.info("Course #" + ++i);
        logger.info("Assigning class: " + _class[0].name);
        var assignedRoom = false // boolean value to tell if class has already been assigned
        var numRoomsChecked = 0; // number of classes we have looped through
        while (numRoomsChecked < roomsList.length) {
            if (_class[0] !== null && _class[0].room === roomsList[numRoomsChecked].roomNumber) {
                if(canBeAssigned(_class[0], roomsList[numRoomsChecked])) {
                    assignedRoom = true;
                }
                break;
            }
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
        if (assignedRoom) {
            _class = test_data.shift();
            continue;
        }
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
            finalUnassignedClasses.push(_class[0]);
            logger.warn("Couldn't find a classroom for " + _class[0].name);
        }
        else {
            logger.info("Assigned: " + _class[0].name + " to PKI room #" + r.roomNumber)
        }
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
    var header = 'Spring 2023,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n"Generated 5/5/2023, 2:12:22 PM",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n,Term,Term Code,Department Code,Subject Code,Catalog Number,Course,Section #,Course Title,Section Type,Title/Topic,Meeting Pattern,Meetings,Instructor,Room,Status,Session,Campus,Inst. Method,Integ. Partner,Schedule Print,Consent,Credit Hrs Min,Credit Hrs,Grade Mode,Attributes,Course Attributes,Room Attributes,Enrollment,Maximum Enrollment,Prior Enrollment,Projected Enrollment,Wait Cap,Rm Cap Request,Cross-listings,Cross-list Maximum,Cross-list Projected,Cross-list Wait Cap,Cross-list Rm Cap Request,Link To,Comments,Notes#1,Notes#2\n';
    var data = "";
    var title_row = ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n";
    var days;
    var daysLetter = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sat/Sun"];
    var currClass;
    var roomCoursesNames;
    var roomCoursesData;
    // loop through each room
    for (var r of roomsList) {
        roomCoursesNames = [];
        roomCoursesData = [];
        days = [r.monClasses, r.tueClasses, r.wedClasses, r.thuClasses, r.friClasses, r.s_sClasses];
        // loop through each of the classes
        for (var i in days) {
            // loop through each class
            currClass = days[i];
            while (currClass !== null && currClass.getClass() !== null) {
                // console.log(currClass);
                if (!roomCoursesNames.includes(currClass.getClass().name)) {
                    roomCoursesNames.push(currClass.getClass().name);
                    roomCoursesData.push(currClass.getClass());
                }
                currClass = currClass.getNext();
            }
        }
        for (var _class of roomCoursesData) {
            data += _class.name + title_row;
            data += ",";
            data += _class.term + ",";
            data += _class.termCode + ",";
            data += _class.deptCode + ",";
            data += _class.subjCode + ",";
            data += _class.catNumber + ",";
            data += _class.course + ",";
            data += _class.sectionNumber + ",";
            data += _class.courseTitle + ",";
            data += _class.sectionType + ",";
            data += _class.topic + ",";
            data += _class.meetingPattern + ",";
            data += _class.meetings + ",";
            data += JSON.stringify(_class.instructor) + ",";
            data += "Peter Kiewit Institute " + _class.room + ",";
            data += _class.status + ",";
            data += _class.session + ",";
            data += _class.campusCode + ",";
            data += _class.instMethod + ",";
            data += _class.integPartner + ",";
            data += _class.schedulePrint + ",";
            data += _class.consent + ",";
            data += _class.creditHRsMin + ",";
            data += _class.creditHrs + ",";
            data += _class.gradeMode + ",";
            data += _class.attributes + ",";
            data += _class.courseAttributes + ",";
            data += _class.roomAttributes + ",";    // TODO: this will need to be edited
            data += _class.enrollment + ",";
            data += _class.maxEnrollments + ",";
            data += _class.priorEnrollment + ",";
            data += _class.projEnrollment + ",";
            data += _class.waitCap + ",";
            data += _class.rmCapRequest + ",";
            data += _class.crossListings + ",";
            data += _class.crossListMax + ",";
            data += _class.crossListProj + ",";
            data += _class.crossListWaitCap + ",";
            data += _class.crossListRmCapReq + ",";
            data += _class.linkTo + ",";
            data += _class.comments + ",";
            data += _class.notes1 + ",";
            data += _class.notes2 + "\n";
        }
    }
    // write to file
    fs.writeFile("./server/uploads/output.csv", header + data, (err) => {
        if (err) {
            logger.erroror(err);
        }
    });
}