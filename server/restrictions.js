import ClassDescription from './Class_Descriptions.js';
import fs from 'fs';
import { parse } from 'csv-parse';


var csvData = [];
var classData = []; // will hold instances of classDescription


function readCSVData() {
    fs.createReadStream('./server/uploads/test.csv')
    .pipe(parse({from_line: 4}))
    .on('data', function (row) {
        csvData.push(row);
    })
    .on('end', function() {
        var cd = new ClassDescription();
        var rowCount = 0;
        var prevClassName;
        for (var i = 0; i < csvData.length; i++) {
            if (csvData[i][0] === '') {
                cd.name = prevClassName;
            }
            else {
                prevClassName = csvData[i][0];
                continue;
            }
            cd.term = csvData[i][1];
            cd.termCode = csvData[i][2];
            cd.deptCode = csvData[i][3];
            cd.subjCode = csvData[i][4];
            cd.catalogNumber = csvData[i][5];
            cd.course = csvData[i][6];
            cd.sectionNumber = csvData[i][7];
            cd.courseTitle = csvData[i][8];
            cd.sectionType = csvData[i][9];
            cd.topic = csvData[i][10];
            cd.meetingPattern = csvData[i][11];
            cd.meeting = csvData[i][12];
            cd.instructor = csvData[i][13];
            cd.room = csvData[i][14];
            cd.status = csvData[i][15];
            cd.session = csvData[i][16];
            cd.campus = csvData[i][17];
            cd.instMethod = csvData[i][18];
            cd.integPattern = csvData[i][19];
            cd.schedulePrint = csvData[i][20];
            cd.consent = csvData[i][21];
            cd.creditHrsMin = csvData[i][22];
            cd.creditHrs = csvData[i][23];
            cd.gradeMode = csvData[i][24];
            cd.attributes = csvData[i][25];
            cd.courseAttributes = csvData[i][26];
            cd.roomAttributes = csvData[i][27];
            cd.enrolled = csvData[i][28];
            cd.maximumEnrollments = csvData[i][29];
            cd.priorEnrollments = csvData[i][30];
            cd.projectedEnrollments = csvData[i][31];
            cd.waitCap = csvData[i][32];
            cd.rmCapRequest = csvData[i][33];
            cd.crossListings = csvData[i][34];
            cd.crossListMaximum = csvData[i][35];
            cd.crossListProjected = csvData[i][36];
            cd.crossListWaitCap = csvData[i][37];
            cd.crossListCapRequest = csvData[i][38];
            cd.linkTo = csvData[i][39];
            cd.comments = csvData[i][40];
            cd.notes1 = csvData[i][41];
            cd.notes2 = csvData[i][42];
            console.log(cd);
            classData.push(cd);
            cd.clearDescription();
            rowCount++;
        } // end of for loop
        console.log('Count: ' + rowCount);
    }) // end of fs read
} // end of readCSVData


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
} // end of testClassDescription


function main() {
    readCSVData();
    // testClassDescription();
} // end of main

main();