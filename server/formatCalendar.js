/**
 * @file Handles formatting the dateTime information for each class so the calendar can display it properly
 * @author Travis McMahon, Jacob Finley 
 * @namespace FormatCalendar
 */

import { roomsList } from "./restrictions.js";
import { formatTimes } from "./formatTime.js";

export let preCalendar = [];
export let finalForCalendar = [];

/** Formats all dateTimes for each class for the calendar
 * @function
 * @returns {void}
 * @memberof FormatCalendar
 */
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
                preCalendar.push({startTime: currClass.getClass().meetingDates.start,
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
    formatTimes(preCalendar);
    let datesSymbol = {"M": "2024-01-01", 
                        "T": "2024-01-02", 
                        "W": "2024-01-03",
                        "R": "2024-01-04",
                        "F": "2024-01-05",
                        "S": "2024-01-06"}
    let y = {};
    for(let i = 0; i < preCalendar.length; i++)
    {
        if (y[preCalendar[i].title] !== undefined && y[preCalendar[i].title].includes(preCalendar[i].section)) {
            continue 
        }
        if (y[preCalendar[i].title] === undefined) {
            y[preCalendar[i].title] = [preCalendar[i].section];
        }
        else {
            y[preCalendar[i].title].push(preCalendar[i].section);
        }
        for (var d in preCalendar[i].days) {
            finalForCalendar.push({
                startDate: (datesSymbol[preCalendar[i].days[d]] + "T" + preCalendar[i].startTime),
                endDate: (datesSymbol[preCalendar[i].days[d]] + "T" + preCalendar[i].endTime),
                title: preCalendar[i].title,
                room: preCalendar[i].room
            });
        }
    }
}