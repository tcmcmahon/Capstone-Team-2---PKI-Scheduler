import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

const currentDate = '2024-03-21';
const schedulerData = [
  { startDate: '2024-03-21T09:45', endDate: '2024-03-21T11:00', title: 'CSCI 4450 Intro to A.I.' },
  { startDate: '2024-03-21T12:00', endDate: '2024-03-21T13:30', title: 'CSCI 4970 Capstone' },
  { startDate: '2024-03-21T15:00', endDate: '2024-03-21T17:40', title: 'CYBR 4360 Foundations of Cyber' }
];

export default () => (
  <Paper>
    <Scheduler
      data={schedulerData}
    >
      <ViewState
        currentDate={currentDate}
      />
      <DayView
        startDayHour={8}
        endDayHour={20}
      />
      <Appointments />
    </Scheduler>
  </Paper>
);
