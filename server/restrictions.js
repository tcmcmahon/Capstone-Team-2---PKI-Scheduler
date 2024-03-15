/* import data */
import ClassDescription from './Class_Descriptions.js';
import fs from 'fs';
import { parse } from 'csv-parse';


/* global variables */
var classData = []; // will hold instances of classDescription, will end up with the data for all of the classes


/* read data from the csv file */
function readCSVData() {
    return new Promise((resolve) => {
        var prevClassName; // holds the previous class stated in csv file
        fs.createReadStream('./server/uploads/test.csv')
        .pipe(
            parse({from_line: 4}) // starts reading at line 4 with "AREN 1030 - DESIGN AND SIMULATION STUDIO I"
        ) 
        .on('data', function (row) { // iterates through each row in csv file
            var cd = new ClassDescription(); // creates object to store class data
            if (row[0] === '') { // will create a new object for classData
                // TODO: all of these are not needed, will need to reduce data
                cd.name = prevClassName;
                cd.term = row[1];
                cd.termCode = row[2];
                cd.deptCode = row[3];
                cd.subjCode = row[4];
                cd.catalogNumber = row[5];
                cd.course = row[6];
                cd.sectionNumber = row[7];
                cd.courseTitle = row[8];
                cd.sectionType = row[9];
                cd.topic = row[10];
                cd.meetingPattern = row[11];
                cd.meeting = row[12];
                cd.instructor = row[13];
                cd.room = row[14];
                cd.status = row[15];
                cd.session = row[16];
                cd.campus = row[17];
                cd.instMethod = row[18];
                cd.integPattern = row[19];
                cd.schedulePrint = row[20];
                cd.consent = row[21];
                cd.creditHrsMin = row[22];
                cd.creditHrs = row[23];
                cd.gradeMode = row[24];
                cd.attributes = row[25];
                cd.courseAttributes = row[26];
                cd.roomAttributes = row[27];
                cd.enrolled = row[28];
                cd.maximumEnrollments = row[29];
                cd.priorEnrollments = row[30];
                cd.projectedEnrollments = row[31];
                cd.waitCap = row[32];
                cd.rmCapRequest = row[33];
                cd.crossListings = row[34];
                cd.crossListMaximum = row[35];
                cd.crossListProjected = row[36];
                cd.crossListWaitCap = row[37];
                cd.crossListCapRequest = row[38];
                cd.linkTo = row[39];
                cd.comments = row[40];
                cd.notes1 = row[41];
                cd.notes2 = row[42];
                classData.push(cd);
                // no need to delete cd since javascript already performs garbage collection
            }
            else { // will save the previous class name for the next row
                prevClassName = row[0];
            } // end of if statement
        })
        .on('end', function() {
            resolve(classData); // saves the data for classData
        }) // end of fs read
    }); // end of return
} // end of readCSVData


/* verify that the data is saved */
function main2ElectricBoogaloo() {
    console.log(classData[308]);
}


/* main function, is async because fs.createReadStream() */
async function main() {
    await readCSVData();
    console.log(classData[0]); 
    console.log(classData.length);
    main2ElectricBoogaloo();
} // end of main


/* launch main */
main();
// EOF