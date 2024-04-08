/**
 * @file Renders the calendar component and displays final classroom assignment
 * @author Frederic Shope, Travis McMahon
 * @namespace Calendar
 */

import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  DayView,
  Appointments,
  AppointmentTooltip,
  ViewSwitcher,
  Toolbar,
  DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';
import img from '../resources/O-UNO_Type_Color_White.png';
import axios from 'axios';

let cData = [];//Array for calendar data received from restrictions.js
let response;//Variable for response from axios GET request to /Data
let result;//Result of resolved response from axios GET request

response = await axios.get("http://localhost:3001/Data");//Store response from GET request

result = response.data;//Resolve data from response
cData = (JSON.stringify(result));//Turn resolved data into a string
cData = JSON.parse(cData);//Turn resovled data into JSON
const currentDate = '2024-01-01';//Current date for calendar

/**
 * Function for rendering the calendar page
 * @returns {html} Html page for calendar component/GUI
 */
export default function Calendar(){
  return(
    <div>
      <h1 style={{backgroundImage: `url(${img})`, backgroundSize: "cover", height: "110px", backgroundColor: "black"}}></h1>
      <h2 style={{textAlign: "center", margin: "auto", backgroundColor: "black", color: "white", width: "23%"}}>Class schedule for the week</h2>
  <Paper>
    <Scheduler data={cData}>
    <ViewState defaultCurrentDate={currentDate} />
    <WeekView startDayHour={8} endDayHour={20} excludedDays={[0,6]} />
    <DayView startDayHour={8} endDayHour={20} excludedDays={[0,6]} />
    <Appointments />
    <AppointmentTooltip/>
    <Toolbar/>
    <DateNavigator/>
    <ViewSwitcher/>
    </Scheduler>
  </Paper>
  </div>
);
}