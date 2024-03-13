var fs = require("fs");
var { parse } = require("csv-parse");
var csvData = [];

function matchRooms() {
    console.log("I AM ALIVE");
    console.log(csvData);
    console.log(csvData.length);
}

function readCSVData(callback) {
    fs.createReadStream('./server/uploads/test.csv')
    .pipe(parse({from_line: 2}))
    .on('data', function (row) {
        // console.log(row);
        csvData.push(row);
    })
    .on('end', function() {
        callback();
    });
}

function main() {
    readCSVData(function() {
        matchRooms();
    });
}

main();