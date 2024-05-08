/**
 * @file Handles formatting of the times into 24hr format to work with the calendar page
 * @author Travis McMahon 
 * @namespace FormatTimes
 */

/** Formats all times into 24hr format for the calendar
 * @function
 * @returns {void}
 * @memberof FormatTimes
 */
export function formatTimes(v)//Reformats time and date information to work with the calendar page
{   
    for(let i = 0; i < v.length; i++)//For all calendar data, reformat startTime from 12hr to 24hr format
    {
        if(v[i].startTime.startsWith("1:") == true)
        {
            v[i].startTime = v[i].startTime.replace("1:", "13:");
        }
        else if(v[i].startTime.startsWith("2:") == true)
        {
            v[i].startTime = v[i].startTime.replace("2:", "14:");
        }
        else if(v[i].startTime.startsWith("3:") == true)
        {
            v[i].startTime = v[i].startTime.replace("3:", "15:");
        }
        else if(v[i].startTime.startsWith("4:") == true)
        {
            v[i].startTime = v[i].startTime.replace("4:", "16:");
        }
        else if(v[i].startTime.startsWith("5:") == true)
        {
            v[i].startTime = v[i].startTime.replace("5:", "17:");
        }
        else if(v[i].startTime.startsWith("6:") == true)
        {
            v[i].startTime = v[i].startTime.replace("6:", "18:");
        }
        else if(v[i].startTime.startsWith("9:") == true)
        {
            v[i].startTime = v[i].startTime.replace("9:", "09:");
        }
        else if(v[i].startTime == ("9pm"))
        {
            v[i].startTime = v[i].startTime.replace("9", "21:00");
        }
        else if(v[i].startTime == ("9am"))
        {
            v[i].startTime = v[i].startTime.replace("9", "09:00");
        }
        else if(v[i].startTime == ("8pm"))
        {
            v[i].startTime = v[i].startTime.replace("8", "20:00");
        }
        else if(v[i].startTime == ("8am"))
        {
            v[i].startTime = v[i].startTime.replace("8", "08:00");
        }
        else if(v[i].startTime == ("3pm"))
        {
            v[i].startTime = v[i].startTime.replace("3", "15:00");
        }
        else if(v[i].startTime == ("4pm"))
        {
            v[i].startTime = v[i].startTime.replace("4", "16:00");
        }
        else if(v[i].startTime == ("6pm"))
        {
            v[i].startTime = v[i].startTime.replace("6", "18:00");
        }
        else if(v[i].startTime == ("7pm"))
        {
            v[i].startTime = v[i].startTime.replace("7", "19:00");
        }
        else if(v[i].startTime == ("11am"))
        {
            v[i].startTime = v[i].startTime.replace("11", "11:00");
        }
        else if(v[i].startTime == ("10am"))
        {
            v[i].startTime = v[i].startTime.replace("10", "10:00");
        }
        else if(v[i].startTime == ("1pm"))
        {
            v[i].startTime = v[i].startTime.replace("1", "13:00");
        }
        else if(v[i].startTime == ("12pm"))
        {
            v[i].startTime = v[i].startTime.replace("12", "12:00");
        }
    }
    for(let i = 0; i < v.length; i++)//For all calendar data, reformat endTime from 12hr to 24hr format
    {
        if(v[i].endTime.startsWith("1:") == true)
        {
            v[i].endTime = v[i].endTime.replace("1:", "13:");
        }
        else if(v[i].endTime.startsWith("2:") == true)
        {
            v[i].endTime = v[i].endTime.replace("2:", "14:");
        }
        else if(v[i].endTime.startsWith("3:") == true)
        {
            v[i].endTime = v[i].endTime.replace("3:", "15:");
        }
        else if(v[i].endTime.startsWith("4:") == true)
        {
            v[i].endTime = v[i].endTime.replace("4:", "16:");
        }
        else if(v[i].endTime.startsWith("5:") == true)
        {
            v[i].endTime = v[i].endTime.replace("5:", "17:");
        }
        else if(v[i].endTime.startsWith("6:") == true)
        {
            v[i].endTime = v[i].endTime.replace("6:", "18:");
        }
        else if(v[i].endTime.startsWith("7:") == true)
        {
            v[i].endTime = v[i].endTime.replace("7:", "19:");
        }
        else if(v[i].endTime.startsWith("8:") == true && v[i].endTime.endsWith("pm") == true)
        {
            v[i].endTime = v[i].endTime.replace("8:", "20:");
        }
        else if(v[i].endTime.startsWith("8:") == true && v[i].endTime.endsWith("am") == true)
        {
            v[i].endTime = v[i].endTime.replace("8:", "08:");
        }
        else if(v[i].endTime.startsWith("9:") == true && v[i].endTime.endsWith("pm") == true)
        {
            v[i].endTime = v[i].endTime.replace("9:", "21:");
        }
        else if(v[i].endTime.startsWith("9:") == true && v[i].endTime.endsWith("am") == true)
        {
            v[i].endTime = v[i].endTime.replace("9:", "09:");
        }
        else if(v[i].endTime == ("1pm"))
        {
            v[i].endTime = v[i].endTime.replace("1", "13:00");
        }
        else if(v[i].endTime == ("12pm"))
        {
            v[i].endTime = v[i].endTime.replace("12", "12:00");
        }
        else if(v[i].endTime == ("10pm"))
        {
            v[i].endTime = v[i].endTime.replace("10", "10:00");
        }
        else if(v[i].endTime == ("10am"))
        {
            v[i].endTime = v[i].endTime.replace("10", "10:00");
        }
        else if(v[i].endTime == ("5pm"))
        {
            v[i].endTime = v[i].endTime.replace("5", "17:00");
        }
        else if(v[i].endTime == ("11am"))
        {
            v[i].endTime = v[i].endTime.replace("11", "11:00");
        }
    }
    for(let i = 0; i < v.length; i++)//For all calendar data, if startTime or endTime has pm or am in the time, remove it
    {
        if(v[i].startTime.includes("pm"))
        {
            v[i].startTime = v[i].startTime.replaceAll("pm", "");
        }
        if(v[i].endTime.includes("pm"))
        {
            v[i].endTime = v[i].endTime.replaceAll("pm", "");
        }
        if(v[i].startTime.includes("am"))
        {
            v[i].startTime = v[i].startTime.replaceAll("am", "");
        }
        if(v[i].endTime.includes("am"))
        {
            v[i].endTime = v[i].endTime.replaceAll("am", "");
        }
    }
}