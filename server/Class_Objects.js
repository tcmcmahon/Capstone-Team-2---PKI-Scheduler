/* object that grabs course details */
export class CourseDescription {
    // TODO : move functions from restrictrions.js to here to reduce clutter there
    constructor() {
        this.name = null;                       // 0 - course code and title
        this.sectionNumber = null;              // 7 - section number of course
        this.isLab = null;                      // 9 - if lab or not lab
        this.meetingDays = [];                  // 11a - will hold the meeting days
        this.meetingTime = [];                  // 11b - will hold the meeting time
        this.room = null;                       // 14 - keep null, will assign later
        this.session = null;                    // 16 - if class is regular session or 6 weeks - May not be needed
        this.campus = null;                     // 17 - if class is CoE or IS
        this.maximumEnrollments = null;         // 29 - room cap
        this.crossListedWith = [];              // self created - will have all courses class is cross listed with
        // this.term = null;                       // 1  - remove
        // this.termCode = null;                   // 2  - remove
        // this.deptCode = null;                   // 3  - remove
        // this.subjCode = null;                   // 4  - remove
        // this.catalogNumber = null;              // 5  - remove
        // this.course = null;                     // 6  - remove
        // this.courseTitle = null;                // 8  - remove
        // this.topic = null;                      // 10 - remove
        // this.meeting = null;                    // 12 - remove
        // this.instructor = null;                 // 13 - remove
        // this.status = null;                     // 15 - remove
        // this.instMethod = null;                 // 18 - skip if distance education
        // this.integPattern = null;               // 19 - remove
        // this.schedulePrint = null;              // 20 - remove
        // this.consent = null;                    // 21 - remove
        // this.creditHrsMin = null;               // 22 - remove
        // this.creditHrs = null;                  // 23 - remove
        // this.gradeMode = null;                  // 24 - remove
        // this.attributes = null;                 // 25 - remove
        // this.courseAttributes = null;           // 26 - remove
        // this.roomAttributes = null;             // 27 - remove
        // this.enrolled = null;                   // 28 - remove
        // this.priorEnrollments = null;           // 30 - remove
        // this.projectedEnrollments = null;       // 31 - remove
        // this.waitCap = null;                    // 32 - remove
        // this.rmCapRequest = null;               // 33 - remove
        // this.crossListings = null;              // 34 - remove
        // this.crossListMaximum = null;           // 35 - remove / redundant
        // this.crossListProjected = null;         // 36 - remove
        // this.crossListWaitCap = null;           // 37 - remove
        // this.crossListCapRequest = null;        // 38 - remove
        // this.linkTo = null;                     // 39 - remove
        // this.comments = null;                   // 40 - remove
        // this.notes1 = null;                     // 41 - remove
        // this.notes2 = null;                     // 42 - remove
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
    spliceTime(timeString) {
        // TODO : Add functionality here
        var timeDetails = {
            day: null,
            start: [-1, -1],
            end  : [-1, -1]
        }
        var days;
        var dayTimeSplit;
        days = timeString.split("; ");
        for (var day in days) {
            dayTimeSplit = days[day].split(' '); // will split the days (MW or TH) between the time (9:00am-10:15am)
            for (var char in dayTimeSplit[0]) {
                // TODO : Finish this code up
            }
        }
    }
    setSession(sessionString) {
        this.session = sessionString;
    }
    setCampus(campusString) {
        this.campus = (campusString == "UNO-IS") ? "IS&T" : "CoE";
    }
    setClassSize(classSize, crossListedCourses, crossListedSize) {
        if (crossListedCourses === '') { // isn't cross listed
            cd.maximumEnrollments = classSize;
        }
        else { // is cross listed
            cd.maximumEnrollments = crossListedSize; // ASK : Is the crossListMaximum consist of the total number of people who can take the course from all cross listed courses
            // TODO : make sure this function here vvv works
            this.pushCrossListedCourses(crossListedCourses);
        }
    }
    pushCrossListedCourses() {
        // TODO : migrate function from restrictions.js to here
    }
    checkIfCrossListed() {
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


/* 
    object that will hold CourseDescription objects, IN ORDER, of when they are in an 
    array to be able to easily read and determine if there are any time conflicts
*/
export class ClassroomTimeSlot {
    constructor(roomNumber) {
        this.roomNumber = roomNumber;   // room number of classroom
        this.monClasses = [];           // monday classes in order
        this.tueClasses = [];           // tuesday classes in order
        this.wedClasses = [];           // wednesday classes in order
        this.thuClasses = [];           // thursday classes in order
        this.friClasses = [];           // friday classes in order
    }
}

export default {CourseDescription, ClassroomTimeSlot};
