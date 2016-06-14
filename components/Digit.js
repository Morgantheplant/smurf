import React from '../node_modules/react'
import classNames from 'classnames'

class Digit extends React.Component {
   constructor (props) {
    super(props)
    this.getBackgroundColor.bind(this);
  }
  render () {
    return (
        <div className={classNames("digit", this.props.digitType)}>
          <div className="top" style={
            this.getBackgroundColor("borderTopColor", this.props.digitStates[0])
          }></div>
          <div className="left-top" style={
            this.getBackgroundColor("borderLeftColor", this.props.digitStates[1]) 
          }></div>
          <div className="right-top" style={
            this.getBackgroundColor("borderRightColor", this.props.digitStates[2]) 
          }></div>
          <div className="middle1" style={
            this.getBackgroundColor("borderBottomColor", this.props.digitStates[3]) 
          }></div>
          <div className="middle2" style={
            this.getBackgroundColor("borderTopColor", this.props.digitStates[4]) 
          }></div>
          <div className="left-bottom" style={
            this.getBackgroundColor("borderLeftColor", this.props.digitStates[5]) 
          }></div>
          <div className="right-bottom" style={ 
              this.getBackgroundColor("borderRightColor", this.props.digitStates[6]) 
          }></div>
          <div className="bottom" style={
            this.getBackgroundColor("borderBottomColor", this.props.digitStates[7])
          }></div>
        </div>)

  }

  getBackgroundColor(border, isOn){

    let style = {}
    let color = (isOn) ? this.props.colorOn : this.props.colorOff
    style[border] = color
    console.log(this.props.digitType, style)
    return style;
  }
}

Digit.propTypes = {
  digitStates: React.PropTypes.array,
  onColor: React.PropTypes.string,
  offColor: React.PropTypes.string,
  digitType: React.PropTypes.string
}

export default Digit