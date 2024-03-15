import ClassDescription from './Class_Descriptions.js';
import fs from 'fs';
import { parse } from 'csv-parse';


var csvData = [];
var classData = []; // will hold instances of classDescription


// delay for a number of milliseconds
function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime < start + delay);
}


function readCSVData() {
    fs.createReadStream('./server/uploads/test.csv')
    .pipe(parse({from_line: 2}))
    .on('data', function (row) {
        csvData.push(row);
    })
    .on('end', function() {
        var cd = ClassDescription;
        for (var i = 0; i < csvData.length; i++) { 
            sleep(1000);
            tmp = i % 42;
            switch(tmp) { // TODO: fix this so that it will add the individual data to the classDescription object
                case 0:
                    cd.name = csvData[i];
                    break;
                case 1:
                    cd.term = csvData[i];
                    break;
                case 2:
                    cd.deptCode = csvData[i];
                    break;
                case 3:
                    cd.subjCode = csvData[i];
                    break;
                case 4:
                    cd.catalogNumber = csvData[i];
                    break;
                case 5:
                    cd.course = csvData[i];
                    break;
                case 6:
                    cd.sectionNumber = csvData[i];
                    break;
                case 7:
                    cd.courseTitle = csvData[i];
                    break;
                case 8:
                    cd.sectionType = csvData[i];
                    break;
                case 9:
                    cd.topic = csvData[i];
                    break;
                case 10:
                    cd.meetingPattern = csvData[i];
                    break;
                case 11:
                    cd.meetings = csvData[i];
                    break;
                case 12:
                    cd.instructor = csvData[i];
                    break;
                case 13:
                    cd.room = csvData[i];
                    break;
                case 14:
                    cd.status = csvData[i];
                    break;
                case 15:
                    cd.session = csvData[i];
                    break;
                case 16:
                    cd.campus = csvData[i];
                    break;
                case 17:
                    cd.instMethod = csvData[i];
                    break;
                case 18:
                    cd.integPattern = csvData[i];
                    break;
                case 19:
                    cd.schedulePrint = csvData[i];
                    break;
                case 20:
                    cd.consent = csvData[i];
                    break;
                case 21:
                    cd.creditHrsMin = csvData[i];
                    break;
                case 22:
                    cd.creditHrs = csvData[i];
                    break;
                case 23:
                    cd.gradeMode = csvData[i];
                    break;
                case 24:
                    cd.attributes = csvData[i];
                    break;
                case 25:
                    cd.courseAttributes = csvData[i];
                    break;
                case 26:
                    cd.roomAttributes = csvData[i];
                    break;
                case 27:
                    cd.enrolled = csvData[i];
                    break;
                case 28:
                    cd.maximumEnrollments = csvData[i];
                    break;
                case 29:
                    cd.priorEnrollments = csvData[i];
                    break;
                case 30:
                    cd.projectedEnrollments = csvData[i];
                    break;
                case 31:
                    cd.waitCap = csvData[i];
                    break;
                case 32:
                    cd.rmCapRequest = csvData[i];
                    break;
                case 33:
                    cd.crossListings = csvData[i];
                    break;
                case 34:
                    cd.crossListMaximum = csvData[i];
                    break;
                case 35:
                    cd.crossListProjected = csvData[i];
                    break;
                case 36:
                    cd.crossListWaitCap = csvData[i];
                    break;
                case 37:
                    cd.crossListCapRequest = csvData[i];
                    break;
                case 38:
                    cd.linkTo = csvData[i];
                    break;
                case 39:
                    cd.comments = csvData[i];
                    break;
                case 40:
                    cd.notes1 = csvData[i];
                    break
                case 41:
                    cd.notes2 = csvData[i];
                    console.log(cd);
                    classData.push(cd);
                    cd.clear();
                    break;
                default:
                    console.log("error: wasn't able to parse csv data to classDescription");
            };
        };
        console.log(classData);
    });
    console.log(classData);
};


function testClassDescription() { 
    var cd = new ClassDescription();
    cd.name = "test1";
    cd.term = "test2";
    cd.deptCode = "test3";
    cd.subjCode = "test4";
    cd.catalogNumber = "test5";
    cd.course = "test6";
    cd.sectionNumber = "test7";
    cd.courseTitle = "test8";
    cd.sectionType = "test9";
    cd.topic = "test10";
    cd.meetingPattern = "test11";
    cd.meeting = "test12";
    cd.instructor = "test13";
    cd.room = "test14";
    cd.status = "test15";
    cd.session = "test16";
    cd.campus = "test17";
    cd.instMethod = "test18";
    cd.integPattern = "test19";
    cd.schedulePrint = "test20";
    cd.consent = "test21";
    cd.creditHrsMin = "test22";
    cd.creditHrs = "test23";
    cd.gradeMode = "test24";
    cd.attributes = "test25";
    cd.courseAttributes = "test26";
    cd.roomAttributes = "test27";
    cd.enrolled = "test28";
    cd.maximumEnrollments = "test29";
    cd.priorEnrollments = "test30";
    cd.projectedEnrollments = "test31";
    cd.waitCap = "test32";
    cd.rmCapRequest = "test33";
    cd.crossListings = "test34";
    cd.crossListMaximum = "test35";
    cd.crossListProjected = "test36";
    cd.crossListWaitCap = "test37";
    cd.crossListCapRequest = "test38";
    cd.linkTo = "test39";
    cd.comments = "test40";
    cd.notes1 = "test41";
    cd.notes2 = "test42";
    cd.displayAllDescriptions();
    cd.clearDescription();
    cd.displayAllDescriptions();
};


function main() {
    // readCSVData();
    testClassDescription();
}

main();