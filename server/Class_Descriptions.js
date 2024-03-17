export class ClassDescription {
    constructor() {
        this.name = null;                       // 0 - course code and title
        this.sectionNumber = null;              // 7 - section number of course
        this.isLab = null;                      // 9 - if lab or not lab
        this.meetingPattern = null;             // 11 - day and time class is in session
        this.room = null;                       // 14 - keep null, will assign later
        this.session = null;                    // 16 - if class is regular session or 6 weeks
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
}

export default ClassDescription;
