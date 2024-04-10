/**
 * @file Handles storing of all relevant classroom data
 * @author Jacob Finley 
 * @namespace ClassObjects
 */

/** Object that grabs course details
 * @memberof ClassObjects
 */
export class CourseDescription {
    // TODO : move functions from restrictrions.js to here to reduce clutter there
    constructor() {
        this.name = null;                       // 0 - course code and title
        this.sectionNumber = null;              // 7 - section number of course
        this.isLab = null;                      // 9 - if lab or not lab
        this.meetingDates = [];                 // 11 - will hold ClassroomTimeSlot object  
        this.room = null;                       // 14 - keep null, will assign later
        this.session = null;                    // 16 - if class is regular session or 6 weeks - May not be needed
        this.campus = null;                     // 17 - if class is CoE or IS
        this.maximumEnrollments = null;         // 29 - room cap
        this.crossListedWith = [];              // self created - will have all courses class is cross listed with
    }   
    setCourseName(courseString) {
        this.name = courseString;
    }
    setSectionNum(sectionString) {
        this.sectionNumber = sectionString;
    }
    setLab(sectionString) {
        this.lab = (sectionString === "Laboratory") ? true : false;
    }
    spliceTime(timeString) { // e.g. "MW 10:30am-11:45am; F 12:00pm-1:15pm"
        var timeDaySplit;
        var startEndSplit;
        var timeSlot;
        var days = timeString.split("; "); // ["MW 10:30am-11:45am", "F 12:00pm-1:15pm"]
        for (var day in days) {
            timeDaySplit = days[day].split(' '); // ["MW", "10:30am-11:45am"] : ["F", "12:00pm-1:15pm"]
            startEndSplit = timeDaySplit[1].split('-'); // ["10:30am", "11:45am"] : ["12:00pm", "1:15pm"]
            timeSlot = new ClassroomTimeSlot(timeDaySplit[0], startEndSplit[0], startEndSplit[1]);
            this.meetingDates.push(timeSlot);
        }
        return this.meetingDates;
    }
    setSession(sessionString) {
        this.session = sessionString;
    }
    setCampus(campusString) {
        this.campus = (campusString == "UNO-IS") ? "IS&T" : "CoE";
    }
    setClassSize(classSize, crossListedSize) {
        if (this.crossListedWith.length > 0) {
            this.maximumEnrollments = Number(crossListedSize);
            return false;
        }
        else {
            this.maximumEnrollments = Number(classSize);
        }
    }
    checkIfCrossListed(thisCourse, crossListings, allCrossListings) {
        // return variable if the class has been cross listed
        var crossListed = false;
        var courseNumberSplit;
        var thisCourseFormatted = `${thisCourse[0]}-${thisCourse[1]}`;
        if (allCrossListings.includes(thisCourseFormatted)) {
            crossListed = true;
            allCrossListings.splice(allCrossListings.indexOf(thisCourseFormatted), thisCourseFormatted);
        }
        crossListings = (crossListings.includes("See")) ? crossListings.slice(4).split(', ') : crossListings.slice(5).split(', ');
        for (var i in crossListings) {
            courseNumberSplit = crossListings[i].split('-');
            courseNumberSplit[1] = (courseNumberSplit[1].includes('00')) ? courseNumberSplit[1].replace('00', ''): courseNumberSplit[1];
            this.crossListedWith.push(`${courseNumberSplit[0]}-${courseNumberSplit[1]}`);
            allCrossListings.push(`${courseNumberSplit[0]}-${courseNumberSplit[1]}`);
        }
        return crossListed;
    }
}


/** Linked list of classroom time data 
 * @memberof ClassObjects
*/
class ClassroomTimeSlot {
    constructor(days=null, start=null, end=null, next=null) {
        this.days = days
        this.startTime = start;
        this.endTime = end;
        this.nextClass = next;
    }
}


/**  
    Object that will hold CourseDescription objects, IN ORDER, of when they are in an 
    array to be able to easily read and determine if there are any time conflicts
    @memberof ClassObjects
*/
export class ClassroomTimeData {
    constructor(roomNumber) {
        this.roomNumber = roomNumber;   // room number of classroom
        this.colleges = {'CoE': null,
                         'IS&T': null};   // {bool, bool} {IS&T, CoE}
        this.roomSize = -1;
        this.isLab = null;     
        this.monClasses = null;           // monday classes in order
        this.tueClasses = null;           // tuesday classes in order
        this.wedClasses = null;           // wednesday classes in order
        this.thuClasses = null;           // thursday classes in order
        this.friClasses = null;           // friday classes in order
    }
    checkTimeConflicts() {
        var days = [this.monClasses, this.tueClasses, this.wedClasses, this.thuClasses, this.friClasses];
        // TODO : make sure that the classes do not have any time conflicts
    }
}

/**
 * Class for creating Priority Queue for class times
 * @memberof ClassObjects
 */
export class PriorityQueue {
    constructor() {
        this.queue = [];
    }
    enqueue(_class) {
        // make an amount of instances of _class that only have one meetingDate
        // classes with a higher priority will be near the beginning and ones of smallest priority will be towards the end
        var _classList = [];
        for (var i in _class.meetingDates) {
            _classList.push(structuredClone(_class));
            _classList[i].meetingDates = _class.meetingDates[i];
        }
        // classes may have multiple different meeting times, this will loop through each
        //      although very rare still needs to be accounted for
        for (var _classInstance of _classList) {
            var numDays = _classInstance.meetingDates.days.length
            // loops through each class in the queue
            if (this.queue.lenth === 0) {
                this.queue.push(_classInstance);
            }
            else if (numDays === 1) {
                this.queue.push(_classInstance);
            }
            else {
                var i = 0;
                var assigned = false;
                // loop through each class in queue
                while (!assigned && i < this.queue.length) {
                    if (numDays < this.queue[i].meetingDates.days.length) { continue }
                    else {
                        this.queue.splice(i, 0, _classInstance);
                        assigned = true;
                    }
                    i++;
                }
                if (!assigned) {
                    this.queue.push(_classInstance);
                }
            }
        }
    }
    dequeue() {
        return this.queue.shift();
    }
    displayContents() {
        for (var i in this.queue) {
            console.log(i)
            console.log(this.queue[i]);
            console.log("\n");
        }
    }
}

export default {CourseDescription, ClassroomTimeData, PriorityQueue};