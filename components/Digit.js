import React from '../node_modules/react'
import classNames from 'classnames'

class Digit extends React.Component {
   constructor (props) {
    super(props)
  }
  render () {
    return (
        <div className={classNames("digit", this.props.digitType)}>
          <div className="top" style={ 
            {
              "borderTopColor": ((this.props.digitStates[0]) ? this.props.onColor :
                this.props.offColor)
            } 
          }></div>
          <div className="left-top" style={ 
            {
              "borderLeftColor": ((this.props.digitStates[1]) ? this.props.onColor :
                this.props.offColor)
            } 
          }></div>
          <div className="right-top" style={ 
            {
              "borderRightColor": ((this.props.digitStates[2]) ? this.props.onColor :
                this.props.offColor)
            } 
          }></div>
          <div className="middle1" style={ 
            {
              "borderTopColor": ((this.props.digitStates[3]) ? this.props.onColor :
                this.props.offColor)
            } 
          }></div>
          <div className="middle2" style={ 
            {
              "borderBottomColor": ((this.props.digitStates[4]) ? this.props.onColor :
                this.props.offColor)
            } 
          }></div>
          <div className="left-bottom" style={ 
            {
              "borderLeftColor": ((this.props.digitStates[5]) ? this.props.onColor :
                this.props.offColor)
            } 
          }></div>
          <div className="right-bottom" style={ 
            {
              "borderRightColor": ((this.props.digitStates[6]) ? this.props.onColor :
                this.props.offColor)
            } 
          }></div>
          <div className="bottom" style={ 
            {
              "borderBottomColor": ((this.props.digitStates[7]) ? this.props.onColor :
                this.props.offColor)
            } 
          }></div>
        </div>)
  }
 
}

Card.propTypes = {
  digitStates: React.PropTypes.array,
  onColor: React.PropTypes.string,
  offColor: React.PropTypes.string,
  digitType: React.PropTypes.string
}

export default Card