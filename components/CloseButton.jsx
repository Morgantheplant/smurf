import React from "react";

class CloseButton extends React.Component {
  render(){
    return (
      <div 
        className="close-button" 
        onClick={this.props.onClose}>X
      </div>
    );
  }
}

CloseButton.propTypes = {
  onClose: React.PropTypes.func
};

export default CloseButton;
