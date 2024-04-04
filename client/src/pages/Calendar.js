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
  Toolbar
} from '@devexpress/dx-react-scheduler-material-ui';
import img from '../resources/O-UNO_Type_Color_White.png';
import axios from 'axios';

let cData = [];
let d = [];
let response;
let result;
let c = [{startDate: "2024-01-01T12", endDate: "2024-01-01T13", title: "hello"}];

response = await axios.get("http://localhost:3001/Data");
result = response.data;
cData = (JSON.stringify(result));
cData = JSON.parse(cData);
const currentDate = '2024-01-01';

export default function Calendar(){
  return(
    <div>
      <h1 style={{backgroundImage: `url(${img})`, backgroundSize: "cover", height: "110px", backgroundColor: "black"}}></h1>
      <h2 style={{textAlign: "center", margin: "auto", backgroundColor: "black", color: "white", width: "23%"}}>Class schedule for the week</h2>
  <Paper>
    <Scheduler data={cData}>
    <ViewState currentDate={currentDate} />
    <WeekView startDayHour={8} endDayHour={20} excludedDays={[0,6]} />
    <DayView startDayHour={8} endDayHour={20} excludedDays={[0,6]} />
    <Appointments />
    <AppointmentTooltip/>
    <Toolbar/>
    <ViewSwitcher/>
    </Scheduler>
  </Paper>
  </div>
);
}