var fs = require("fs");
var { parse } = require("csv-parse");
var csvData = [];
var classDescription = {
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
    clear() {
        for (val in classDescription) { 
            classDescription[val] = null;
        };
    }
}; // will hold data for classes
var classData = []; // will hold instances of classDescription


function readCSVData() {
    fs.createReadStream('./server/uploads/test.csv')
    .pipe(parse({from_line: 2}))
    .on('data', function (row) {
        csvData.push(row);
    })
    .on('end', function() {
        var classInstance = classDescription;
        for (var i = 0; i < csvData.length; i++) { 
            tmp = i % 42;
            switch(tmp) { // TODO: fix this so that it will add the individual data to the classDescription object
                case 0:
                    classInstance.name = csvData[i][0];
                    break;
                case 1:
                    classInstance.term = csvData[i][0];
                    break;
                case 2:
                    classInstance.deptCode = csvData[i][0];
                    break;
                case 3:
                    classInstance.subjCode = csvData[i][0];
                    break;
                case 4:
                    classInstance.catalogNumber = csvData[i][0];
                    break;
                case 5:
                    classInstance.course = csvData[i][0];
                    break;
                case 6:
                    classInstance.sectionNumber = csvData[i][0];
                    break;
                case 7:
                    classInstance.courseTitle = csvData[i][0];
                    break;
                case 8:
                    classInstance.sectionType = csvData[i][0];
                    break;
                case 9:
                    classInstance.topic = csvData[i][0];
                    break;
                case 10:
                    classInstance.meetingPattern = csvData[i][0];
                    break;
                case 11:
                    classInstance.meetings = csvData[i][0];
                    break;
                case 12:
                    classInstance.instructor = csvData[i][0];
                    break;
                case 13:
                    classInstance.room = csvData[i][0];
                    break;
                case 14:
                    classInstance.status = csvData[i][0];
                    break;
                case 15:
                    classInstance.session = csvData[i][0];
                    break;
                case 16:
                    classInstance.campus = csvData[i][0];
                    break;
                case 17:
                    classInstance.instMethod = csvData[i][0];
                    break;
                case 18:
                    classInstance.integPattern = csvData[i][0];
                    break;
                case 19:
                    classInstance.schedulePrint = csvData[i][0];
                    break;
                case 20:
                    classInstance.consent = csvData[i][0];
                    break;
                case 21:
                    classInstance.creditHrsMin = csvData[i][0];
                    break;
                case 22:
                    classInstance.creditHrs = csvData[i][0];
                    break;
                case 23:
                    classInstance.gradeMode = csvData[i][0];
                    break;
                case 24:
                    classInstance.attributes = csvData[i][0];
                    break;
                case 25:
                    classInstance.courseAttributes = csvData[i][0];
                    break;
                case 26:
                    classInstance.roomAttributes = csvData[i][0];
                    break;
                case 27:
                    classInstance.enrolled = csvData[i][0];
                    break;
                case 28:
                    classInstance.maximumEnrollments = csvData[i][0];
                    break;
                case 29:
                    classInstance.priorEnrollments = csvData[i][0];
                    break;
                case 30:
                    classInstance.projectedEnrollments = csvData[i][0];
                    break;
                case 31:
                    classInstance.waitCap = csvData[i][0];
                    break;
                case 32:
                    classInstance.rmCapRequest = csvData[i][0];
                    break;
                case 33:
                    classInstance.crossListings = csvData[i][0];
                    break;
                case 34:
                    classInstance.crossListMaximum = cavData[i][0];
                    break;
                case 35:
                    classInstance.crossListProjected = csvData[i][0];
                    break;
                case 36:
                    classInstance.crossListWaitCap = csvData[i][0];
                    break;
                case 37:
                    classInstance.crossListCapRequest = csvData[i][0];
                    break;
                case 38:
                    classInstance.linkTo = csvData[i][0];
                    break;
                case 39:
                    classInstance.comments = csvData[i][0];
                    break;
                case 40:
                    classInstance.notes1 = csvData[i][0];
                    break
                case 41:
                    classInstance.notes2 = csvData[i][0];
                    console.log(classInstance);
                    classData.push(classInstance);
                    setTimeout(classInstance.clear(), 1000);
                    break;
                default:
                    console.log("error: wasn't able to parse csv data to classDescription");
            };
        };
        console.log(classData);
    });
};


function testClassDescription() { 
    var test = classDescription;
    test.name = "test1";
    test.term = "test2";
    test.deptCode = "test3";
    test.subjCode = "test4";
    test.catalogNumber = "test5";
    test.course = "test6";
    test.sectionNumber = "test7";
    test.courseTitle = "test8";
    test.sectionType = "test9";
    test.topic = "test10";
    test.meetingPattern = "test11";
    test.meetings = "test12";
    test.instructor = "test13";
    test.room = "test14";
    test.status = "test15";
    test.session = "test16";
    test.campus = "test17";
    test.instMethod = "test18";
    test.integPattern = "test19";
    test.schedulePrint = "test20";
    test.consent = "test21";
    test.creditHrsMin = "test22";
    test.creditHrs = "test23";
    test.gradeMode = "test24";
    test.attributes = "test25";
    test.courseAttributes = "test26";
    test.roomAttributes = "test27";
    test.enrolled = "test28";
    test.maximumEnrollments = "test29";
    test.priorEnrollments = "test30";
    test.projectedEnrollments = "test31";
    test.waitCap = "test32";
    test.rmCapRequest = "test33";
    test.crossListings = "test34";
    test.crossListMaximum = "test35";
    test.crossListProjected = "test36";
    test.crossListWaitCap = "test37";
    test.crossListCapRequest = "test38";
    test.linkTo = "test39";
    test.comments = "test40";
    test.notes1 = "test41";
    test.notes2 = "test42";
    console.log(test);  
    test.clear();
    console.log(test); 
};


function main() {
    readCSVData();
    // testClassDescription();
}

main();