import React, { Component, PropTypes } from "react";

class TideLabel extends Component {
  render() {
    const labelStyle = {
      position: "absolute",
      left: `${this.props.xPos - 15}px`,
      top: `${this.props.yPos - 15}px`,
      color: this.props.color,
      fontSize: "10px"
    };

    return (
      <div className="label" style={labelStyle}>
        <div>{this.props.title}</div>
        <div>{ this.props.text}</div>
      </div>);
  }
}

TideLabel.propTypes = {
  xPos: PropTypes.number,
  yPos: PropTypes.number,
  color: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string
};

export default TideLabel;
