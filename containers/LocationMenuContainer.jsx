import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import LocationMenuItem from '../components/LocationMenuItem.jsx';
import { clickMenuItem } from '../actions/menuActions';

class LocationMenuContainer extends Component {
  constructor(props){
    super(props)
    this.clickMenuItem = this.clickMenuItem.bind(this);
    this.createMenuItems = this.createMenuItems.bind(this);
  }
  clickMenuItem(id){
    const { dispatch } = this.props;
    dispatch(clickMenuItem(id))
  }

  createMenuItems(item, index){
    return (
      <LocationMenuItem 
        name={item.name} 
        id={item.id} 
        key={index}
        clickItem={this.clickMenuItem}
      /> 
      );
  }
  render() {
    console.log('breaks', this.props.breaks)
    return (
      <ul className="break-drop-down">
        <li className="heading">TODAY</li>
        {this.props.breaks &&
            this.props.breaks.map(this.createMenuItems)}
       </ul>);
  }
}

LocationMenuContainer.propTypes = {
  breaks: PropTypes.array
};

function mapStateToProps(state) {
  return {
    breaks: state.menuReducer.breaks
  };
}

export default connect(mapStateToProps)(LocationMenuContainer);
