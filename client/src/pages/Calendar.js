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
import img from '../resources/O-UNO_Type_Color_White.png'; // Import the new logo image
import axios from 'axios';
import "./Upload.css"; // Import the Upload.css styles

let cData = [];
let response;
let result;

response = await axios.get("http://localhost:3001/Data");

result = response.data;
cData = (JSON.stringify(result));
cData = JSON.parse(cData);
const currentDate = '2024-01-01';

/**
 * Function for rendering the calendar page
 * @returns {html} Html page for calendar component/GUI
 * @memberof Calendar
 */
export default function Calendar() {
  return (
    <div className="upload-container"> {/* Apply the same class name */}
      <header className="upload-header"> {/* Apply the same class name */}
        <img src={img} alt="Logo" className="upload-logo" /> {/* Use the new logo */}
        <h1 className="upload-title">Class schedule for the week</h1> {/* Use the same title */}
      </header>
      <div className="upload-content"> {/* Apply the same class name */}
        <Paper>
          <Scheduler data={cData}>
            <ViewState defaultCurrentDate={currentDate} />
            <WeekView startDayHour={8} endDayHour={20} excludedDays={[0, 6]} />
            <DayView startDayHour={8} endDayHour={20} excludedDays={[0, 6]} />
            <Appointments />
            <AppointmentTooltip />
            <Toolbar />
            <DateNavigator />
            <ViewSwitcher />
          </Scheduler>
        </Paper>
      </div>
    </div>
  );
}

