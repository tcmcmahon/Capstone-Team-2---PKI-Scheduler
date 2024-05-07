import { roomsList } from "./restrictions.js";
import { formatTimes } from "./formatTime.js";

export let ft = [];
export let finalForCalendar = [];

export function calendarFormat()
{
    var days;
    var currClass;
    var counter = 0;

    // loop through each room
    for (var r of roomsList) {
        days = [r.monClasses, r.tueClasses, r.wedClasses, r.thuClasses, r.friClasses, r.s_sClasses];
        // loop through each of the classes
        for (var i in days) {
            // loop through each class
            currClass = days[i];
            while (currClass !== null && currClass.getClass() !== null) {
                ft.push({startTime: currClass.getClass().meetingDates.start,
                        endTime: currClass.getClass().meetingDates.end, 
                        days: currClass.getClass().meetingDates.days, 
                        title: currClass.getClass().name, 
                        section: currClass.getClass().sectionNumber,
                        room: currClass.getClass().room})
                currClass = currClass.getNext();
                counter++;
            }
        }
    }
    formatTimes(ft);
    let datesSymbol = {"M": "2024-01-01", 
                        "T": "2024-01-02", 
                        "W": "2024-01-03",
                        "R": "2024-01-04",
                        "F": "2024-01-05",
                        "S": "2024-01-06"}
    let y = {};
    for(let i = 0; i < ft.length; i++)
    {
        if (y[ft[i].title] !== undefined && y[ft[i].title].includes(ft[i].section)) {
            console.log("Found a baddy: " + [ft[i].title, ft[i].section]);
            continue 
        }
        console.log("We addin:  " + [ft[i].title, ft[i].section]);
        if (y[ft[i].title] === undefined) {
            y[ft[i].title] = [ft[i].section];
        }
        else {
            y[ft[i].title].push(ft[i].section);
        }
        console.log(ft[i].title);
        console.log(y[ft[i].title]);
        console.log("\n\n");
        for (var d in ft[i].days) {
            finalForCalendar.push({
                startDate: (datesSymbol[ft[i].days[d]] + "T" + ft[i].startTime),
                endDate: (datesSymbol[ft[i].days[d]] + "T" + ft[i].endTime),
                title: ft[i].title,
                room: ft[i].room
            });
        }
    }
}