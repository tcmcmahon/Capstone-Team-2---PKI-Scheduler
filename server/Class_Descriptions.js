export class ClassDescription {
    constructor() {
        this.name = null;                       // 0
        this.term = null;                       // 1
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
    displayAllDescriptions() {
        var allFields =[this.name, 
                    this.term, 
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
