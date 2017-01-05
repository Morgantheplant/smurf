import React, { Component, PropTypes } from "react";


class WindItem extends Component {
  constructor(props){
    super(props)
    this.createCircles = this.createCircles.bind(this);
    this.createCircle = this.createCircle.bind(this);
  }
  getValue(knots, max){
    let value = knots === 0 ? 0 : Math.ceil(knots/5) 
    return (value < max) ? value : max 
  }
  createCircle(child, index, dir){
    const rotate = (dir) ? `rotate(${dir}deg)`: '';
    return (
      <div 
        className={`arc arc-${index}`}s
        style={{
          height: `${ 22 + (index*8)}px`,
          width: `${ 22 + (index*8)}px`,
          transform: `translate(-50%, -50%) ${rotate}`
        }}
      > { child } </div>)
  }
  
  createCircles(){
    const { knots, direction } = this.props;
    const circleNumber = this.getValue(knots, 4)
    const numberDir = circleNumber > 1 ? -direction : 0
    let child = '';
    let dir;
    for (let i = 1; i < circleNumber; i++) {
      dir = i === circleNumber - 1 ? direction : 0;
      child = this.createCircle(child, i, dir)
    }
    return child;
  }
  render(){
    return (
        <div className="knots">
          {Math.round(this.props.knots)}
          { this.createCircles() }
          <div className="wind-time">{this.props.time}</div>
        </div>
    );
  }
}

WindItem.propTypes = {
  knots: PropTypes.number
};

export default WindItem;
