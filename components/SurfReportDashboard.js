import React from '../node_modules/react'
import classNames from 'classnames'

class SurfReportDashboard extends React.Component {
   constructor (props) {
    super(props)
  }
  render () {
    return (
    <div id="firstReport" classNames="topBoxes surfReport">
      <div className="waveHeight">
        <h2>{this.props.surfHeightRange}</h2><span>ft</span>
      </div>  
      <div className="conditionIcons">
        <ul>
          <li><i></i>{this.props.conditionsText}</li>
          <li><i></i>3 knts SW</li>
          <li><i></i>Rising 12:00pm .7m</li>
          <li><span>Water : 72</span> <span>Air : 80</span></li>
        </ul>
      </div>
      <div className="clear"></div>
      <p>{this.props.forecaseSummaryText}</p>
    </div>
      )
  }
}

SurfReportDashboard.propTypes = {
  // location: React.PropTypes.string,
  // datePretty: React.PropTypes.string,
  surfHeightRange: React.PropTypes.string,
  surfHeightRangeText: React.PropTypes.string,
  // conditionIcon: React.PropTypes.string,
  conditionsText: React.PropTypes.string,
  forecaseSummaryText: React.PropTypes.string
}

export default SurfReportDashboard;