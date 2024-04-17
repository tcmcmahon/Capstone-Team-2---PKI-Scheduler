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
// import axios from 'axios';

// let cData = [];//Array for calendar data received from restrictions.js
// let response; Variable for response from axios GET request to /Data
// let result;//Result of resolved response from axios GET request

//response = await axios.get("http://localhost:3001/Data");//Store response from GET request
//substituting for the changes we need from the Data GET

const res = [
  {
    "startDate": "2024-01-02T14:45",
    "endDate": "2024-01-02T17:15",
    "title": "AREN 8920 - INDIVIDUAL INSTRUCTION IN ARCHITECTURAL ENGINEERING Section 2",
    "room": 252
  },
  {
    "startDate": "2024-01-01T114:45",
    "endDate": "2024-01-01T15:15",
    "title": "CNST 225 - INTRODUCTION TO BUILDING INFORMATION MODELING Section 2",
    "room": 256
  },
  {
    "startDate": "2024-01-03T114:45",
    "endDate": "2024-01-03T15:15",
    "title": "CNST 225 - INTRODUCTION TO BUILDING INFORMATION MODELING Section 2",
    "room": 256
  },
  {
    "startDate": "2024-01-02T9",
    "endDate": "2024-01-02T9:50",
    "title": "AREN 9970 - RESEARCH OTHER THAN THESIS Section 8",
    "room": 263
  },
  {
    "startDate": "2024-01-04T9",
    "endDate": "2024-01-04T9:50",
    "title": "AREN 9970 - RESEARCH OTHER THAN THESIS Section 8",
    "room": 263
  },
  {
    "startDate": "2024-01-02T12",
    "endDate": "2024-01-02T13",
    "title": "BIOI 4980 - SENIOR PROJECT IN BIOINFORMATICS II Section 1",
    "room": 276
  },
  {
    "startDate": "2024-01-04T12",
    "endDate": "2024-01-04T13",
    "title": "BIOI 4980 - SENIOR PROJECT IN BIOINFORMATICS II Section 1",
    "room": 276
  },
  {
    "startDate": "2024-01-01T11",
    "endDate": "2024-01-01T12",
    "title": "BMI 8000 - ADVANCES IN BIOMEDICAL INFORMATICS Section 1",
    "room": 278
  },
  {
    "startDate": "2024-01-03T11",
    "endDate": "2024-01-03T12",
    "title": "BMI 8000 - ADVANCES IN BIOMEDICAL INFORMATICS Section 1",
    "room": 278
  },
  {
    "startDate": "2024-01-02T9",
    "endDate": "2024-01-02T11:30",
    "title": "ECEN 194 - SPECIAL TOPICS IN ELECTRICAL AND COMPUTER ENGINEERING I Section 2",
    "room": 279
  },
  {
    "startDate": "2024-01-04T9",
    "endDate": "2024-01-04T11:30",
    "title": "ECEN 194 - SPECIAL TOPICS IN ELECTRICAL AND COMPUTER ENGINEERING I Section 2",
    "room": 279
  }
];

// result = response.data;//Resolve data from response

// cData = (JSON.stringify(result));//Turn resolved data into a string
// cData = JSON.parse(cData);//Turn resolved data into JSON
const currentDate = '2024-01-01';//Current date for calendar
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
      data: res,
      resources: [{
        fieldName: 'Rooms',
        title: 'Classroom',
        instances: rooms
      }],
      grouping: [{
        resourceName: 'Rooms'
      }]
    };
  }

/**
 * Function for rendering the calendar page
 * @returns {html} Html page for calendar component/GUI
 * @memberof Calendar
 */
//export default function Calendar(){
  render() {
    const {data, resources, grouping} = this.state;

    return(
      <div>
        <h1 style={{backgroundImage: `url(${img})`, backgroundSize: "cover", height: "110px", backgroundColor: "black"}}></h1>
        <h2 style={{textAlign: "center", margin: "auto", backgroundColor: "black", color: "white", width: "23%"}}>Class schedule for the week</h2>
    <Paper>
      <Scheduler data={res}>
      <ViewState defaultCurrentDate={currentDate} />
      <GroupingState grouping = {grouping} />
      <WeekView startDayHour={8} endDayHour={20} excludedDays={[0,6]} />
      <DayView startDayHour={8} endDayHour={20} excludedDays={[0,6]} />
      <Appointments />
      <Resources data={resources} mainResourceName="Rooms" />
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