import React from 'react'
import classNames from 'classnames'
import SurfReport from '../components/SurfReport'
import { connect } from 'react-redux';

class SurfReportContainer extends React.Component {
   constructor (props) {
    super(props)
  }
  render () {
    return (
        <SurfReport
          location={"Ocean Beach"}
          datePretty={"Tuesday June 21"}
          surfHeightRange={"4-3"}
          surfHeightRangeText={"waist to headhigh"}
          conditionIcon={""}
          conditionsText={"poor to fair"}
          forecaseSummaryText={"more SSW swell moves in fair to poor conditions in the morning to evening where it will pick up"}
        />)
  }      
}

function mapStateToProps(state) {
  return {
    time: state.time
  }
}

export default connect(mapStateToProps)(SurfReportContainer);