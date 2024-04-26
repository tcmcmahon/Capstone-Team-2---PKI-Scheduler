/* object that grabs course details */
export class CourseDescription {
    // TODO : move functions from restrictrions.js to here to reduce clutter there
    constructor() {
        this.name = null;                       // 0 - course code and title
        this.term = null;                       // 1
        this.termCode = null;                   // 2
        this.deptCode = null;                   // 3
        this.subjCode = null;                   // 4
        this.catNumber = null;                  // 5
        this.course = null;                     // 6
        this.sectionNumber = null;              // 7 - section number of course
        this.courseTitle = null;                // 8
        this.isLab = null;                      // 9 - if lab or not lab
        this.topic = null;                      // 10
        this.meetingDates = {days: null, start: null, end: null}; // 11 - will hold ClassroomTimeSlot object 
        this.meetingPattern = null;             // 11 
        this.meetings = null;                   // 12
        this.instructor = null;                 // 13
        this.room = null;                       // 14 - keep null, will assign later
        this.status = null;                     // 15
        this.session = null;                    // 16 - if class is regular session or 6 weeks - May not be needed
        this.campus = null;                     // 17 - if class is CoE or IS
        this.instMethod = null;                 // 18
        this.integPartner = null;               // 19
        this.schedulePrint = null;              // 20
        this.consent = null;                    // 21
        this.creditHrsMin = null;               // 22
        this.creditHrs = null;                  // 23
        this.gradeMode = null;                  // 24
        this.attributes = null;                 // 25
        this.courseAttributes = null;           // 26
        this.roomAttributes = null;             // 27
        this.enrollment = null;                 // 28
        this.maximumEnrollments = null;         // 29 - room cap
        this.maxEnrollments = null;             // 29
        this.priorEnrollment = null;            // 30
        this.projEnrollment = null;             // 31
        this.waitCap = null;                    // 32
        this.rmCapRequest = null;               // 33
        this.crossListings = null;              // 34
        this.crossListedWith = [];              // self created - will have all courses class is cross listed with
        this.crossListMax = null;               // 35
        this.crossListProj = null;              // 36
        this.crossListWaitCap = null;           // 37
        this.crossListRmCapReq = null;          // 38
        this.linkTo = null;                     // 39
        this.comments = null;                   // 40
        this.notes1 = null;                     // 41
        this.notes2 = null;                     // 42
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
    spliceTime(timeString) { // e.g. "MW 10:30am-11:45am
        var timeDaySplit = timeString.split(' ');
        var startEndSplit = timeDaySplit[1].split('-');
        this.meetingDates.days = timeDaySplit[0];
        this.meetingDates.start = startEndSplit[0];
        this.meetingDates.end = startEndSplit[1];
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
    enqueue(_class, classDay, totalCourseTime) {
        var i = 0;
        if (_class.room === null) {
            while (i < this.queue.length) {
                if (this.queue[i][1] < totalCourseTime) { break }
                else if (this.queue[i][1] === totalCourseTime && this.queue[i][0].meetingDates.days.length < _class.meetingDates.days.length) { break }
                else { i++ }
            }
        }
        this.queue.splice(i, 0, [_class, totalCourseTime]);
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
