/**
 * @file Renders the calendar component and displays final classroom assignment
 * @author Fredric Shope, Travis McMahon
 * @namespace Calendar
 */

import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  ViewState,
  GroupingState,
  IntegratedGrouping
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  GroupingPanel,
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
import "./Upload.css"; // Import the Upload.css styles

var cData = [];
let response;
let result;
//let t = [];

//const res = [
//  {
//    startDate: "2024-01-02T14:45",
//    endDate: "2024-01-02T17:15",
//    title: "AREN 8920 - INDIVIDUAL INSTRUCTION IN ARCHITECTURAL ENGINEERING Section 2",
//    room: 252
//  },
//  {
//    startDate: "2024-01-01T114:45",
//    endDate: "2024-01-01T15:15",
//    title: "CNST 225 - INTRODUCTION TO BUILDING INFORMATION MODELING Section 2",
//    room: 256
//  },
//  {
//    startDate: "2024-01-03T14:45",
//    endDate: "2024-01-03T15:15",
//    title: "CNST 225 - INTRODUCTION TO BUILDING INFORMATION MODELING Section 2",
//    room: 256
//  },
//  {
//    startDate: "2024-01-02T09:00",
//    endDate: "2024-01-02T09:50",
//    title: "AREN 9970 - RESEARCH OTHER THAN THESIS Section 8",
//    room: 263
//  },
//  {
//    startDate: "2024-01-04T09:00",
//    endDate: "2024-01-04T09:50",
//    title: "AREN 9970 - RESEARCH OTHER THAN THESIS Section 8",
//    room: 263
//  },
//  {
//    startDate: "2024-01-02T12:00",
//    endDate: "2024-01-02T13:00",
//    title: "BIOI 4980 - SENIOR PROJECT IN BIOINFORMATICS II Section 1",
//    room: 276
//  },
//  {
//    startDate: "2024-01-04T12:00",
//    endDate: "2024-01-04T13:00",
//    title: "BIOI 4980 - SENIOR PROJECT IN BIOINFORMATICS II Section 1",
//    room: 276
//  },
//  {
//    startDate: "2024-01-01T11:00",
//    endDate: "2024-01-01T12:00",
//    title: "BMI 8000 - ADVANCES IN BIOMEDICAL INFORMATICS Section 1",
//    room: 278
//  },
//  {
//    startDate: "2024-01-03T11:00",
//    endDate: "2024-01-03T12:00",
//    title: "BMI 8000 - ADVANCES IN BIOMEDICAL INFORMATICS Section 1",
//    room: 278
//  },
//  {
//    startDate: "2024-01-02T9",
//    endDate: "2024-01-02T11:30",
//    title: "ECEN 194 - SPECIAL TOPICS IN ELECTRICAL AND COMPUTER ENGINEERING I Section 2",
//    room: 279
//  },
//  {
//    startDate: "2024-01-04T09:00",
//    endDate: "2024-01-04T11:30",
//    title: "ECEN 194 - SPECIAL TOPICS IN ELECTRICAL AND COMPUTER ENGINEERING I Section 2",
//    room: 279
//  }
//];

response = await axios.get("http://localhost:3001/Data");

result = response.data;
cData = (JSON.stringify(result));
cData = JSON.parse(cData, function (key, value) {
  if (key == "room") {
    return +value; //parse to int
  } else {
    return value;
  }
});

const currentDate = '2024-01-01';
//Add all the classrooms
const rooms = [
  {text: 'Room 252', id: 252},
  {text: 'Room 256', id: 256},
  {text: 'Room 263', id: 263},
  {text: 'Room 276', id: 276},
  {text: 'Room 278', id: 278},
  {text: 'Room 279', id: 279}
]

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: cData,
      resources: [{
        fieldName: 'room',
        title: 'Classroom',
        instances: rooms
      }],
      grouping: [{
        resourceName: 'room'
      }]
    };
  }
/**
 * Function for rendering the calendar page
 * @returns {html} Html page for calendar component/GUI
 * @memberof Calendar
 */
render() {
  const {data, resources, grouping} = this.state;

  return(
    <div className="upload-container"> {/* Apply the same class name */}
    <header className="upload-header"> {/* Apply the same class name */}
      <img src={img} alt="Logo" className="upload-logo" /> {/* Use the new logo */}
      <h1 className="upload-title">Class schedule for the week</h1> {/* Use the same title */}
    </header>
    
  <Paper>
    <Scheduler data={data}>
    <ViewState defaultCurrentDate={currentDate} />
    <GroupingState grouping = {grouping} />
    <WeekView startDayHour={8} endDayHour={20} excludedDays={[0,6]} />
    <DayView startDayHour={8} endDayHour={20} excludedDays={[0,6]} />
    <Appointments />
    <Resources data={resources} mainResourceName="room" />
    <IntegratedGrouping />
    <AppointmentTooltip/>
    <GroupingPanel />
    <Toolbar/>
    <DateNavigator/>
    <ViewSwitcher/>
    </Scheduler>
  </Paper>
  </div>
  );
}
}
