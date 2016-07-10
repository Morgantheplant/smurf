import React from 'react'
import classNames from 'classnames'
import Clock from '../components/Clock'
import { connect } from 'react-redux';

//todo: make sure container is properly set up
// remove settimeout and refactor into rAF render loop

//possibly add these values to store
const colorOn = '#007297';
const colorOff = '#021019';

const numberCodes = {
  0:[1,1,1,0,0,1,1,1],
  1:[0,0,1,0,0,0,1,0],
  2:[1,0,1,1,1,1,0,1],
  3:[1,0,1,1,1,0,1,1],
  4:[0,1,1,1,1,0,1,0],
  5:[1,1,0,1,1,0,1,1],
  6:[1,1,0,1,1,1,1,1],
  7:[1,0,1,0,0,0,1,0],
  8:[1,1,1,1,1,1,1,1],
  9:[1,1,1,1,1,0,1,0],
  clear:[0,0,0,0,0,0,0,0]
};

class ClockContainer extends React.Component {
  constructor (props) {
	  super(props)
    this.formatTime.bind(this);
  }
  render () {
  	return (
  	  <Clock digitValues={this.formatTime(this.props.time)}
        colorOn={colorOn}
        colorOff={colorOff}
      />)
    }

  formatTime(date){
    date = new Date(date);
    let hours,
    isPM,
    minutes,
    seconds,
    hourTen,
    hour,
    minuteTen,
    minute,
    secondTen,
    second,
    timeArray;
    hours = date.getHours();
    
    isPM = hours > 13;

    if(isPM){
  	hours = (hours - 12).toString();
    }

    if(!isPM){
  	hours = hours.toString();
    }

    minutes = date.getMinutes().toString();
    seconds = date.getSeconds().toString();
    // names for each of the digits on the clock
    hourTen = (hours.length<2) ? 'clear' : hours[0];
    hour = (hours.length<2) ? hours[0] : hours[1]
    minuteTen = (minutes.length<2) ? 0 : minutes[0];
    minute = (minutes.length<2) ? minutes[0] : minutes[1];
    secondTen = (seconds.length<2) ? 0 : seconds[0];
    second = (seconds.length<2) ? seconds[0] : seconds[1];
	  return [ numberCodes[hourTen], numberCodes[hour], numberCodes[minuteTen],
          numberCodes[minute], numberCodes[secondTen], numberCodes[second], isPM ];
  }
}

function mapStateToProps(state) {
  return {
	  time: state.clockReducer.time
  }
}

export default connect(mapStateToProps)(ClockContainer);
