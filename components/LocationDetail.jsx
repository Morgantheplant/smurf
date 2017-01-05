import React, { Component, PropTypes } from "react";

class LocationDetail extends Component {
  render() {
    const surflineUrl = 'http://e.cdn-surfline.com/syndication/embed/v1/player.html';
    return (
      <div className="location_detail" style={labelStyle}>
        <iframe 
          width="640" 
          height="360" 
          src={`${surflineUrl}?id=${this.props.id}`} 
          frameborder="0" 
          scrolling="no" 
          allowfullscreen />
        <p>
          TRegional forecast Data will go here...
        </p>
      </div>);
  }
}

LocationDetail.propTypes = {
};

export default LocationDetail;
