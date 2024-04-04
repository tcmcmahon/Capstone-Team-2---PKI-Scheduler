/* object that grabs course details */
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
        var timeSlot = {days: null, start: null, end: null};
        var days = timeString.split("; "); // ["MW 10:30am-11:45am", "F 12:00pm-1:15pm"]
        for (var day in days) {
            var tmp_timeSlot = structuredClone(timeSlot);
            timeDaySplit = days[day].split(' '); // ["MW", "10:30am-11:45am"] : ["F", "12:00pm-1:15pm"]
            startEndSplit = timeDaySplit[1].split('-'); // ["10:30am", "11:45am"] : ["12:00pm", "1:15pm"]
            tmp_timeSlot.days = timeDaySplit[0];
            tmp_timeSlot.start = startEndSplit[0];
            tmp_timeSlot.end = startEndSplit[1];
            this.meetingDates.push(tmp_timeSlot);
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
        if (this.crossListedWith) {
            this.maximumEnrollments = Number(classSize);
            return false;
        }
        else {
            this.maximumEnrollments = Number(crossListedSize);
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


/* linked list of classroom data */
export class ClassroomTimeSlot {
    constructor(_class, next=null) {
        this._class = _class;
        this.nextClass = next;
    }
}


/* 
    object that will hold CourseDescription objects, IN ORDER, of when they are in an 
    array to be able to easily read and determine if there are any time conflicts
*/
export class ClassroomTimeData {
    constructor(roomNumber=null) {
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
        this.s_sClasses = null;           // s classes in order
    }
    checkTimeConflicts() {
        var days = [this.monClasses, this.tueClasses, this.wedClasses, this.thuClasses, this.friClasses];
        // TODO : make sure that the classes do not have any time conflicts
    }
}


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
        break;
        }
    }
}


export class PriorityQueue {
    constructor() {
        this.queue = [];
    }
    enqueue(_class) {
        var _classList = [];
        for (var i in _class.meetingDates) {
            _classList.push(structuredClone(_class));
            _classList[i].meetingDates = _class.meetingDates[i];
        }
        for (var _classInstance of _classList) {
            var numDays = _classInstance.meetingDates.days.length;
            if (this.queue.lenth === 0) {
                this.queue.push(_classInstance);
            }
            else if (numDays === 1) {
                this.queue.push(_classInstance);
            }
            else {
                var i = 0;
                var assigned = false;
                while (!assigned && i < this.queue.length) {
                    if (numDays >= this.queue[i].meetingDates.days.length) {
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
            sleep(30000);
        }
    }
}

export default {CourseDescription, ClassroomTimeData, PriorityQueue, ClassroomTimeSlot};
