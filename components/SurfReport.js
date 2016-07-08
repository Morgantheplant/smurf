import React from '../node_modules/react'
import classNames from 'classnames'

class SurfReport extends React.Component {
   constructor (props) {
    super(props)
  }
  render () {
    return (
 
        <div className="surf_report_container">
          <h2 className="location">{this.props.location}</h2>
          <h1 className="date">{this.props.datePretty}</h1>
          <div className="report_container">
            <div className="prev-arrow">&lt;</div>
            <div className="next-arrow">&gt;</div>
            <div className="report_container">
              <div className="surf_height">
                <p className="surf-range">
                  <span className="numbers">{this.props.surfHeightRange}</span>
                  <span className="ft">ft</span>
                </p>
                <p className="text">{this.props.surfHeightRangeText}</p>
              </div>
              <div className="conditions">
                <img src="/images/frown.svg" alt="conditions icon"/>
                <p className="text">{this.props.conditionsText}</p>
              </div>
            </div>  
          </div>
          <p className="forecast_summary">
            {this.props.forecaseSummaryText}
          </p>
        </div>
      )
  }
}

SurfReport.propTypes = {
  location: React.PropTypes.string,
  datePretty: React.PropTypes.string,
  surfHeightRange: React.PropTypes.string,
  surfHeightRangeText: React.PropTypes.string,
  conditionIcon: React.PropTypes.string,
  conditionsText: React.PropTypes.string,
  forecaseSummaryText: React.PropTypes.string
}

export default SurfReport;