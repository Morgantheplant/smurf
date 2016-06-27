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
      y: 0
    }
  }
  render () {
    return (<rect 
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
    World.addBody(engine.world, physicsBody);
    World.addBody(engine.world, vertSpring);
    
    mainAnimationLoop.addAnimation(function(){
      var bodies = Composite.allBodies(engine.world);
      for (var i = 0; i < bodies.length; i++) {
        if(bodies[i].id == id){
          var vertices = bodies[i].vertices[0];
          if(vertices && vertices.y){
            this.setState({y: vertices.y})
          }
        
           
        }
        // var rectSvg = svgBods[i];
        // rectSvg.setAttributeNS(null, 'y', vertices[0].y);
        // lines[i].setAttributeNS(null, 'y2',vertices[0].y + height)
    }

     
    }.bind(this))

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