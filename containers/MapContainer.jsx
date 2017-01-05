import React, { Component, PropTypes } from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import mainAnimationLoop from "../mainAnimationLoop";
import MapComponent from "../components/MapComponent.jsx";
import { getLocations, getLocationData, getReport, clearReport, changeForecastDay } from "../actions/mapActions";
import { clockTick, hoverDay } from "../actions/clockActions";

const initialCenter = { lat: 37.309, lng: -122.400 };


class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.getLocations = this.getLocations.bind(this);
    this.updateSpot = this.updateSpot.bind(this);
    this.close = this.close.bind(this);
    this.changeForecastDay = this.changeForecastDay.bind(this);
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

  changeForecastDay(day){
    const { dispatch } = this.props;
    if(day%8===0){
      dispatch(hoverDay(day/8))
    }

    dispatch(changeForecastDay(day));
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
        isMenuOpen={this.props.isMenuOpen}
        locationCode={this.props.locationCode}
        changeForecastDay={this.changeForecastDay}
        forecastDay={this.props.forecastDay}
      />
    );
  }
}

MapContainer.propTypes = {
  locations: PropTypes.array,
  currentReport: PropTypes.object,
  dispatch: PropTypes.func,
  params: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    locations: state.mapReducer.locations,
    currentReport: state.mapReducer.currentReport,
    isMenuOpen: state.menuReducer.isOpen,
    locationCode: state.menuReducer.locationCode,
    forecastDay: state.mapReducer.forecastDay
  };
}

export default connect(mapStateToProps)(MapContainer);
