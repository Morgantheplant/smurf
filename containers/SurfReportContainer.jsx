import React from "react";
import { connect } from "react-redux";
import SurfReportDashboard from "../components/SurfReportDashboard.jsx";


class SurfReportContainer extends React.Component {
  render() {
    const ary = this.props.surfData;
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
      />
    );
  }
}

SurfReportContainer.propTypes = {
  indexHovered: React.PropTypes.string,
  surfData: React.PropTypes.object
};

function mapStateToProps(state) {
  return {
    indexHovered: state.surfReportReducer.indexHovered
  };
}

export default connect(mapStateToProps)(SurfReportContainer);
