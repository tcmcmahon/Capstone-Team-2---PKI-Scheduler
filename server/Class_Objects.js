/* object that grabs course details */
export class CourseDescription {
    // TODO : move functions from restrictrions.js to here to reduce clutter there
    constructor() {
        this.name = null;                       // 0 - course code and title
        this.sectionNumber = null;              // 7 - section number of course
        this.isLab = null;                      // 9 - if lab or not lab
        this.meetingDates = [];                      // 11 - will hold ClassroomTimeSlot object  
        this.room = null;                       // 14 - keep null, will assign later
        this.session = null;                    // 16 - if class is regular session or 6 weeks - May not be needed
        this.campus = null;                     // 17 - if class is CoE or IS
        this.maximumEnrollments = null;         // 29 - room cap
        this.crossListedWith = [];              // self created - will have all courses class is cross listed with
        // this.term = null;                       // 1  - removed
        // this.termCode = null;                   // 2  - removed
        // this.deptCode = null;                   // 3  - removed
        // this.subjCode = null;                   // 4  - removed
        // this.catalogNumber = null;              // 5  - removed
        // this.course = null;                     // 6  - removed
        // this.courseTitle = null;                // 8  - removed
        // this.topic = null;                      // 10 - removed
        // this.meeting = null;                    // 12 - removed
        // this.instructor = null;                 // 13 - removed
        // this.status = null;                     // 15 - removed
        // this.instMethod = null;                 // 18 - removed skip if distance education
        // this.integPattern = null;               // 19 - removed
        // this.schedulePrint = null;              // 20 - removed
        // this.consent = null;                    // 21 - removed
        // this.creditHrsMin = null;               // 22 - removed
        // this.creditHrs = null;                  // 23 - removed
        // this.gradeMode = null;                  // 24 - removed
        // this.attributes = null;                 // 25 - removed
        // this.courseAttributes = null;           // 26 - removed
        // this.roomAttributes = null;             // 27 - removed
        // this.enrolled = null;                   // 28 - removed
        // this.priorEnrollments = null;           // 30 - removed
        // this.projectedEnrollments = null;       // 31 - removed
        // this.waitCap = null;                    // 32 - removed
        // this.rmCapRequest = null;               // 33 - removed
        // this.crossListings = null;              // 34 - removed
        // this.crossListMaximum = null;           // 35 - removed / redundant
        // this.crossListProjected = null;         // 36 - removed
        // this.crossListWaitCap = null;           // 37 - removed
        // this.crossListCapRequest = null;        // 38 - removed
        // this.linkTo = null;                     // 39 - removed
        // this.comments = null;                   // 40 - removed
        // this.notes1 = null;                     // 41 - removed
        // this.notes2 = null;                     // 42 - removed
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
    setClassSize(classSize, crossListedCourses, crossListedSize) {
        if (crossListedCourses !== '') {
            this.maximumEnrollments = classSize;
            return false;
        }
        else {
            this.maximumEnrollments = crossListedSize;
            this.crossListedWith = crossListedCourses.split(', ');
            
        }
    }
    pushCrossListedCourses() {
        // TODO : migrate function from restrictions.js to here
    }
    checkIfCrossListed(crossListedCourses, allCrossListings) {
        // TODO: Add functionality here
        /* 
            ASK : 
                SCMT 4160 is cross listed with ISQA 4160-001
                ISQA 4160 is cross listed with SCMT 4160 AND ISQA 8166-001
                ISQA 8166 is cross listed with ISQA 4160
        */ 
        return false
    }
}


/* linked list of classroom data */
class ClassroomTimeSlot {
    constructor(days=null, start=null, end=null, next=null) {
        this.days = days
        this.startTime = start;
        this.endTime = end;
        this.nextClass = next
    }
}


/* 
    object that will hold CourseDescription objects, IN ORDER, of when they are in an 
    array to be able to easily read and determine if there are any time conflicts
*/
export class ClassroomTimeData {
    constructor(roomNumber) {
        this.roomNumber = roomNumber;   // room number of classroom
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

export default {CourseDescription, ClassroomTimeData};
