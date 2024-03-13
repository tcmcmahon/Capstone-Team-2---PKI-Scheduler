function matchRooms() {
    console.log("I AM ALIVE");
}

var fs = require("fs");
var { parse } = require("csv-parse");

var csvData = [];

fs.createReadStream('./server/uploads/test.csv')
    .pipe(parse({delimiter: ':', quote: '"', escape: ' '}))
    .on('data', function(csvrow) {
        console.log(csvData);
        csvData.push(csvrow);
    })
    .on('end', function() {
        console.log(csvData);
    });

// fs.readFile('server/uploads/test.csv', function (err, data) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log('Ansynchronous read: ' + data.toString());
// });

matchRooms();
