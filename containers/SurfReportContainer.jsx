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
    const target = ary[this.props.indexHovered] || {}
    return (
      <SurfReportDashboard
        date={target.date}
        dayOfWeek={target.dayOfWeek}
        regionName={target.regionAlias}
        location={target.dayofWeek}
        datePretty={target.date}
        surfHeightRange={`${target.surfMax}-${target.surfMin}`}
        surfHeightRangeText={target.surfText}
        conditionIcon={""}
        conditionsText={target.generalCondition || "-"}
        forecaseSummaryText={target.generalText}
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
