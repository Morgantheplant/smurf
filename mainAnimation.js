import { World, Bodies, Body, Render, Composite, Composites, Constraint , Engine } from 'matter-js';
import dataBuilder from './dataBuilder.js';
import mainAnimationLoop from './mainAnimationLoop';
import store from './reducers/rootStore';
import { hoverDay } from './actions/clockActions';
 
// let surf = require('./data'); 

let svgns = "http://www.w3.org/2000/svg";
// ary = dataBuilder(surf.ob)

let width = 43,
  height = 20,
  padding = 3,
  initColor = "#26333c",
  initHighlight = "#014971";  

function SurfReportAnimation(options){
  this.engine = null;
  this.svgBods = [];
  this.highlighted = 0;
  this.physicsBodies = [];
  this.vertSprings = [];
  this.horzSprings = [];
  this.svgBars = [];
  this.mainBackground = options.$el;
  this.$el = {
    $el: options.$el
  };
  this.svgBoxDims = options.$el.getBoundingClientRect(); 
  this.mainAnimationLoop = options.mainAnimationLoop;
  this.name = options.name;
}

SurfReportAnimation.prototype.reset = function reset(){
  this.mainAnimationLoop.removeAnimation(this._matterEngine);
  this.mainAnimationLoop.removeAnimation(this._render);
  this.physicsBodies = [];
  this.vertSprings = [];
  this.horzSprings = [];
}

SurfReportAnimation.prototype.createBodies = function createBodies(days){
  if(this.engine){
    Engine.clear(this.engine);
    this.reset();
  }
  this.engine = Engine.create();
  this.mainBackground.style.display = "block";
   // this.mainBackground.style.visibility = "visible"
   //  this.mainBackground.style.opacity = 1
  for (var i = 0; i < days.length; i++) {
    let topRect = this.createTopBar(i);
    let bottomRect = this.createBottomBar(i);
    let physicsBody = this.createPhysicsBodies(i, days);
    topRect.index = i;
    topRect.physicsBody = physicsBody;
    topRect.parent = this; 
    topRect.addEventListener('mouseover', mouseOverEvent.bind(topRect));
    bottomRect.addEventListener('mouseover', mouseOverEvent.bind(topRect));
    bottomRect.addEventListener('click', clickEvent.bind(topRect))
    topRect.addEventListener('mouseout', mouseOutEvent.bind(topRect));
    bottomRect.addEventListener('mouseout', mouseOutEvent.bind(topRect));
  }
}

SurfReportAnimation.prototype.destroyElements = function(){
  if(this.engine){
    Engine.clear(this.engine);
    this.reset();
    this.svgBods = [];
    this.svgBars = [];
    let { $el } = this.$el;
    while ($el.lastChild) {
      $el.removeChild($el.lastChild);
    }
    this.mainBackground.style.display = "none"
  }
}

SurfReportAnimation.prototype.createTopBar = function createTopBar(i){
  let hasTopElement = this.svgBods[i]
  // create top element if it doesn't already exist
  let topRectSVG = (hasTopElement)? this.svgBods[i] : document.createElementNS(svgns, 'rect');
  let xCoord = width * i + (padding * (i+1));
  topRectSVG.setAttributeNS(null, 'height', height);
  topRectSVG.setAttributeNS(null, 'width', width);
  let rfColor = (i === this.highlighted)? initHighlight : initColor;
  topRectSVG.setAttributeNS(null, 'fill', rfColor);
  topRectSVG.setAttributeNS(null, 'x', xCoord);
  topRectSVG.setAttributeNS(null, 'class', "tip_svg");
  if(!hasTopElement){
    this.svgBods[i] = topRectSVG
    this.mainBackground.appendChild(topRectSVG);
  }
  return topRectSVG
}

SurfReportAnimation.prototype.createBottomBar = function createBottomBar(i){
  let hasBaseElement = this.svgBars[i]; 
  // create base element if it doesn't already exist
    let baseRectSVG = (hasBaseElement) ? this.svgBars[i] : document.createElementNS(svgns, 'rect');
    let xCoord = width * i + (padding * (i+1));
    baseRectSVG.setAttributeNS(null, 'height', height);
    baseRectSVG.setAttributeNS(null, 'width', width);
    let fColor = (i === this.highlighted)? initHighlight : initColor;
    baseRectSVG.setAttributeNS(null, 'fill', fColor);
    baseRectSVG.setAttributeNS(null, 'x', xCoord);
    baseRectSVG.setAttributeNS(null, 'class', "base_svg");
    if(!hasBaseElement){
      this.mainBackground.appendChild(baseRectSVG);
      this.svgBars[i] = baseRectSVG;
    }  
    return baseRectSVG;
}

