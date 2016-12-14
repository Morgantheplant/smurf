import React from "react";
import { browserHistory } from "react-router";
import styles from "../styles/mapstyles.js";
import SurfReportContainer from "../containers/SurfReportContainer.jsx";
import ClockContainer from "../containers/ClockContainer.jsx";
import CloseButton from "../components/CloseButton.jsx";
import { startSim, clearSim } from "../mainAnimation";
import TidesContainer from "../containers/TidesContainer.jsx";
import mainAnimationLoop from "../mainAnimationLoop";

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.addMarkers = this.addMarkers.bind(this);
    this.state = {  // todo: remove state here
      locationsAdded: false
    };
  }
  componentDidMount() {
    this.map = this.createMap();
    google.maps.event.addListenerOnce(this.map, "idle", this.props.getLocations);
    
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.locations.length && !this.state.locationsAdded) {
      this.setState({ locationsAdded: true });
      this.addMarkers(nextProps.locations);
    }
    // update map location
    const { surfData } = nextProps;
    if (surfData) {
      google.maps.event.addListenerOnce(this.map, "bounds_changed", () => {
        mainAnimationLoop.setAnimationTimeout(() => {
          startSim(surfData);
          console.log(this.map.getBounds(), "this is the bounds")
        }, 1000);
      });
      this.map.panTo(new google.maps.LatLng(
        surfData.lat,
        surfData.lon
      ));
    } else {
      clearSim();
    }
  }

  addMarkers(surfSpots) {
    google.maps.event.removeListener(this.initListener);
    for (let i = 0, len = surfSpots.length; i < len; i++) {
      const spot = surfSpots[i];
      setTimeout(() => {
        this.addSpotMarker(spot);
      }, i * 200);
    }
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    google.maps.event.clearListeners(this.map, "zoom_changed");
  }

  createMap() {
    const mapOptions = {
      zoom: 6,
      center: this.mapCenter(),
      styles
    };
    return new google.maps.Map(this.mapNode, mapOptions);
  }

  mapCenter() {
    return new google.maps.LatLng(
      this.props.initialCenter.lat,
      this.props.initialCenter.lng
    );
  }

  addSpotMarker(loc) {
    const spot = new google.maps.Marker({
      position: { lat: +loc.lat, lng: +loc.lon },
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 5,
        fillColor: "white",
        fillOpacity: 1,
        strokeWeight: 0
      },
      optimized: false, // stops the marker from flashing
      animation: google.maps.Animation.DROP,
      map: this.map
    });
    spot.details = loc;
    spot.addListener("click", () => {
      this.map.setZoom(6);
      browserHistory.push(loc.spot);
    });
    // this.markers.push(spot);
  }

  createMarker() {
    return new google.maps.Marker({
      position: this.mapCenter(),
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 5,
        fillColor: "white",
        fillOpacity: 1,
        strokeWeight: 0
      },
      animation: google.maps.Animation.DROP,
      map: this.map
    });
  }

  createComponents() {
    return (
      <div>
        <SurfReportContainer surfData={this.props.surfData.forecast} />
        <CloseButton onClose={this.props.close} />
        <TidesContainer surfData={this.props.surfData} />
      </div>);
  }

  render() {
    const { surfData } = this.props;
    return (
      <div className="base-container">
        <div
          id="map"
          ref={
            (map) => {
              this.mapNode = map;
            }
          }
        />
        {
          (surfData && surfData.forecast ?
             this.createComponents() : null)
        }
        <ClockContainer />
      </div>);
  }

}

MapComponent.propTypes = {
  surfData: React.PropTypes.object,
  close: React.PropTypes.func,
  getLocations: React.PropTypes.func,
  initialCenter: React.PropTypes.object
};

export default MapComponent;
