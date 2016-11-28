import React from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import mainAnimationLoop from "../mainAnimationLoop";
import MapComponent from "../components/MapComponent.jsx";
import { getLocations, getLocationData, getReport, clearReport } from "../actions/mapActions";
import { clockTick } from "../actions/clockActions";

const initialCenter = { lat: 37.309, lng: -122.400 };


class MapContainer extends React.Component {

  constructor(props) {
    super(props);
    this.getLocations = this.getLocations.bind(this);
    this.updateSpot = this.updateSpot.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    // fetch data initially in scenario 2 from above
    this.updateSpot();
    const { dispatch } = this.props;
    mainAnimationLoop.start();
    mainAnimationLoop.setAnimationInterval(() => {
      dispatch(clockTick());
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    // respond to parameter change
    const oldSpot = prevProps.params.surfspot;
    const newSpot = this.props.params.surfspot;
    if (newSpot !== oldSpot) {
      this.updateSpot();
    }
  }

  componentWillUnmount() {
    // allows us to ignore an inflight request
    this.ignoreUpdate = true;
  }

  getLocations() {
    const { dispatch } = this.props;
    dispatch(getLocations());
  }

  getLocationData() {
    const { dispatch } = this.props;
    dispatch(getLocationData());
  }

  close() {
    browserHistory.push("/");
  }

  updateSpot() {
    const loc = this.props.params.surfspot;
    const { dispatch } = this.props;
    if (loc) {
      dispatch(getReport({ id: loc }));
    } else {
      dispatch(clearReport());
    }
  }

  render() {
    return (
      <MapComponent
        getLocations={this.getLocations}
        locations={this.props.locations}
        initialCenter={initialCenter}
        surfData={this.props.currentReport}
        close={this.close}
      />
    );
  }
}

MapContainer.propTypes = {
  locations: React.PropTypes.array,
  currentReport: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  params: React.PropTypes.object
};

function mapStateToProps(state) {
  return {
    locations: state.mapReducer.locations,
    currentReport: state.mapReducer.currentReport
  };
}

export default connect(mapStateToProps)(MapContainer);
