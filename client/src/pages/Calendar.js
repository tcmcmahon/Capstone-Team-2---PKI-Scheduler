import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import img from '../resources/O-UNO_Type_Color_White.png';

const currentDate = '2024-01-01';
const schedulerData = [
    { startDate: '2024-01-05T12:00', endDate: '2024-01-05T14:30', title: 'AREN 8800 GRADUATE SEMINAR IN ARCHITECTURAL ENGINEERING AND CONSTRUCTION' },
    { startDate: '2024-01-01T13:30', endDate: '2024-01-01T14:45', title: 'CIST 2500 INTRODUCTION TO APPLIED STATISTICS FOR IS&T' },
    { startDate: '2024-01-03T13:30', endDate: '2024-01-03T14:45', title: 'CIST 2500 INTRODUCTION TO APPLIED STATISTICS FOR IS&T' },
    { startDate: '2024-01-01T12:00', endDate: '2024-01-01T13:15', title: 'CIVE 434 SOIL MECHANICS II' },
    { startDate: '2024-01-03T12:00', endDate: '2024-01-03T13:15', title: 'CIVE 434 SOIL MECHANICS II' },
    { startDate: '2024-01-02T10:30', endDate: '2024-01-02T11:45', title: 'CIVE 459 RELIABILITY OF STRUCTURES' },
    { startDate: '2024-01-04T10:30', endDate: '2024-01-04T11:45', title: 'CIVE 459 RELIABILITY OF STRUCTURES' },
    { startDate: '2024-01-01T10:30', endDate: '2024-01-01T11:45', title: 'CIVE 463 TRAFFIC ENGINEERING' },
    { startDate: '2024-01-03T10:30', endDate: '2024-01-03T11:45', title: 'CIVE 463 TRAFFIC ENGINEERING' },
    { startDate: '2024-01-02T12:00', endDate: '2024-01-02T13:15', title: 'CIVE 472 PAVEMENT DESIGN AND EVALUATION' },
    { startDate: '2024-01-04T12:00', endDate: '2024-01-04T13:15', title: 'CIVE 472 PAVEMENT DESIGN AND EVALUATION' },
    { startDate: '2024-01-02T09:00', endDate: '2024-01-02T10:15', title: 'CIVE 491 SPECIAL TOPICS IN CIVIL ENGINEERING' },
    { startDate: '2024-01-04T09:00', endDate: '2024-01-04T10:15', title: 'CIVE 491 SPECIAL TOPICS IN CIVIL ENGINEERING' },
    { startDate: '2024-01-01T15:00', endDate: '2024-01-01T16:15', title: 'CIVE 829 BIOLOGICAL WASTE TREATMENT' },
    { startDate: '2024-01-03T15:00', endDate: '2024-01-03T16:15', title: 'CIVE 829 BIOLOGICAL WASTE TREATMENT' },
    { startDate: '2024-01-02T13:30', endDate: '2024-01-02T14:45', title: 'CIVE 891 SPECIAL TOPICS IN CIVIL ENGINEERING' },
    { startDate: '2024-01-04T13:30', endDate: '2024-01-04T14:45', title: 'CIVE 891 SPECIAL TOPICS IN CIVIL ENGINEERING' },
    { startDate: '2024-01-05T09:00', endDate: '2024-01-05T10:00', title: 'CIVE 990M CIVIL ENGINEERING SEMINAR IN GEOTECHNICAL AND MATERIALS ENGINEERING' },
    { startDate: '2024-01-04T18:00', endDate: '2024-01-04T20:40', title: 'CNST 411 PROJECT ADMINISTRATION' },
    { startDate: '2024-01-05T11:00', endDate: '2024-01-05T11:50', title: 'ENVE 9900 SEMINAR IN ENVIRONMENTAL ENGINEERING' },
    { startDate: '2024-01-03T18:00', endDate: '2024-01-03T20:40', title: 'ISQA 4200 INFORMATION AND DATA QUALITY MANAGEMENT' },
    { startDate: '2024-01-01T18:00', endDate: '2024-01-01T20:40', title: 'ISQA 8340APPLIED REGRESSION ANALYSIS' }
];

export default function Calendar(){
  return(
    <div>
      <h1 style={{backgroundImage: `url(${img})`, backgroundSize: "cover", height: "110px", backgroundColor: "black"}}></h1>
      <h2 style={{textAlign: "center", margin: "auto", backgroundColor: "black", color: "white", width: "23%"}}>Class schedule for the week</h2>
  <Paper>
    <Scheduler data={schedulerData}>
    <ViewState currentDate={currentDate} />
    <WeekView startDayHour={8} endDayHour={20} excludedDays={[0,6]} />
    <Appointments />
    </Scheduler>
  </Paper>
  </div>
);
}