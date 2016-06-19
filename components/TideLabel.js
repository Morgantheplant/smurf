import React from '../node_modules/react'
import classNames from 'classnames'


class TideLabel extends React.Component {
   constructor (props) {
    super(props)
  }
  render () {
    let labelStyle = {
          position: "absolute",
          left: this.props.xPos + "px",
          top: this.props.yPos + "px",
          color: this.props.color,
          fontSize: "10px"
        };
    
    return (
      <div className="label" style={labelStyle}>
        <div>{this.props.title}</div>
        <div>{ this.props.text}</div>
      </div>)
  }
 
}

export default TideLabel
