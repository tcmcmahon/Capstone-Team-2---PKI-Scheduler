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

response = await axios.get("http://localhost:3001/Data");

result = response.data;
cData = (JSON.stringify(result));
cData = JSON.parse(cData, function (key, value) {
  if (key == "room") {
    return +value; //parse room key to int
  } else {
    return value;
  }
});

const currentDate = '2024-01-01';
//List all the classrooms
const rooms = [
  {text: 'Room 108', id: 108},
  {text: 'Room 145', id: 145},
  {text: 'Room 149', id: 149},
  {text: 'Room 150', id: 150},
  {text: 'Room 151', id: 151},
  {text: 'Room 153', id: 153},
  {text: 'Room 155', id: 155},
  {text: 'Room 157', id: 157},
  {text: 'Room 160', id: 160},
  {text: 'Room 161', id: 161},
  {text: 'Room 164', id: 164},
  {text: 'Room 249', id: 249},
  {text: 'Room 250', id: 250},
  {text: 'Room 252', id: 252},
  {text: 'Room 256', id: 256},
  {text: 'Room 259', id: 259},
  {text: 'Room 260', id: 260},
  {text: 'Room 261', id: 261},
  {text: 'Room 263', id: 263},
  {text: 'Room 269', id: 269},
  {text: 'Room 270', id: 270},
  {text: 'Room 274', id: 274},
  {text: 'Room 276', id: 276},
  {text: 'Room 278', id: 278},
  {text: 'Room 279', id: 279},
  {text: 'Room 350', id: 350},
  {text: 'Room 352', id: 352},
  {text: 'Room 361', id: 361},
  {text: 'Room 368', id: 368},
  {text: 'Room 391A', id: 391}
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
