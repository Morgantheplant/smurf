import React from '../node_modules/react'
import classNames from 'classnames'
import TideLabel from './TideLabel'

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
let nightShade = "rgba(0,0,0,0.5)";
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
  let amPm = (hour < 12) ? "am" : "pm";
  let hrFormated = (hour < 12) ? hour : hour - 12;
  item.readAbleTime = hrFormated + ":" + minutes + amPm;
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
    this.changeDay = this.changeDay.bind(this);
    this.changeDayBack = this.changeDayBack.bind(this);
    this.changeToStart = this.changeToStart.bind(this);
  }
  
  componentWillReceiveProps() {
    let context = this.refs.tidesCanvas.getContext('2d');
    context.clearRect(0, 0, width, height);
    this.updateCanvas();
  }

  changeDay(){
    if(this.props.targetIndex < targetDays.length-2){
      let context = this.refs.tidesCanvas.getContext('2d');
      context.clearRect(0, 0, width, height);
      this.props.targetIndex++;
      this.updateCanvas();
    }
  }

  changeToStart(){
    if(this.props.targetIndex > 0){
      this.changeDayBack();
      setTimeout(function(){
        this.changeToStart()
      }.bind(this),50)
    }
  }

  changeDayBack(){
    if(this.props.targetIndex > 0){
      let context = this.refs.tidesCanvas.getContext('2d');
      context.clearRect(0, 0, width, height);
      this.props.targetIndex--;
      this.updateCanvas();
    }
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
    tidesArray.forEach(function(item, index){
      if(item.day === targetDays[this.props.targetIndex]){
        // find highest and lowest tide values
        // possibly use to calibrate chart
        //
        // if(item.height > highest){
        //   highest = item.height;
        //   highestData = item;
        // } 
        // if(item.height < lowest){
        //   lowest = item.height;
        //   lowestData = item;
        // }
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

    //this.buildBoard(cx);
    this.addHighLowTides(cx)
  }

  buildBoard(cx){
    // line across
    cx.beginPath();
    cx.moveTo(0,height/2);
    cx.lineTo(width, height/2);
    cx.strokeStyle=lineColors;
    cx.closePath();
    cx.stroke();
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
          cx.fillStyle = nightShade; 
         cx.fillRect(item.rangeX,0,width-item.rangeX,height);
         cx.stroke();
        }
    })
    
    //change this to label elements
    // specialTides.forEach(function(item, index){
    //     cx.font="12px Verdana black";
    //     cx.fillStyle = "white"
    //     let label1 = item.type.slice(0,1) +": "+ item.height;
    //     let label2 = item.readAbleTime;
    //     cx.fillText(label1,item.rangeX - 10,item.rangeY);
    //     cx.fillText(label2,item.rangeX - 10,item.rangeY+12);
    //     //sunrise and sunset lines 
    // })
  }

  render () {

    return (
      <div className="tides-container" 
        style={ {width: width + "px", height: height + "px"} } >
        <canvas  ref="tidesCanvas" width={width} height={height}/>
         { this.state.specialTides.map(this._createLabels, this) }
         <button style={{position:"absolute", left: "0px",top:height + 20 + "px"}}
           onClick={this.changeDay}
         >day forward</button>
         <button style={{position:"absolute", left: "100px",top:height + 20 + "px"}}
           onClick={this.changeToStart}
         >day back</button>
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