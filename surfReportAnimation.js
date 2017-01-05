import { World, Bodies, Body, Render, Composite, Composites, Constraint , Engine } from 'matter-js';
import mainAnimationLoop from './mainAnimationLoop';
import store from './reducers/rootStore';
import { hoverDay } from './actions/clockActions';
 

const svgns = "http://www.w3.org/2000/svg";

const width = 43,
  height = 20,
  padding = 3,
  initColor = "#26333c",
  initHighlight = "#014971";

const forecastGradients = [
  {
    status: "poor", 
    gradient:[
      {offset:'5%', 'stop-color':'#0909aa'},
      {offset:'95%','stop-color':'#0575E6'}
    ]
  },
  {
    status: "poor-to-fair", 
    gradient:[
      {offset:'5%', 'stop-color':'#00d2ff'},
      {offset:'95%','stop-color':'#928DAB'}

    ]
  },
  {
    status: "fair", 
    gradient:[
      {offset:'5%', 'stop-color':'#43C6AC'},
      {offset:'95%','stop-color':'#F8FFAE'}
    ]
  },
  {
    status: "fair-to-good", 
    gradient:[
      {offset:'5%', 'stop-color':'#a8e063'},
      {offset:'95%','stop-color':'#56ab2f'}
    ]
  },
  {
    status: "good", 
    gradient:[
      {offset:'5%', 'stop-color':'#ffff1c'},
      {offset:'95%','stop-color':'#00c3ff'}
    ]
  },
  {
    status: "good-to-epic", 
    gradient:[
      {offset:'5%', 'stop-color':'#FF512F'},
      {offset:'95%','stop-color':' #DD2476'}
    ]
  },
  {
    status: "epic", 
    gradient:[
      {offset:'5%', 'stop-color':'#D31027'},
      {offset:'95%','stop-color':'#EA384D'}
    ]
  }
]    

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
  this.gradients = {};
  this.svgBoxDims = options.$el.getBoundingClientRect(); 
  this.mainAnimationLoop = options.mainAnimationLoop;
  window.animations = options.mainAnimationLoop;
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
  this.addGradients();
  for (var i = 0; i < days.length; i++) {
    let topRect = this.createTopBar(i);
    let bottomRect = this.createBottomBar(i);
    let physicsBody = this.createPhysicsBodies(i, days);
    topRect.index = i;
    topRect.physicsBody = physicsBody;
    topRect.parent = this;
    const svgType = days[i].generalCondition.split(" ").join("-")
    // topRect.setAttribute("class", `top ${svgType}`);
    bottomRect.setAttribute("class", `base_svg ${svgType}`);  
    // topRect.addEventListener('mouseover', mouseOverEvent.bind(topRect));
    bottomRect.addEventListener('mouseover', mouseOverEvent.bind(topRect));
    bottomRect.addEventListener('click', clickEvent.bind(topRect))
    // topRect.addEventListener('mouseout', mouseOutEvent.bind(topRect));
    bottomRect.addEventListener('mouseout', mouseOutEvent.bind(topRect));
  }
}

// todo: reuse elements to they arent trashed and rebuilt every time
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
  topRectSVG.setAttributeNS(null, 'opacity', '0');
  topRectSVG.setAttributeNS(null, 'x', xCoord);
  // topRectSVG.setAttributeNS(null, 'class', "tip_svg");
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
  // baseRectSVG.setAttributeNS(null, 'class', "base_svg");
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

SurfReportAnimation.prototype.addGradients = function addGradients(){
  let gradient, defs;
  let svg = this.$el.$el;
  forecastGradients.forEach((conditionGrad) => {
    gradient = this.getGradient(conditionGrad.status, conditionGrad.gradient);
    defs = svg.querySelector('defs') ||
    svg.insertBefore( document.createElementNS(svgns,'defs'), svg.firstChild);
    defs.appendChild(gradient);
  })
  // todo: add filter here
  // const filter = document.createElementNS(svgns, 'filter');
  // filter.setAttribute('id', 'blur');
  // const blur = document.createElementNS(svgns, 'feGaussianBlur');

  // <filter id="blurMe">
  //   <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
  // </filter>  
}

SurfReportAnimation.prototype.getGradient = function getGradient(id,stops){
  let grad = this.gradients[id];

  if(!grad){
    grad  = document.createElementNS(svgns,'linearGradient');
    grad.setAttribute('id',id);
    grad.setAttribute('x1', '0%');
    grad.setAttribute('x2', '0%'); 
    grad.setAttribute('y1', '0%'); 
    grad.setAttribute('y2', '100%'); 
    // x1="0%" y1="0%" x2="0%" y2="100%"
    
    for (var i=0;i<stops.length;i++){
      var attrs = stops[i];
      var stop = document.createElementNS(svgns,'stop');
      for (var attr in attrs){
        if (attrs.hasOwnProperty(attr)){
          stop.setAttribute(attr,attrs[attr]);
        } 
      }
      grad.appendChild(stop);
    }
    this.gradients[id] = grad;
  }
  
  return grad;
}

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
  // this.parent.svgBods[this.index].setAttributeNS(null, 'fill', initHighlight);
  this.parent.svgBars[this.index].setAttributeNS(null, 'fill', initHighlight);
  // this.parent.svgBods[old].setAttributeNS(null, 'fill', initColor);
  this.parent.svgBars[old].setAttributeNS(null, 'fill', initColor);
}


function mouseOverEvent(){
  const bar = this.parent.svgBars[this.index];
  bar.setAttributeNS(null, 'fill', '#0c9fd5');
  // bar.setAttributeNS(null, 'class', 'bottom');
  // this.parent.svgBods[this.index].setAttributeNS(null, 'fill', '#0c9fd5');

  store.dispatch(hoverDay(this.index))
}

function mouseOutEvent(){
  let fColor = (this.index === this.parent.highlighted)? initHighlight : initColor;
  this.setAttributeNS(null, 'fill',fColor);
  const bar = this.parent.svgBars[this.index];
  bar.setAttributeNS(null, 'fill', fColor);
  // bar.setAttributeNS(null, 'class', '${bar.condition}');
  // this.parent.svgBods[this.index].setAttributeNS(null, 'fill', fColor);
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
  console.log('start sim')
  raw = raw || {};
  var hasForecast = raw.forecast && raw.forecast.length;
  //hide svg elements if called with no arguments and it has already been initialized
  if(!hasForecast && animationInstance){
     console.log("clearing animation")
    clearSim();
    return
  }
  // create animation if it hasnt been initialized
  if(!animationInstance && hasForecast){
    console.log("creating animation")
    createInstance();
  }
  // make sure viz exists and start animation 
  if(hasForecast){
    console.log("starting animation")
    startAnimation(raw);
  }
}

export function clearSim(){
  mainAnimationLoop.removeAnimation(boundAnimation);
  animationInstance && animationInstance.destroyElements()
}








