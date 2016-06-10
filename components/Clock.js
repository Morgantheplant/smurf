import React from '../node_modules/react'
import classNames from 'classnames'

class Clock extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className="container">
        <div className="am-pm"></div>

        <Digit digitType={"hour-ten"}
          colorOn={this.props.colorOn}
          colorOff={this.props.colorOff}
          digitStates={[0,0,0,0,0,0,0,0]}
        />  

        <Digit digitType={"hour"}
          colorOn={this.props.colorOn}
          colorOff={this.props.colorOff}
          digitStates={[0,0,0,0,0,0,0,0]}
        /> 

        <div className="colon1"></div>
        <div className="colon2"></div>

        <Digit digitType={"minute-ten"}
          colorOn={this.props.colorOn}
          colorOff={this.props.colorOff}
          digitStates={[0,0,0,0,0,0,0,0]}
        />

        <Digit digitType={"minute"}
          colorOn={this.props.colorOn}
          colorOff={this.props.colorOff}
          digitStates={[0,0,0,0,0,0,0,0]}
        />    
      
        <div className="colon3"></div>
        <div className="colon4"></div>
      
        <Digit digitType={"second-ten"}
          colorOn={this.props.colorOn}
          colorOff={this.props.colorOff}
          digitStates={[0,0,0,0,0,0,0,0]}
        />

        <Digit digitType={"second"}
          colorOn={this.props.colorOn}
          colorOff={this.props.colorOff}
          digitStates={[0,0,0,0,0,0,0,0]}
        />    
    </div>)
  }
}

export default Card