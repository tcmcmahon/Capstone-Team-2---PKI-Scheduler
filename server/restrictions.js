/* import data */
import ClassDescription from './Class_Descriptions.js';
import fs from 'fs';
import { parse } from 'csv-parse';
// import rooms from './uploads/rooms.json' assert {type: 'json'};


/* global variables */
var classData = []; // will hold instances of classDescription, will end up with the data for all of the classes
var crossListedCoursesToCheck = []; // will temporarily hold classes that are cross listed and skip them if listed


/* split cross listed courses and add them to global array */
function pushCrossListedCourses(crossListings) {
    var courses;
    var sectionNumber;
    // remove either See or Also when listed
    crossListings = (crossListings.includes("See")) ? crossListings.slice(4) : crossListings.slice(5);
    // split if multiple cross listed courses
    courses = crossListings.split(", ");
    // go through each course and split
    for (var i = 0; i < courses.length; i++) {
        if (crossListedCoursesToCheck.includes(courses[i])) {
            continue;
        }
        sectionNumber = (courses[i].slice(-3).includes('00')) ? courses[i].slice(-1) : courses[i].slice(-3);
        crossListedCoursesToCheck.push([courses[i].slice(0,-4),sectionNumber]); // [course name, section number]
    }
}


function checkIfCrossListed(courseName) {
    // TODO: Add functionality here
}


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
            // if (row[18] === 'Distance Education') { } // ASK : are classes that are labeled Distance Education fully remote?
            if (row[0] === '') { // will create a new object for classData
                cd.name = prevClassName;
                cd.sectionNumber = row[7];
                cd.isLab = (row[9] === "Laboratory") ? true : false;
                cd.meetingPattern = row[11];
                cd.session = row[16];
                cd.campus = (row[17] == "UNO-IS") ? "IS&T" : "CoE";
                if (row[34] === '') { // isn't cross listed
                    cd.maximumEnrollments = row[29];
                }
                else { // is cross listed
                    cd.maximumEnrollments = row[35]; // ASK : Is the crossListMaximum consist of the total number of people who can take the course from all cross listed courses
                    pushCrossListedCourses(row[34]);
                }
                classData.push(cd);
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
    // console.log(classData[74]);
    console.log(crossListedCoursesToCheck);
    console.log(crossListedCoursesToCheck.length);
    console.log(classData.length);
}


/* main function, is async because fs.createReadStream() */
async function main() {
    await readCSVData();
    // console.log(classData[0]); 
    // console.log(classData.length);
    main2ElectricBoogaloo();
} // end of main


/* launch main */
main();
// EOF