/* import data */
import ClassDescription from './Class_Descriptions.js';
import fs from 'fs';
import { parse } from 'csv-parse';

/* global variables */
var csvData = [];
var classData = []; // will hold instances of classDescription

/* read data from the csv file */
function readCSVData() {
    return new Promise((resolve, reject) => {
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
                var copy = cd;
                classData.push(copy);
                cd.clearDescription();
                rowCount++;
            } // end of for loop
            console.log('Count: ' + rowCount);
            resolve(classData);
        }) // end of fs read
    }); // end of return
} // end of readCSVData


/* main function */
async function main() {
    await readCSVData();
    console.log(classData); // FIXME: data is null when it should be the same as before
    console.log(classData.length);
} // end of main


/* launch main */
main();
// EOF