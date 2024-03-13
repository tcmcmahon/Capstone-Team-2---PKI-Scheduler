function matchRooms() {
    console.log("I AM ALIVE");
}

var fs = require("fs");
var { parse } = require("csv-parse");

var csvData = [];

fs.createReadStream('./server/uploads/test.csv')
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', function (row) {
        // console.log(row);
        csvData.push(row);
    });

matchRooms();
console.log(csvData);