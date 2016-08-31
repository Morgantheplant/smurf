import React from 'react';
import classNames from 'classnames';
import TideLabel from './TideLabel';

//import {Tide} from '../public/data.json'
//todo: see how es2015 imports handles json 
let Tide = require('../data/surfData.json').Tide;

//todo: add reducer here, replace forEach with for loops + micro optimizations where possible

//todo: turn these into props
let tidesArray = Tide.dataPoints;
let width = 200;
let height = 100;
let lineColors = "gray";
let labelColors = "white";
// todo: possibly remove this
let nightShade = "rgb(0,0,0)";
let days = 1;
let dayRange = (days * 23);
let highest = 0;
let lowest = 0;
let highestData = {};
let lowestData = {};
let specialTides = [];
let sunriseSunset = [];
let targetDays = [];

tidesArray.forEach(function(item, index){
  let time = new Date(item.time * 1000);
  let dayOfMonth = time.getDate();
  let hour = time.getHours();
  let minutes = time.getMinutes();
  let amPm = (hour < 12) ? " am" : " pm";
  let hrFormatted = (hour < 12) ? hour : hour - 12;
  let minutesFormatted = (minutes < 10) ? "0" + minutes : minutes;
  item.readAbleTime = hrFormatted + ":" + minutesFormatted + amPm;
  item.timeData = hour + (minutes/60);
  item.rangeX = normalizeRange(0,width,0,dayRange,item.timeData, time, hour);
  item.rangeY = normalizeRange(0,height,8,-4,item.height, time, hour);
  item.day = dayOfMonth;
  if(!targetDays["index"+dayOfMonth]){
    targetDays.push(dayOfMonth);
    targetDays["index"+dayOfMonth] = true;
  }
});

function normalizeRange(newmin, newmax, oldmin, oldmax, oldval, time, hour){
  newmin = newmin || 0;
  let newRange = newmax - newmin; // height or width, new in 0
  let oldRange = oldmax - oldmin;
  let newValue = (((oldval - oldmin)*newRange)/oldRange) + newmin;
  return Math.round(newValue);
}

class Tides extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sunriseSunset:[],
      specialTides:[],
      showLabels:false
    }
  }
  
  componentWillReceiveProps() {
    let context = this.refs.tidesCanvas.getContext('2d');
    context.clearRect(0, 0, width, height);
    this.updateCanvas();
  }

  updateCanvas() {
    const canvas = this.refs.tidesCanvas;
    const cx = canvas.getContext('2d');
    cx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = 1;
    canvas.width = width;
    cx.beginPath();
    cx.moveTo(0,height);
    let newSunState = [];
    let newTideState = [];
    this.addHighLowTides(cx)
    //possibly change to for loop
    tidesArray.forEach(function(item, index){
      if(item.day === targetDays[this.props.targetIndex]){
        if(item.type === "NORMAL"){
          cx.lineTo(item.rangeX, item.rangeY)
        } else {
          //special tides
          if(item.type.length > 4){
            //sunrise and sunset times
            //todo: remove state and move to single source of truth
            newSunState.push(item);
            sunriseSunset.push(item);
          } else {
            //high and low times
            //todo: remove state and move to single source of truth
            newTideState.push(item);
            specialTides.push(item);
          }
        }
      }
    }.bind(this));

    cx.lineTo(width, height);
    cx.lineTo(0,height);
    cx.strokeStyle="#007297";
    cx.fillStyle = "#007297";
    cx.fill();
    cx.closePath();
    cx.stroke();
    // update inner state.. todo: remove this
    this.setState({
      sunriseSunset: newSunState,
      specialTides: newTideState
    })
  }

  addHighLowTides(cx){
    //draw tides
    sunriseSunset.forEach(function(item, index){
       if(item.type == "Sunrise"){
         cx.fillStyle = nightShade; 
         cx.fillRect(0,0,item.rangeX,height);
         cx.stroke();
        }
        if(item.type == "Sunset"){
          cx.fillStyle = "nightShade"; 
         cx.fillRect(item.rangeX,0,width-item.rangeX,height);
         cx.stroke();
        }
    })
  }

  render () {
    return (
      <div className="tides-container" 
        style={ {width: width + "px", height: height + "px"} } >
        <canvas  ref="tidesCanvas" width={width} height={height}/>
         { this.state.specialTides.map(this._createLabels, this) }
      </div>)
  }

  _createLabels(item, index){
    let label1 = item.type.slice(0,1) + ": " + item.height;
    let label2 = item.readAbleTime;
    return (
      <TideLabel key={index} 
        xPos={item.rangeX} 
        yPos={item.rangeY}
        title={label1}
        text={label2} 
        color={labelColors} 
        index={index}/>) 
  }


}

export default Tides