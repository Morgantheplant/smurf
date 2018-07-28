import React from "react";
import TideLabel from "./TideLabel.jsx";
import WindForecast from "./WindForecast.jsx";

const nightShade = "rgb(2, 15, 24,0.01);";
const labelColors = "white";

class Tides extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.tidesCanvas && this.props.targetIndex) {
      const context = this.tidesCanvas.getContext("2d");
      context.clearRect(0, 0, nextProps.width, nextProps.height);
      this.updateCanvas();
    }
  }

  updateCanvas() {
    const { width, height, targetIndex } = this.props;
    const canvas = this.tidesCanvas;
    const cx = canvas.getContext("2d");
    cx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = 1;
    canvas.width = width;
    cx.beginPath();
    cx.moveTo(0, height);
    const tidesData = this.props.surfData.tidesData;
    const { orderedDays, normalTidesDaily } = tidesData;
    const dayOfMonth = orderedDays[targetIndex];
    const normalTides = normalTidesDaily[dayOfMonth];

    if (normalTides) {
      this.addSunriseSunset(cx);

      normalTides.forEach((item) => {
        cx.lineTo(item.rangeX, item.rangeY);
      });

      cx.lineTo(width, height);
      cx.lineTo(0, height);
      cx.strokeStyle = "#007297";
      cx.fillStyle = "#007297";
      cx.fill();
      cx.closePath();
      cx.stroke();
    }
  }

  addSunriseSunset(cx) {
    const tidesData = this.props.surfData.tidesData;
    const { targetIndex, height, width } = this.props;
    const { orderedDays, sunriseSunsetTidesDaily } = tidesData;
    const dayOfMonth = orderedDays[targetIndex];
    const sunriseSunset = sunriseSunsetTidesDaily[dayOfMonth];
    if (sunriseSunset) {
      sunriseSunset.forEach((item) => {
        cx.strokeStyle = nightShade;
        cx.fillStyle = nightShade;
        if (item.type === "Sunrise") {
          cx.fillRect(0, 0, item.rangeX, height);
          cx.stroke();
        }
        if (item.type === "Sunset") {
          cx.fillRect(item.rangeX, 0, width - item.rangeX, height);
          cx.stroke();
        }
      });
    }
  }

  createLabels(item, index) {
    const label1 = `${item.type.slice(0, 1)}: ${item.height}`;
    const label2 = item.readAbleTime;
    return (
      <TideLabel
        key={index}
        xPos={item.rangeX}
        yPos={item.rangeY}
        title={label1}
        text={label2}
        color={labelColors}
        index={index}
      />);
  }

  render() {
    const { width, height, surfData, targetIndex } = this.props;
    let specialTides = [];
    if (targetIndex >= 0) {
      const { tidesData } = surfData;
      const { specialTidesDaily, orderedDays } = tidesData;
      specialTides = specialTidesDaily[orderedDays[targetIndex]];
    }
    return (
      <div
        className="tides-container"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <canvas
          ref={(canvas) => { this.tidesCanvas = canvas; }}
          width={width}
          height={height}
        />
        {
         specialTides && specialTides.map(this.createLabels, this)
        }
       <WindForecast targetIndex={targetIndex} wind={surfData.wind} />
      </div>);
  }

}

Tides.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  targetIndex: React.PropTypes.number,
  surfData: React.PropTypes.object
};

export default Tides;
