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
        this.isLab = (sectionString === "Laboratory") ? true : false;
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
    setRoom(roomString) {
        var pkiLen = "Peter Kiewit Institute ".length;
        if (roomString !== "") {
            this.room = roomString.substr(pkiLen, 3);
        }
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
        if (this.maximumEnrollments > 18) {
            this.isLab = false;
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
    constructor(_class=null, next=null) {
        this.class = _class;
        this.next = next;
    }
    getNext() { return this.next }
    setNext(next) { this.next = next }
    getClass() { return this.class }
    setClass(_class) {this.class = _class }
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
        this.monClasses = new ClassroomTimeSlot();           // monday classes in order
        this.tueClasses = new ClassroomTimeSlot();           // tuesday classes in order
        this.wedClasses = new ClassroomTimeSlot();           // wednesday classes in order
        this.thuClasses = new ClassroomTimeSlot();           // thursday classes in order
        this.friClasses = new ClassroomTimeSlot();           // friday classes in order
        this.s_sClasses = new ClassroomTimeSlot();           // s classes in order
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
    enqueue(_class, classDay, courseTime) {
        var i = 0;
        _class.meetingDates = _class.meetingDates[classDay];
        while (i < this.queue.length) {
            if (this.queue[i][1] < courseTime) { break }
            else if (this.queue[i][1] === courseTime && this.queue[i][0].meetingDates.days.length < _class.meetingDates.days.length) { break }
            else { i++ }
        }
        this.queue.splice(i, 0, [_class, courseTime]);
    }
    dequeue(i=0) {
        return this.queue.shift();
    }
    displayContents() {
        for (var i in this.queue) {
            console.log(i)
            console.log(this.queue[i][0]);
            console.log("\n");
            sleep(10000);
        }
    }
}

export default {CourseDescription, ClassroomTimeData, PriorityQueue, ClassroomTimeSlot};
