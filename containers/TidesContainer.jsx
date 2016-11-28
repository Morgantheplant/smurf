import React from "react";
import { connect } from "react-redux";
import Tides from "../components/Tides.jsx";

class TidesContainer extends React.Component {
  render() {
    return (
      <Tides
        surfData={this.props.surfData}
        targetIndex={this.props.indexHovered}
        height={100}
        width={200}
      />
    );
  }
}

TidesContainer.propTypes = {
  surfData: React.PropTypes.object,
  indexHovered: React.PropTypes.number
};

function mapStateToProps(state) {
  return {
    indexHovered: state.surfReportReducer.indexHovered
  };
}

export default connect(mapStateToProps)(TidesContainer);
