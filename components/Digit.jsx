import React from "react";
import classNames from "classnames";

class Digit extends React.Component {
  constructor(props) {
    super(props);
    this.getBackgroundColor.bind(this);
  }
  getBackgroundColor(border, isOn) {
    const style = {};
    const color = (isOn) ? this.props.colorOn : this.props.colorOff;
    style[border] = color;
    return style;
  }
  render() {
    return (
      <div
        className={classNames("digit", this.props.digitType)}
      >
        <div
          className="top"
          style={
            this.getBackgroundColor("borderTopColor", this.props.digitStates[0])
          }
        />
        <div
          className="left-top"
          style={
            this.getBackgroundColor("borderLeftColor", this.props.digitStates[1])
          }
        />
        <div
          className="right-top"
          style={
            this.getBackgroundColor("borderRightColor", this.props.digitStates[2])
          }
        />
        <div
          className="middle1"
          style={
            this.getBackgroundColor("borderBottomColor", this.props.digitStates[3])
          }
        />
        <div
          className="middle2"
          style={
            this.getBackgroundColor("borderTopColor", this.props.digitStates[4])
          }
        />
        <div
          className="left-bottom"
          style={
            this.getBackgroundColor("borderLeftColor", this.props.digitStates[5])
          }
        />
        <div
          className="right-bottom"
          style={
            this.getBackgroundColor("borderRightColor", this.props.digitStates[6])
          }
        />
        <div
          className="bottom"
          style={
            this.getBackgroundColor("borderBottomColor", this.props.digitStates[7])
          }
        />
      </div>);
  }

}

Digit.propTypes = {
  digitStates: React.PropTypes.array,
  colorOn: React.PropTypes.string,
  colorOff: React.PropTypes.string,
  digitType: React.PropTypes.string
};

export default Digit;
