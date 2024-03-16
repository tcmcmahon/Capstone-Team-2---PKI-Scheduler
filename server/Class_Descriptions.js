export class ClassDescription {
    constructor() {
        this.name = null;                       // 0 - course code and title
        // this.term = null;                       // 1  - remove
        // this.termCode = null;                   // 2  - remove
        // this.deptCode = null;                   // 3  - remove
        // this.subjCode = null;                   // 4  - remove
        // this.catalogNumber = null;              // 5  - remove
        // this.course = null;                     // 6  - remove
        this.sectionNumber = null;              // 7 - section number of course
        // this.courseTitle = null;                // 8  - remove
        this.isLab = null;                      // 9 - if lab or not lab
        // this.topic = null;                      // 10 - remove
        this.meetingPattern = null;             // 11 - day and time class is in session
        // this.meeting = null;                    // 12 - remove
        // this.instructor = null;                 // 13 - remove
        this.room = null;                       // 14 - keep null, will assign later
        // this.status = null;                     // 15 - remove
        this.session = null;                    // 16 - if class is regular session or 6 weeks
        this.campus = null;                     // 17 - if class is CoE or IS
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
        this.maximumEnrollments = null;         // 29 - room cap
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
    displayAllDescriptions() {
        var allFields =[this.name, 
                    this.term, 
                    this.termCode,
                    this.deptCode, 
                    this.subjCode, 
                    this.catalogNumber, 
                    this.course, 
                    this.sectionNumber, 
                    this.courseTitle, 
                    this.sectionType, 
                    this.topic, 
                    this.meetingPattern, 
                    this.meeting, 
                    this.instructor, 
                    this.room, 
                    this.status, 
                    this.session, 
                    this.campus, 
                    this.instMethod, 
                    this.integPattern, 
                    this.schedulePrint, 
                    this.consent, 
                    this.creditHrsMin, 
                    this.creditHrs, 
                    this.gradeMode, 
                    this.attributes, 
                    this.courseAttributes, 
                    this.roomAttributes, 
                    this.enrolled, 
                    this.maximumEnrollments, 
                    this.priorEnrollments, 
                    this.projectedEnrollments, 
                    this.waitCap, 
                    this.rmCapRequest, 
                    this.crossListings, 
                    this.crossListMaximum, 
                    this.crossListProjected, 
                    this.crossListWaitCap, 
                    this.crossListCapRequest, 
                    this.linkTo, 
                    this.comments, 
                    this.notes1, 
                    this.notes2
                    ];
        for (var val in allFields) {
            console.log(val + " : " + allFields[val])
        }
    }
    clearDescription() {
        this.name = null;                       // 0
        this.term = null;                       // 1
        this.termCode = null;
        this.deptCode = null;                   // 2
        this.subjCode = null;                   // 3
        this.catalogNumber = null;              // 4
        this.course = null;                     // 5
        this.sectionNumber = null;              // 6
        this.courseTitle = null;                // 7
        this.sectionType = null;                // 8
        this.topic = null;                      // 9
        this.meetingPattern = null;             // 10
        this.meeting = null;                    // 11
        this.instructor = null;                 // 12
        this.room = null;                       // 13
        this.status = null;                     // 14
        this.session = null;                    // 15 
        this.campus = null;                     // 16
        this.instMethod = null;                 // 17   
        this.integPattern = null;               // 18
        this.schedulePrint = null;              // 19
        this.consent = null;                    // 20
        this.creditHrsMin = null;               // 21
        this.creditHrs = null;                  // 22
        this.gradeMode = null;                  // 23
        this.attributes = null;                 // 24 
        this.courseAttributes = null;           // 25
        this.roomAttributes = null;             // 26
        this.enrolled = null;                   // 27
        this.maximumEnrollments = null;         // 28
        this.priorEnrollments = null;           // 29
        this.projectedEnrollments = null;       // 30
        this.waitCap = null;                    // 31
        this.rmCapRequest = null;               // 32
        this.crossListings = null;              // 33
        this.crossListMaximum = null;           // 34
        this.crossListProjected = null;         // 35
        this.crossListWaitCap = null;           // 36
        this.crossListCapRequest = null;        // 37
        this.linkTo = null;                     // 38
        this.comments = null;                   // 39
        this.notes1 = null;                     // 40
        this.notes2 = null;                     // 41  
    }
}

export default ClassDescription;
