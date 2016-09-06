import React from 'react';
import classNames from 'classnames';
import SurfReport from '../components/SurfReport';
import SurfReportDashboard from '../components/SurfReportDashboard';
import { connect } from 'react-redux';

import surf from '../data/surfData.json';

class SurfReportContainer extends React.Component {
   constructor (props) {
    super(props)
  }
  render () {
    let ary = this.props.surfData;
    
    return (
       <SurfReportDashboard
          regionName = {ary[this.props.indexHovered].regionAlias}
          location={ary[this.props.indexHovered].dayofWeek}
          datePretty={ary[this.props.indexHovered].date}
          surfHeightRange={ary[this.props.indexHovered].surfMax+"-"+ ary[this.props.indexHovered].surfMin}
          surfHeightRangeText={ary[this.props.indexHovered].surfText}
          conditionIcon={""}
          conditionsText={ary[this.props.indexHovered].generalCondition || "-"}
          forecaseSummaryText={ary[this.props.indexHovered].generalText}
        />

       )
  }      
}

function mapStateToProps(state) {
  return {
    indexHovered: state.surfReportReducer.indexHovered
  }
}

export default connect(mapStateToProps)(SurfReportContainer);
