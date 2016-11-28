import React from "react";

const CloseButton = function(props) {
  return (
    <div 
      className="close-button" 
      onClick={this.props.onClose}>X</div>);
}

CloseButton.propTypes = {
  onClose: React.PropTypes.func
};

export default CloseButton;
