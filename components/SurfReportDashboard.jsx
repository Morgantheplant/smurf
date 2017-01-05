import React, { Component, PropTypes } from "react";
import LocationDetailsButton from '../containers/LocationDetailsButton.jsx';
import classNames from 'classnames';

class SurfReportDashboard extends Component {
  render() {
    console.log(this.props.isMenuOpen, "is menu open?")
    return (
      <div id="firstReport" className={this.props.isMenuOpen ? "blur" : "" }>
        <div className="waveHeight">
          <h2 >{this.props.surfHeightRange}</h2><span>ft</span>
        </div>
        <div className="conditionIcons">
          <ul className="report">
            <li>{this.props.conditionsText}</li>
            <li >{this.props.windRange}</li>
            <li >{this.props.surfHeightRangeText}</li>
            <li><span className="water">Water : { this.props.waterTemp }</span> <span className="air">Air : { this.props.airTemp }</span></li>
          </ul>

        </div>
        <LocationDetailsButton code={this.props.code}/>
        <div className="clear" />
        <p >{
          `${this.props.dayOfWeek} - ${this.props.regionName}: 
          ${this.props.forecaseSummaryText} ${this.props.date}` }</p>
      </div>
      );
  }
}

SurfReportDashboard.propTypes = {
  // location: React.PropTypes.string,
  // datePretty: React.PropTypes.string,
  surfHeightRange: PropTypes.string,
  surfHeightRangeText: PropTypes.string,
  dayOfWeek: PropTypes.string,
  regionName: PropTypes.string,
  date: PropTypes.string,
  nextTide: PropTypes.string,
  // conditionIcon: PropTypes.string,
  conditionsText: PropTypes.string,
  forecaseSummaryText: PropTypes.string,
  code: PropTypes.string,
  isMenuOpen: PropTypes.bool
};

export default SurfReportDashboard;
