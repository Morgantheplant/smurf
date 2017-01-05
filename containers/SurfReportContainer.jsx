import React from "react";
import { connect } from "react-redux";
import SurfReportDashboard from "../components/SurfReportDashboard.jsx";


class SurfReportContainer extends React.Component {
  formatTemp(min, max) {

    return min !== max ? `${min}-${max}`: (min || max) 
  }
  render() {
    const { surfData, isMenuOpen } = this.props;
    const ary = surfData.forecast;

    const { Weather, WaterTemp } = surfData;
    const { temp_min, temp_max } = Weather
    return (
      <SurfReportDashboard
        date={ary[this.props.indexHovered].date}
        dayOfWeek={ary[this.props.indexHovered].dayOfWeek}
        regionName={ary[this.props.indexHovered].regionAlias}
        location={ary[this.props.indexHovered].dayofWeek}
        datePretty={ary[this.props.indexHovered].date}
        surfHeightRange={`${ary[this.props.indexHovered].surfMax}-${ary[this.props.indexHovered].surfMin}`}
        surfHeightRangeText={ary[this.props.indexHovered].surfText}
        conditionIcon={""}
        conditionsText={ary[this.props.indexHovered].generalCondition || "-"}
        forecaseSummaryText={ary[this.props.indexHovered].generalText}
        waterTemp={ this.formatTemp(WaterTemp.watertemp_min, WaterTemp.watertemp_max)  }
        airTemp={ this.formatTemp(temp_min[this.props.indexHovered], temp_max[this.props.indexHovered]) }
        code={ surfData.id }
        isMenuOpen={ isMenuOpen }
      />
    );
  }
}

SurfReportContainer.propTypes = {
  indexHovered: React.PropTypes.number,
  surfData: React.PropTypes.object,
  tidesData: React.PropTypes.array
};

function mapStateToProps(state) {
  return {
    indexHovered: state.surfReportReducer.indexHovered,
    isMenuOpen: state.menuReducer.isOpen
  };
}

export default connect(mapStateToProps)(SurfReportContainer);
