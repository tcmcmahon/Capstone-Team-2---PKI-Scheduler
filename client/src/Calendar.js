import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import axios from 'axios';

let response
let result
let schedulerData = [];

response = await axios.get("http://localhost:3001/Data")
result = response.data
schedulerData.push(JSON.stringify(result));
alert(schedulerData);
const currentDate = '2024-01-01';

export default function Calendar(){
  return(
  <Paper>
    <Scheduler data={schedulerData}>
    <ViewState currentDate={currentDate} />
    <WeekView startDayHour={8} endDayHour={20} excludedDays={[0,6]} />
    <Appointments />
    </Scheduler>
  </Paper>
);
}