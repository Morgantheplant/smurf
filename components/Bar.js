import React from 'react'
import classNames from 'classnames'
import { Bodies, Constraint, Composite, World } from 'matter-js'
import engine from '../physicsEngine'
import mainAnimationLoop from '../mainAnimationLoop';
import { Engine } from 'matter-js'
var t = 0;
class Bar extends React.Component {
  constructor (props) {
    super(props)
    this.state ={
      y: 0,
      pBody:{}
    }
  }
  render () {
    return (<rect
        className="" 
        height={this.props.height}
        width={this.props.width}
        fill={this.props.fill}
        x={this.props.xCoord}
        y={this.state.y}
        ref="rect"
      />)
  }
  componentDidMount(){
    let physicsBody = Bodies.rectangle(this.props.xCoord, this.props.parentHeight, 20, 20);
    let id = physicsBody.id
    let vertSpring = Constraint.create({ bodyA: physicsBody, pointB: { x: this.props.xCoord, y: this.props.parentHeight } })
    vertSpring.stiffness = 0.02;
    var spLen = (this.props.surfHeight * 30)
    vertSpring.length = spLen;
    World.add(engine.world, [physicsBody,vertSpring]);
    mainAnimationLoop.addAnimation(function(){
        this.setState({y: physicsBody.position.y})
    }.bind(this))
    this.setState({pBody:physicsBody})

  }
}

Bar.propTypes = {
  height: React.PropTypes.number,
  width: React.PropTypes.number,
  xCoord: React.PropTypes.number,
  fill: React.PropTypes.string,
  parentHeight: React.PropTypes.number
}

export default Bar