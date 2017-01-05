import React, {Component, PropTypes} from "react";
import classNames from "classnames";

class ForecastButton extends Component {

  render() {
    return (
      <div 
        className="forecast-button" 
        onClick={this.props.handleClick} 
      />
      );
  }

}

ForecastButton.propTypes = {
  handleClick: PropTypes.func.isRequired
};

export default ForecastButton;
