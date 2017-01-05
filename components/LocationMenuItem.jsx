import React, { Component, PropTypes } from "react";

class LocationMenuItem extends Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    const { clickItem, id } = this.props;
    clickItem(id);
  }
  render() {
    return (
      <li className="menu-item breaks" onClick={this.handleClick}>
        {this.props.name}
      </li>);
  }
}

LocationMenuItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  clickItem: PropTypes.func
};

export default LocationMenuItem;
