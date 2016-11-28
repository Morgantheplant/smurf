import React from "react";

class TideLabel extends React.Component {
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
  xPos: React.PropTypes.number,
  yPos: React.PropTypes.number,
  color: React.PropTypes.string,
  title: React.PropTypes.string,
  text: React.PropTypes.string
};

export default TideLabel;
