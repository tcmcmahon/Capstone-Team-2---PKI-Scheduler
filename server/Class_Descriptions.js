class ClassDescription {
    constructor() {
        this.details = {
            name: null,                     // 0
            term: null,                     // 1
            deptCode: null,                 // 2
            subjCode: null,                 // 3
            catalogNumber: null,            // 4
            course: null,                   // 5
            sectionNumber: null,            // 6
            courseTitle: null,              // 7
            sectionType: null,              // 8
            topic: null,                    // 9
            meetingPattern: null,           // 10
            meetings: null,                 // 11
            instructor: null,               // 12
            room: null,                     // 13
            status: null,                   // 14
            session: null,                  // 15
            campus: null,                   // 16
            instMethod: null,               // 17   
            integPattern: null,             // 18
            schedulePrint: null,            // 19
            consent: null,                  // 20
            creditHrsMin: null,             // 21
            creditHrs: null,                // 22
            gradeMode: null,                // 23
            attributes: null,               // 24 
            courseAttributes: null,         // 25
            roomAttributes: null,           // 26
            enrolled: null,                 // 27
            maximumEnrollments: null,       // 28
            priorEnrollments: null,         // 29
            projectedEnrollments: null,     // 30
            waitCap: null,                  // 31
            rmCapRequest: null,             // 32
            crossListings: null,            // 33
            crossListMaximum: null,         // 34
            crossListProjected: null,       // 35
            crossListWaitCap: null,         // 36
            crossListCapRequest: null,      // 37
            linkTo: null,                   // 38
            comments: null,                 // 39
            notes1: null,                   // 40
            notes2: null,                   // 41  
        };
    }
    clearDescription() {
        for (val in this.details) {
            this.details[val] = null;
        };
    }
}


module.exports = { ClassDescription }
