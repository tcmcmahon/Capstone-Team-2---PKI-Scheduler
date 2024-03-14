var fs = require("fs");
var { parse } = require("csv-parse");
var ClassDescription = require('./Class_Descriptions');


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
            sleep(5000000);
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


function testClassDescription() { // FIXME: cd is not behaving as expected
    var cd = ClassDescription;
    cd.details.name = "test1";
    cd.details.term = "test2";
    cd.details.deptCode = "test3";
    cd.details.subjCode = "test4";
    cd.details.catalogNumber = "test5";
    cd.details.course = "test6";
    cd.details.sectionNumber = "test7";
    cd.details.courseTitle = "test8";
    cd.details.sectionType = "test9";
    cd.details.topic = "test10";
    cd.details.meetingPattern = "test11";
    cd.details.meetings = "test12";
    cd.details.instructor = "test13";
    cd.details.room = "test14";
    cd.details.status = "test15";
    cd.details.session = "test16";
    cd.details.campus = "test17";
    cd.details.instMethod = "test18";
    cd.details.integPattern = "test19";
    cd.details.schedulePrint = "test20";
    cd.details.consent = "test21";
    cd.details.creditHrsMin = "test22";
    cd.details.creditHrs = "test23";
    cd.details.gradeMode = "test24";
    cd.details.attributes = "test25";
    cd.details.courseAttributes = "test26";
    cd.details.roomAttributes = "test27";
    cd.details.enrolled = "test28";
    cd.details.maximumEnrollments = "test29";
    cd.details.priorEnrollments = "test30";
    cd.details.projectedEnrollments = "test31";
    cd.details.waitCap = "test32";
    cd.details.rmCapRequest = "test33";
    cd.details.crossListings = "test34";
    cd.details.crossListMaximum = "test35";
    cd.details.crossListProjected = "test36";
    cd.details.crossListWaitCap = "test37";
    cd.details.crossListCapRequest = "test38";
    cd.details.linkTo = "test39";
    cd.details.comments = "test40";
    cd.details.notes1 = "test41";
    cd.details.notes2 = "test42";
    console.log(cd.details);
    sleep(5000);  
    cd.clearDescription();
    console.log(cd.details); 
};


function main() {
    // readCSVData();
    testClassDescription();
}

main();