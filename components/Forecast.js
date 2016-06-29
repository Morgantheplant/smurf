import React from '../node_modules/react'
import classNames from 'classnames'
import Bar from './Bar'
import engine from '../physicsEngine'
import mainAnimationLoop from '../mainAnimationLoop';
import { Engine } from 'matter-js'
var surf = require('../data/surfData.json');
var dataBuilder = require('../dataBuilder.js');


let width = 20;
let height = 20;
let padding = 20;
let fillColor = '#0E4F64';
var ary = dataBuilder(surf)
class Forecast extends React.Component {
  constructor (props) {
    super(props)
    this._createBars.bind(this);
    this._createBarBase.bind(this);
  }
  render () {
    return (<svg
      height={this.props.height}
      width={this.props.width}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position:"absolute",
        top:0
      }}>
      {
         ary.map(this._createBars, this)
      }
       </svg>)
  }

  _createBars(item, index){
    let xCoord = width * index + (padding * (index+1));
    return (<Bar
    key={index}
    surfHeight={item.surfMax}
    height={height}
    width={width}
    xCoord={xCoord}
    parentHeight={this.props.height}
    fill={fillColor} />)
  }
  _createBarBase(){

  }
  componentDidMount(){
    mainAnimationLoop.setAnimationTimeout(function(){

      function matterEngine(){
        Engine.update(engine, 1000 / 60)
      }

      engine.world.gravity.y = -0.1;
      mainAnimationLoop.addAnimation(matterEngine)
      console.log('called', engine)
    },3000)
  }
}

// Forecast.propTypes = {
//   height: React.PropTypes.string,
//   width: React.PropTypes.string,
//   xCoord: React.PropTypes.string,
//   fill: React.PropTypes.string,
//   parentHeight: React.PropTypes.string
// }

export default Forecast