SurfReportAnimation.prototype.createPhysicsBodies = function createPhysicsBodies(i, days){
  // create physics bodies
  let xCoordP = 20 * i + (20 * (i+1));
  let physicsBody = Bodies.rectangle(xCoordP, this.svgBoxDims.height, 2, 2);
  let vertSpring = Constraint.create({ bodyA: physicsBody, pointB: { x: xCoordP, y: this.svgBoxDims.height } })
  vertSpring.stiffness = 0.02;
  let spLen = (days[i].surfMax * 30 + (height))
  vertSpring.length = spLen;
  
  let prevBody = this.physicsBodies[i-1]
  if(prevBody){
    let horizontalSpring = Constraint.create({ bodyA: physicsBody, bodyB: prevBody})
    horizontalSpring.length = 20 * 2; 
    horizontalSpring.stiffness = 1;
    this.horzSprings.push(horizontalSpring);
  }
  this.vertSprings.push(vertSpring);
  this.physicsBodies.push(physicsBody);

  return physicsBody;
}


SurfReportAnimation.prototype.render = function render() {
  let bodies = Composite.allBodies(this.engine.world);
  let constraints = Composite.allConstraints(this.engine.world);
    for (let i = 0; i < bodies.length; i++) {
      let vertices = bodies[i].vertices;
      let rectSvg = this.svgBods[i];
      if(rectSvg && this.svgBars && this.svgBars[i]){
        rectSvg.setAttributeNS(null, 'y', vertices[0].y);
        this.svgBars[i].setAttributeNS(null, 'height',this.svgBoxDims.height)
        this.svgBars[i].setAttributeNS(null, 'y', vertices[0].y + height )
      }
    }
};

SurfReportAnimation.prototype.init = function init(data){
  //create bodies will reset if already called
  this.createBodies(data);
  this.engine.world.gravity.y = -0.1;
  World.add(this.engine.world, this.physicsBodies.concat(this.vertSprings.concat(this.horzSprings)));
  // run the engines
  // store reference to engine and render calls
  this._matterEngine = this.matterEngine.bind(this);
  this._render = this.render.bind(this)
  this.mainAnimationLoop.addAnimation(this._matterEngine);
  this.mainAnimationLoop.addAnimation(this._render);
}

SurfReportAnimation.prototype.matterEngine = function matterEngine(){
  Engine.update(this.engine, 1000 / 60);
}

function clickEvent(){
  let old = this.parent.highlighted;
  this.parent.highlighted = this.index;
  this.parent.svgBods[this.index].setAttributeNS(null, 'fill', initHighlight);
  this.parent.svgBars[this.index].setAttributeNS(null, 'fill', initHighlight);
  this.parent.svgBods[old].setAttributeNS(null, 'fill', initColor);
  this.parent.svgBars[old].setAttributeNS(null, 'fill', initColor);
}


function mouseOverEvent(){
  this.parent.svgBars[this.index].setAttributeNS(null, 'fill', '#0c9fd5');
  this.parent.svgBods[this.index].setAttributeNS(null, 'fill', '#0c9fd5')
  store.dispatch(hoverDay(this.index))
}

function mouseOutEvent(){
  let fColor = (this.index === this.parent.highlighted)? initHighlight : initColor;
  this.setAttributeNS(null, 'fill',fColor);
  this.parent.svgBars[this.index].setAttributeNS(null, 'fill', fColor);
  this.parent.svgBods[this.index].setAttributeNS(null, 'fill', fColor);
  Body.setVelocity(this.physicsBody, {x:0,y:-5}, {x:0.000,y:0.001});
  this.setAttributeNS(null, 'height', height);
  this.setAttributeNS(null, 'width', width);
}


let el = document.getElementById('world');
let animationInstance;
let currentViz;
let boundAnimation;

function createInstance (){
  animationInstance = new SurfReportAnimation({
      $el: el,
      mainAnimationLoop: mainAnimationLoop
    });
}

function startAnimation(raw){
  currentViz = raw.id;
  boundAnimation = animationInstance.init(raw.forecast); 
}

export function startSim(raw){
  raw = raw || {};
  var hasForecast = raw.forecast && raw.forecast.length;
  //hide svg elements if called with no arguments and it has already been initialized
  if(!hasForecast && animationInstance){
    clearSim();
    return
  }
  // create animation if it hasnt been initialized
  if(!animationInstance && hasForecast){
    createInstance();
  }
  // make sure viz exists and start animation 
  if(hasForecast && raw.id !== currentViz){
    startAnimation(raw);
  }
}

export function clearSim(){
  mainAnimationLoop.removeAnimation(boundAnimation);
  animationInstance && animationInstance.destroyElements()
}








