import React, { Component, PropTypes } from "react";
import moment from "moment";
import { daysOfWeek } from "../constants/daysOfWeek";

// const days = ["MON", "TUES", "WEDS", "THURS", "FRI", "SAT","SUN"]; 

class DateLabels extends Component {
  createLabels(item, index){
    //December 18, 2016 20:13:58
    const date = moment(new Date(item.date));
    const dateLabel = date.format("M/D");
    const dayLabel = daysOfWeek[date.isoWeekday()-1]
    return (
      <div className="date-label-items" key={index} >
        <span className="day-of-week">{dayLabel}</span>
        <br/>
        { dateLabel }
      </div>
      )
  }
  render() {
    const { surfData } = this.props;
    return (
      <div className="date-labels">
       { surfData && surfData.forecast.map(this.createLabels)}
      </div>);
  }
}

DateLabels.propTypes = {
  surfData: PropTypes.object
};

export default DateLabels;
