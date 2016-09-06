import React from 'react';

class CloseButton extends React.Component {
  render() {
    return (<div className="close-button" onClick={this.props.click}>
       X</div>)
  }      
}

export default CloseButton;
