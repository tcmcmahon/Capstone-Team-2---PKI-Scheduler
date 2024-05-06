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
                ft.push({startTime: currClass.getClass().meetingDates.start, endTime: currClass.getClass().meetingDates.end, days: currClass.getClass().meetingDates.days, title: currClass.getClass().name, room: currClass.getClass().room, section: currClass.getClass().sectionNumber})
                currClass = currClass.getNext();
                counter++;
            }
        }
    }
    formatTimes(ft);
    let dates = ["2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04", "2024-01-05"];
    let y = [];
    for(let i = 0; i < ft.length; i++)
    {
        if(ft[i].days === "MW" && !y.includes(ft[i].title))
        {   
            y.push(ft[i].title);
            finalForCalendar.push({startDate: (dates[0] + "T" + ft[i].startTime), endDate: (dates[0] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
            finalForCalendar.push({startDate: (dates[2] + "T" + ft[i].startTime), endDate: (dates[2] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
        }
        else if(ft[i].days === "MWF" && !y.includes(ft[i].title))
        {
            y.push(ft[i].title);
            finalForCalendar.push({startDate: (dates[0] + "T" + ft[i].startTime), endDate: (dates[0] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
            finalForCalendar.push({startDate: (dates[2] + "T" + ft[i].startTime), endDate: (dates[2] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
            finalForCalendar.push({startDate: (dates[4] + "T" + ft[i].startTime), endDate: (dates[4] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
        }
        else if(ft[i].days === "MTWRF" && !y.includes(ft[i].title))
        {
            y.push(ft[i].title);
            finalForCalendar.push({startDate: (dates[0] + "T" + ft[i].startTime), endDate: (dates[0] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
            finalForCalendar.push({startDate: (dates[1] + "T" + ft[i].startTime), endDate: (dates[1] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
            finalForCalendar.push({startDate: (dates[2] + "T" + ft[i].startTime), endDate: (dates[2] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
            finalForCalendar.push({startDate: (dates[3] + "T" + ft[i].startTime), endDate: (dates[3] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
            finalForCalendar.push({startDate: (dates[4] + "T" + ft[i].startTime), endDate: (dates[4] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
        }
        else if(ft[i].days === "TR" && !y.includes(ft[i].title))
        {
            y.push(ft[i].title);
            finalForCalendar.push({startDate: (dates[1] + "T" + ft[i].startTime), endDate: (dates[1] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
            finalForCalendar.push({startDate: (dates[3] + "T" + ft[i].startTime), endDate: (dates[3] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
        }
        else if(ft[i].days === "WF" && !y.includes(ft[i].title))
        {
            y.push(ft[i].title);
            finalForCalendar.push({startDate: (dates[2] + "T" + ft[i].startTime), endDate: (dates[2] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
            finalForCalendar.push({startDate: (dates[4] + "T" + ft[i].startTime), endDate: (dates[4] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
        }
        else if(ft[i].days === "M" && !y.includes(ft[i].title))
        {
            y.push(ft[i].title);
            finalForCalendar.push({startDate: (dates[0] + "T" + ft[i].startTime), endDate: (dates[0] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
        }
        else if(ft[i].days === "T" && !y.includes(ft[i].title))
        {
            y.push(ft[i].title);
            finalForCalendar.push({startDate: (dates[1] + "T" + ft[i].startTime), endDate: (dates[1] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
        }
        else if(ft[i].days === "W" && !y.includes(ft[i].title))
        {
            y.push(ft[i].title);
            finalForCalendar.push({startDate: (dates[2] + "T" + ft[i].startTime), endDate: (dates[2] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
        }
        else if(ft[i].days === "R" && !y.includes(ft[i].title))
        {
            y.push(ft[i].title);
            finalForCalendar.push({startDate: (dates[3] + "T" + ft[i].startTime), endDate: (dates[3] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
        }
        else if(ft[i].days === "F" && !y.includes(ft[i].title))
        {
            y.push(ft[i].title);
            finalForCalendar.push({startDate: (dates[4] + "T" + ft[i].startTime), endDate: (dates[4] + "T" + ft[i].endTime), title: ft[i].title, room: ft[i].room});
        }
    }
}