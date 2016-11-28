import React from "react";
import { connect } from "react-redux";
import Clock from "../components/Clock.jsx";

const colorOn = "#007297";
const colorOff = "#021019";

const numberCodes = {
  0: [1, 1, 1, 0, 0, 1, 1, 1],
  1: [0, 0, 1, 0, 0, 0, 1, 0],
  2: [1, 0, 1, 1, 1, 1, 0, 1],
  3: [1, 0, 1, 1, 1, 0, 1, 1],
  4: [0, 1, 1, 1, 1, 0, 1, 0],
  5: [1, 1, 0, 1, 1, 0, 1, 1],
  6: [1, 1, 0, 1, 1, 1, 1, 1],
  7: [1, 0, 1, 0, 0, 0, 1, 0],
  8: [1, 1, 1, 1, 1, 1, 1, 1],
  9: [1, 1, 1, 1, 1, 0, 1, 0],
  clear: [0, 0, 0, 0, 0, 0, 0, 0]
};

class ClockContainer extends React.Component {
  constructor(props) {
    super(props);
    this.formatTime.bind(this);
  }

  formatTime(rawDate) {
    const date = new Date(rawDate);

    let hours = date.getHours();

    const isPM = hours > 13;


    hours = isPM ? (hours - 12).toString() : hours.toString();

    const minutes = date.getMinutes().toString();
    const seconds = date.getSeconds().toString();
    // names for each of the digits on the clock
    const hourTen = (hours.length < 2) ? "clear" : hours[0];
    const hour = (hours.length < 2) ? hours[0] : hours[1];
    const minuteTen = (minutes.length < 2) ? 0 : minutes[0];
    const minute = (minutes.length < 2) ? minutes[0] : minutes[1];
    const secondTen = (seconds.length < 2) ? 0 : seconds[0];
    const second = (seconds.length < 2) ? seconds[0] : seconds[1];
    return [numberCodes[hourTen], numberCodes[hour], numberCodes[minuteTen],
    numberCodes[minute], numberCodes[secondTen], numberCodes[second], isPM];
  }

  render() {
    return (
      <Clock
        digitValues={this.formatTime(this.props.time)}
        colorOn={colorOn}
        colorOff={colorOff}
      />);
  }

}

ClockContainer.propTypes = {
  time: React.PropTypes.string
};


function mapStateToProps(state) {
  return {
    time: state.clockReducer.time
  };
}

export default connect(mapStateToProps)(ClockContainer);
