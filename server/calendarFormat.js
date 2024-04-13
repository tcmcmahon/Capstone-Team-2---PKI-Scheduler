/**
 * @file Handles formatting class data to send to the calendar
 * @namespace CalendarFormat
 */

import { final, nonFinal } from "./restrictions.js";

export var finalForCalendar = [];//Array of final sorted data to send to the calendar

/**
 * Function for taking final assignment data and formatting it to work with the calendar. 
 * Output: Array finalForCalendar containing formatted classroom data.
 * @returns {void} Stores final assignment in array finalForCalendar
 * @memberof Restrictions
 */
export function storeAssigninCalendar()//Stores final assignment data into finalForCalendar object to be passed to the calendar page
{
    var dates = ["2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04", "2024-01-05"];//Dates for calendar data
       
        for(let i = 0; i < final.length; i++)//For all assigned classes store in calendar format
        {
            if(final[i].days == 'MW')//if days are Monday/Wednesday
            {
                // insert class into finalForCalendar
                finalForCalendar.push({startDate: (dates[0] + "T" + final[i].startTime), endDate: (dates[0] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
                finalForCalendar.push({startDate: (dates[2] + "T" + final[i].startTime), endDate: (dates[2] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
            }
            else if(final[i].days == 'TR')//if days are Tuesday/Thursday
            {
                // insert class into finalForCalendar
                finalForCalendar.push({startDate: (dates[1] + "T" + final[i].startTime), endDate: (dates[1] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
                finalForCalendar.push({startDate: (dates[3] + "T" + final[i].startTime), endDate: (dates[3] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
            }
            else if(final[i].days == 'WF')//if days are Wednesday/Friday
            {
                // insert class into finalForCalendar
                finalForCalendar.push({startDate: (dates[2] + "T" + final[i].startTime), endDate: (dates[2] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
                finalForCalendar.push({startDate: (dates[4] + "T" + final[i].startTime), endDate: (dates[4] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
            }
            if(final[i].days == 'MWF')//if days are Wednesday/Friday
            {
                // insert class into finalForCalendar
                finalForCalendar.push({startDate: (dates[0] + "T" + final[i].startTime), endDate: (dates[0] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
                finalForCalendar.push({startDate: (dates[2] + "T" + final[i].startTime), endDate: (dates[2] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
                finalForCalendar.push({startDate: (dates[4] + "T" + final[i].startTime), endDate: (dates[4] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
            }
            else if(final[i].days == 'MTWRF')//if days are everyday
            {
                // insert class into finalForCalendar
                finalForCalendar.push({startDate: (dates[0] + "T" + final[i].startTime), endDate: (dates[0] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
                finalForCalendar.push({startDate: (dates[1] + "T" + final[i].startTime), endDate: (dates[1] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
                finalForCalendar.push({startDate: (dates[2] + "T" + final[i].startTime), endDate: (dates[2] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
                finalForCalendar.push({startDate: (dates[3] + "T" + final[i].startTime), endDate: (dates[3] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
                finalForCalendar.push({startDate: (dates[4] + "T" + final[i].startTime), endDate: (dates[4] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
            }
            else if(final[i].days == 'M')//if days are Monday
            {
                // insert class into finalForCalendar
                finalForCalendar.push({startDate: (dates[0] + "T" + final[i].startTime), endDate: (dates[0] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
            }
            else if(final[i].days == 'T')//if days are Tuesday
            {
                // insert class into finalForCalendar
                finalForCalendar.push({startDate: (dates[1] + "T" + final[i].startTime), endDate: (dates[1] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
            }
            else if(final[i].days == 'W')//if days are Wednesday
            {
                // insert class into finalForCalendar
                finalForCalendar.push({startDate: (dates[2] + "T" + final[i].startTime), endDate: (dates[2] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
            }
            else if(final[i].days == 'R')//if days are Thursday
            {
                // insert class into finalForCalendar
                finalForCalendar.push({startDate: (dates[3] + "T" + final[i].startTime), endDate: (dates[3] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
            }
            else if(final[i].days == 'F')//if days are Friday
            {
                // insert class into finalForCalendar
                finalForCalendar.push({startDate: (dates[4] + "T" + final[i].startTime), endDate: (dates[4] + "T" + final[i].endTime), title: final[i].class + " Room " + final[i].room});
            }
    }
}

export function formatNonFinal()//Reformats time and date information to work with the calendar page
{   
    for(let i = 0; i < nonFinal.length; i++)//For all calendar data, reformat startTime from 12hr to 24hr format
    {
        if(nonFinal[i].startTime.startsWith("1:") == true)
        {
            nonFinal[i].startTime = nonFinal[i].startTime.replace("1:", "13:");
        }
        else if(nonFinal[i].startTime.startsWith("2:") == true)
        {
            nonFinal[i].startTime = nonFinal[i].startTime.replace("2:", "14:");
        }
        else if(nonFinal[i].startTime.startsWith("3:") == true)
        {
            nonFinal[i].startTime = nonFinal[i].startTime.replace("3:", "15:");
        }
        else if(nonFinal[i].startTime.startsWith("4:") == true)
        {
            nonFinal[i].startTime = nonFinal[i].startTime.replace("4:", "16:");
        }
        else if(nonFinal[i].startTime.startsWith("5:") == true)
        {
            nonFinal[i].startTime = nonFinal[i].startTime.replace("5:", "17:");
        }
        else if(nonFinal[i].startTime.startsWith("6:") == true)
        {
            nonFinal[i].startTime = nonFinal[i].startTime.replace("6:", "18:");
        }
        else if(nonFinal[i].startTime.startsWith("9:") == true)
        {
            nonFinal[i].startTime = nonFinal[i].startTime.replace("9:", "09:");
        }
        else if(nonFinal[i].startTime == ("9pm"))
        {
            nonFinal[i].startTime = nonFinal[i].startTime.replace("9", "21:00");
        }
        else if(nonFinal[i].startTime == ("9am"))
        {
            nonFinal[i].startTime = nonFinal[i].startTime.replace("9", "09:00");
        }
        else if(nonFinal[i].startTime == ("8pm"))
        {
            nonFinal[i].startTime = nonFinal[i].startTime.replace("8", "20:00");
        }
        else if(nonFinal[i].startTime == ("8am"))
        {
            nonFinal[i].startTime = nonFinal[i].startTime.replace("8", "08:00");
        }
        else if(nonFinal[i].startTime == ("3pm"))
        {
            nonFinal[i].startTime = nonFinal[i].startTime.replace("3", "15:00");
        }
        else if(nonFinal[i].startTime == ("4pm"))
        {
            nonFinal[i].startTime = nonFinal[i].startTime.replace("4", "16:00");
        }
        else if(nonFinal[i].startTime == ("6pm"))
        {
            nonFinal[i].startTime = nonFinal[i].startTime.replace("6", "18:00");
        }
        else if(nonFinal[i].startTime == ("7pm"))
        {
            nonFinal[i].startTime = nonFinal[i].startTime.replace("7", "19:00");
        }
        else if(nonFinal[i].startTime == ("11am"))
        {
            nonFinal[i].startTime = nonFinal[i].startTime.replace("11", "11:00");
        }
        else if(nonFinal[i].startTime == ("10am"))
        {
            nonFinal[i].startTime = nonFinal[i].startTime.replace("10", "10:00");
        }
        else if(nonFinal[i].startTime == ("1pm"))
        {
            nonFinal[i].startTime = nonFinal[i].startTime.replace("1", "13:00");
        }
        else if(nonFinal[i].startTime == ("12pm"))
        {
            nonFinal[i].startTime = nonFinal[i].startTime.replace("12", "12:00");
        }
    }
    for(let i = 0; i < nonFinal.length; i++)//For all calendar data, reformat endTime from 12hr to 24hr format
    {
        if(nonFinal[i].endTime.startsWith("1:") == true)
        {
            nonFinal[i].endTime = nonFinal[i].endTime.replace("1:", "13:");
        }
        else if(nonFinal[i].endTime.startsWith("2:") == true)
        {
            nonFinal[i].endTime = nonFinal[i].endTime.replace("2:", "14:");
        }
        else if(nonFinal[i].endTime.startsWith("3:") == true)
        {
            nonFinal[i].endTime = nonFinal[i].endTime.replace("3:", "15:");
        }
        else if(nonFinal[i].endTime.startsWith("4:") == true)
        {
            nonFinal[i].endTime = nonFinal[i].endTime.replace("4:", "16:");
        }
        else if(nonFinal[i].endTime.startsWith("5:") == true)
        {
            nonFinal[i].endTime = nonFinal[i].endTime.replace("5:", "17:");
        }
        else if(nonFinal[i].endTime.startsWith("6:") == true)
        {
            nonFinal[i].endTime = nonFinal[i].endTime.replace("6:", "18:");
        }
        else if(nonFinal[i].endTime.startsWith("7:") == true)
        {
            nonFinal[i].endTime = nonFinal[i].endTime.replace("7:", "19:");
        }
        else if(nonFinal[i].endTime.startsWith("8:") == true && nonFinal[i].endTime.endsWith("pm") == true)
        {
            nonFinal[i].endTime = nonFinal[i].endTime.replace("8:", "20:");
        }
        else if(nonFinal[i].endTime.startsWith("8:") == true && nonFinal[i].endTime.endsWith("am") == true)
        {
            nonFinal[i].endTime = nonFinal[i].endTime.replace("8:", "08:");
        }
        else if(nonFinal[i].endTime.startsWith("9:") == true && nonFinal[i].endTime.endsWith("pm") == true)
        {
            nonFinal[i].endTime = nonFinal[i].endTime.replace("9:", "21:");
        }
        else if(nonFinal[i].endTime == ("1pm"))
        {
            nonFinal[i].endTime = nonFinal[i].endTime.replace("1", "01:00");
        }
        else if(nonFinal[i].endTime == ("12pm"))
        {
            nonFinal[i].endTime = nonFinal[i].endTime.replace("12", "12:00");
        }
        else if(nonFinal[i].endTime == ("10pm"))
        {
            nonFinal[i].endTime = nonFinal[i].endTime.replace("10", "10:00");
        }
        else if(nonFinal[i].endTime == ("10am"))
        {
            nonFinal[i].endTime = nonFinal[i].endTime.replace("10", "10:00");
        }
        else if(nonFinal[i].endTime == ("5pm"))
        {
            nonFinal[i].endTime = nonFinal[i].endTime.replace("5", "05:00");
        }
        else if(nonFinal[i].endTime == ("11am"))
        {
            nonFinal[i].endTime = nonFinal[i].endTime.replace("11", "11:00");
        }
    }
    for(let i = 0; i < nonFinal.length; i++)//For all calendar data, if startTime or endTime has pm or am in the time, remove it
    {
        if(nonFinal[i].startTime.includes("pm"))
        {
            nonFinal[i].startTime = nonFinal[i].startTime.replaceAll("pm", "");
        }
        if(nonFinal[i].endTime.includes("pm"))
        {
            nonFinal[i].endTime = nonFinal[i].endTime.replaceAll("pm", "");
        }
        if(nonFinal[i].startTime.includes("am"))
        {
            nonFinal[i].startTime = nonFinal[i].startTime.replaceAll("am", "");
        }
        if(nonFinal[i].endTime.includes("am"))
        {
            nonFinal[i].endTime = nonFinal[i].endTime.replaceAll("am", "");
        }
    }
}