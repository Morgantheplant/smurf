import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { getBreaks, toggleMenu, clickMenuItem } from "../actions/menuActions";

class LocationDetailsButton extends Component {
  constructor(props){
    super(props)
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  toggleMenu(){
    const { dispatch } = this.props;
    dispatch(toggleMenu())
  }
  componentDidMount(){
     const { dispatch, code } = this.props;
     dispatch(getBreaks(code));
  }

  render() {
    const rotate = this.props.isOpen ? 180 : -90;
    const tempStyle = {
      transform: `rotate(${rotate}deg)`,
    }
    
    return (
      <div className="location-detail-menu-icon"
        style={tempStyle}
        onClick={this.toggleMenu}
        >
       ^
       </div>);
  }
}

LocationDetailsButton.propTypes = {
  code: PropTypes.string
};

function mapStateToProps(state) {
  return {
    isOpen: state.menuReducer.isOpen
  };
}

export default connect(mapStateToProps)(LocationDetailsButton);
