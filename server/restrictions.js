/* import data */
import ClassDescription from './Class_Descriptions.js';
import fs from 'fs';
import { parse } from 'csv-parse';
import rooms from './uploads/rooms.json' assert {type: 'json'};


/* global variables */
var classData = []; // will hold instances of classDescription, will end up with the data for all of the classes
var crossListedCoursesToCheck = []; // will temporarily hold classes that are cross listed and skip them if listed


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
                cd.sectionNumber = row[7];
                cd.sectionType = row[9]; // ASK : not all labs that are on the csv are listed in the website
                cd.meetingPattern = row[11];
                cd.room = row[14];
                cd.session = row[16];
                cd.campus = row[17];
                cd.maximumEnrollments = row[29];
                cd.crossListings = row[34];
                cd.crossListMaximum = row[35]; // ASK : Is the crossListMaximum consist of the total number of people who can take the course from all cross listed courses
                classData.push(cd);
                // no need to delete cd since javascript already performs garbage collection
            }
            else { // will save the previous class name for the next row
                prevClassName = row[0];
            } // end of if statement
            var isRoom = false;
            for (var room in rooms) {
                if (String(cd.room).includes(room) || cd.room === null) {
                    isRoom = true;
                    break;
                }
            }
            if (isRoom == false) {
                console.log("Room (" + cd.room + ") not listed");
            }
        })
        .on('end', function() {
            resolve(classData); // saves the data for classData
        }) // end of fs read
    }); // end of return
} // end of readCSVData


/* verify that the data is saved */
function main2ElectricBoogaloo() {
    // console.log(classData[308]);
    for (var room in rooms) {
        console.log("Room: " + room);
        console.log("Type: " + rooms[room].RoomType);
        console.log("Info: " + rooms[room].Info);
        console.log("Conf: " + rooms[room].Conferencing);
        console.log("Conn: " + rooms[room].Connectivity);
        console.log("Seat: " + rooms[room].Seats);
        console.log("Comp: " + rooms[room].Computers + "\n");
    }
}


/* main function, is async because fs.createReadStream() */
async function main() {
    await readCSVData();
    // console.log(classData[0]); 
    // console.log(classData.length);
    // main2ElectricBoogaloo();
} // end of main


/* launch main */
main();
// EOF