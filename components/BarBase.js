import React from '../node_modules/react'
import classNames from 'classnames'
import Bodies from 'matter'
import vertSpring from 'matter'

class BarBase extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (<rect 
        height={this.props.height}
        width={this.props.width}
        fill={this.props.fill}
        x={this.props.xCoord}
        ref="rect"
      />)
  }
  onComponentDidMount(){
    let physicsBody = Bodies.rectangle(this.props.xCoord, this.props.height, 2, 2);
    let vertSpring = Constraint.create({ bodyA: physicsBody, pointB: { x: this.props.xCoord, y: this.props.parentHeight } })
  }
  shouldComponentUpdate(nextProps, nextState){
     console.log(nextProps, nextState)
  }
}

Bar.propTypes = {
  height: React.PropTypes.number,
  width: React.PropTypes.number,
  xCoord: React.PropTypes.number,
  fill: React.PropTypes.string,
  parentHeight: React.PropTypes.number
}

export default BarBase