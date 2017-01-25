import React, { Component, PropTypes } from "react";
import moment from 'moment'
import { daysOfWeek } from '../constants/daysOfWeek';

// create array of label items for 24hrs, every 3 hrs
// possibly create this from API response later
const dayLabels = (function(hours, step){
  const ary = [];
  for (var i = 0; i < hours; i++) {
    if(i%step === 0){
      ary.push({
        "hour": `${i}:00`
      })
    }
  }
  return ary;
}(24, 3))

class ForecastMeter extends Component {
  constructor(props){
    super(props)
    this.createElements = this.createElements.bind(this);
  }
  createElements(item, index){
    
    const rotate = (180/7 * index - 90)
    const css = {
      transform: `translate(-50%, -50%) rotate(${rotate}deg)`
    }
    const cssLabel = {
       transform: `translateY(-60px) rotate(${-rotate}deg)`
    }
    if((this.props.forecastDay - 1) % 8  === index){
       cssLabel.color = "red";
    }
    return (
      <div key={index} className="meter-item" style={css}>
        <div className="meter-label" style={cssLabel} >{item.hour}</div>
        <div className="meter-notch">|</div>
      </div>);
  }
  getCurrentDay(day){
    return daysOfWeek[day.isoWeekday()-1]
  }
  render() {
    const days = Math.ceil(this.props.forecastDay/8) - 1;
    const currentDay = moment().add(days, 'day');
    return (
      <div className="forecast-widget" >
        {
          dayLabels.map(this.createElements)
        }
        <div>
          { 
            this.getCurrentDay(currentDay)
          }  
          <br />
          { 
           currentDay.format("M/D")
          }
        </div>
      </div>);
  }
}

ForecastMeter.propTypes = {
};

export default ForecastMeter;
