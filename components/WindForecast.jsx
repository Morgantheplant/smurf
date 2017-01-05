import React, { Component, PropTypes } from "react";
import WindItem from './WindItem.jsx';

class WindContainer extends Component {
  createWindItems(item, index){
    return (
      <WindItem 
        key={index} 
        knots={item.knots} 
        direction={item.direction}
        time={item.time}
      />)
  }
  render() {
    const { wind, targetIndex } = this.props;
    return (
      <div className="wind-container">
        <div className="wind-text">Wind data</div>
        {
          wind[targetIndex] && wind[targetIndex].map(this.createWindItems)
        }
      </div>
    );
  }
}  

WindContainer.propTypes = {
  xPos: PropTypes.number,
  yPos: PropTypes.number,
  color: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string
};

export default WindContainer;
