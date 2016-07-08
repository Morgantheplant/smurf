import React from 'react'
import classNames from 'classnames'
import SurfReport from '../components/SurfReport'
import { connect } from 'react-redux';
//todo: clean this up. single source of truth
var surf = require('../data/surfData.json');
var dataBuilder = require('../dataBuilder.js');

var ary = dataBuilder(surf)
console.log(ary)

class SurfReportContainer extends React.Component {
   constructor (props) {
    super(props)
  }
  render () {
    return (
        <SurfReport
          location={ary[this.props.indexHovered].dayofWeek}
          datePretty={ary[this.props.indexHovered].date}
          surfHeightRange={ary[this.props.indexHovered].surfMax+"-"+ ary[this.props.indexHovered].surfMin}
          surfHeightRangeText={ary[this.props.indexHovered].surfText}
          conditionIcon={""}
          conditionsText={ary[this.props.indexHovered].generalCondition || "-"}
          forecaseSummaryText={ary[this.props.indexHovered].generalText}
        />)
  }      
}

function mapStateToProps(state) {
  return {
    indexHovered: state.surfReportReducer.indexHovered
  }
}

export default connect(mapStateToProps)(SurfReportContainer);