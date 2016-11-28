import React from "react";
import Digit from "./Digit.jsx";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.getBackgroundColor.bind(this);
  }

  getBackgroundColor(isOn) {
    const color = (isOn) ? this.props.colorOn : this.props.colorOff;
    return {
      backgroundColor: color
    };
  }

  render() {
    return (
      <div className="led_clock_container">
        <div
          className="am-pm"
          style={
            this.getBackgroundColor(this.props.digitValues[6])
          }
        />

        <Digit
          digitType={"hour-ten"}
          colorOn={this.props.colorOn}
          colorOff={this.props.colorOff}
          digitStates={this.props.digitValues[0]}
        />

        <Digit
          digitType={"hour"}
          colorOn={this.props.colorOn}
          colorOff={this.props.colorOff}
          digitStates={this.props.digitValues[1]}
        />

        <div
          className="colon1"
          style={
            this.getBackgroundColor(true)
          }
        />

        <div
          className="colon2"
          style={
            this.getBackgroundColor(true)
          }
        />

        <Digit
          digitType={"minute-ten"}
          colorOn={this.props.colorOn}
          colorOff={this.props.colorOff}
          digitStates={this.props.digitValues[2]}
        />

        <Digit
          digitType={"minute"}
          colorOn={this.props.colorOn}
          colorOff={this.props.colorOff}
          digitStates={this.props.digitValues[3]}
        />

        <div
          className="colon3"
          style={
            this.getBackgroundColor(true)
          }
        />
        <div
          className="colon4"
          style={
            this.getBackgroundColor(true)
          }
        />

        <Digit
          digitType={"second-ten"}
          colorOn={this.props.colorOn}
          colorOff={this.props.colorOff}
          digitStates={this.props.digitValues[4]}
        />

        <Digit
          digitType={"second"}
          colorOn={this.props.colorOn}
          colorOff={this.props.colorOff}
          digitStates={this.props.digitValues[5]}
        />
      </div>
    );
  }

}

Clock.propTypes = {
  digitVaues: React.PropTypes.array,
  colorOn: React.PropTypes.string,
  colorOff: React.PropTypes.string,
};

export default Clock;
