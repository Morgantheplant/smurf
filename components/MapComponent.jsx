import React from "react";
import { browserHistory } from "react-router";
import styles from "../styles/mapstyles.js";
import SurfReportContainer from "../containers/SurfReportContainer.jsx";
import ClockContainer from "../containers/ClockContainer.jsx";
import CloseButton from "./CloseButton.jsx";
import { startSim, clearSim } from "../surfReportAnimation";
import TidesContainer from "../containers/TidesContainer.jsx";
import mainAnimationLoop from "../mainAnimationLoop";
import ForecastButton from "./ForecastButton.jsx";
import DateLabels from "../containers/DateLabels.jsx";
import OverlayMethods from "./OverlayMethods.js";
import LocationMenuContainer from "../containers/LocationMenuContainer.jsx"
import LocationDetailContainer from "../containers/LocationDetailContainer.jsx";
import ForecastMeter from './ForecastMeter.jsx';
// todo: remove this
let isPlayingForecast = false;
let forecastIndex = 1;
let forecastTimer;

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.addMarkers = this.addMarkers.bind(this);
    this.onForecastButtonClicked = this.onForecastButtonClicked.bind(this);
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
    if (surfData && (!this.props.surfData || surfData.id !== this.props.surfData.id)) {
      // todo add check here and call this if bounds dont change
      this.listener = google.maps.event.addListenerOnce(this.map, "bounds_changed", () => {
        mainAnimationLoop.setAnimationTimeout(() => {
          startSim(surfData);
        }, 1200);
      });
      const currBounds = this.map.getBounds() && this.map.getBounds().toJSON();
      this.map.panTo(new google.maps.LatLng(
        surfData.lat,
        surfData.lon
      ));
      const nextBounds = this.map.getBounds() && this.map.getBounds().toJSON();
      //TODO: !!IMPORTANT!! fix this
      if(JSON.stringify(currBounds) === JSON.stringify(nextBounds)){
        // remove listener and force start of simulation
        if(this.listener){
          google.maps.event.removeListener(this.listener);
          this.listener = null;
        }
        startSim(surfData);
      }

    } else if (!surfData) {
      // explicitly clear bounds changed listener if exists
      if(this.listener){
        google.maps.event.removeListener(this.listener);
        this.listener = null;
      }
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
      streetViewControl: false,
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

  onForecastButtonClicked(){
    if(!isPlayingForecast){
      isPlayingForecast = true;
      // todo: grab this info from server
      const json = {"llcrnrlat": 4.75, "urcrnrlat": 60.5, "llcrnrlon": 189.75, "report_type": "nph", "urcrnrlon": 282.75, "len": 42};
      // create overlay if it doesn't exist
      if(!this.overlay){
        // extend the overlay view with own methods
        this.overlay =  Object.assign(new google.maps.OverlayView(), OverlayMethods);
        // set the bounds of the overlay image
        var bounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(json.llcrnrlat, json.llcrnrlon),
          new google.maps.LatLng(json.urcrnrlat, json.urcrnrlon)
        );
        // init overlay
        this.overlay.initOverlay(bounds);
          //preload all of the images
        for(var i = 0; i < json.len; i++){
          this.overlay.createImage(this.getImageSrc(i))
        }
      }
      // add image overlay to map
      this.overlay.setMap(this.map);
      //start animation timer
      // todo remove this
      forecastTimer = mainAnimationLoop.setAnimationInterval(()=>{
        forecastIndex = forecastIndex >= json.len ? 1 : forecastIndex+1;
        this.props.changeForecastDay(forecastIndex);
        const srcImage = this.getImageSrc(forecastIndex);
        this.overlay.updateImage(srcImage)
      },1000)

    } else {
      isPlayingForecast = false;
      mainAnimationLoop.removeAnimation(forecastTimer);
      this.overlay && this.overlay.setMap(null);

    }
  
  }
  
  getImageSrc(index){
    return `/static/ww3/nph-${index}.png`
  }

  createComponents() {
    return (
      <div>
        <SurfReportContainer surfData={this.props.surfData} />
        <CloseButton onClose={this.props.close} />
        <TidesContainer surfData={this.props.surfData} />
        {this.props.isMenuOpen && <LocationMenuContainer />}
        {this.props.locationCode && <LocationDetailContainer locationId={this.props.locationCode} />}
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
        <ForecastButton handleClick={this.onForecastButtonClicked} />
        <ForecastMeter forecastDay={this.props.forecastDay}/>
        <DateLabels surfData={ surfData } />
      </div>);
  }

}


MapComponent.propTypes = {
  surfData: React.PropTypes.object,
  close: React.PropTypes.func,
  getLocations: React.PropTypes.func,
  initialCenter: React.PropTypes.object,
  forecastDay: React.PropTypes.number
};

export default MapComponent;
