import React from "react";

class SurfReportDashboard extends React.Component {
  render() {
    return (
      <div id="firstReport" classNames="topBoxes surfReport">
        <div className="waveHeight">
          <h2 className="hoverHide">{this.props.surfHeightRange}</h2><span>ft</span>
        </div>
        <div className="conditionIcons">
          <ul>
            <li>{this.props.conditionsText}</li>
            <li className="hoverHide">{this.props.surfHeightRangeText}</li>
            <li className="hoverHide">Rising 12:00pm .7m</li>
            <li><span>Water : 72</span> <span>Air : 80</span></li>
          </ul>
        </div>
        <div className="clear" />
        <p className="hoverHide">{
          `${this.props.dayOfWeek} - ${this.props.regionName}: 
          ${this.props.forecaseSummaryText} ${this.props.date}` }</p>

      </div>
      );
  }
}

SurfReportDashboard.propTypes = {
  // location: React.PropTypes.string,
  // datePretty: React.PropTypes.string,
  surfHeightRange: React.PropTypes.string,
  surfHeightRangeText: React.PropTypes.string,
  dayOfWeek: React.PropTypes.string,
  regionName: React.PropTypes.string,
  date: React.PropTypes.string,
  // conditionIcon: React.PropTypes.string,
  conditionsText: React.PropTypes.string,
  forecaseSummaryText: React.PropTypes.string
};

export default SurfReportDashboard;
