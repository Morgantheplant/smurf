var Matter = require('matter-js');
var surf = require('./data/surfData.json');
var dataBuilder = require('./dataBuilder.js');
var mainAnimationLoop = require('./mainAnimationLoop');
var store = require('./reducers/rootStore').default;
var hoverDay =  require('./actions/clockActions').hoverDay;

var World = Matter.World,
Bodies = Matter.Bodies,
Body = Matter.Body,
Render = Matter.Render,
Composite = Matter.Composite,
Composites = Matter.Composites,
Constraint = Matter.Constraint;



var svgns = "http://www.w3.org/2000/svg";
var ary = dataBuilder(surf)

//width and height of svg elements
var width = 43;
var height = 20;
var padding = 3;
var initColor = "#26333c";
var initHighlight = "#014971";

var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine; 
var svgBG = document.getElementById('world');
var matterEngine;
var svgBods = [];
var svgBoxDims = svgBG.getBoundingClientRect();
var yCoord = svgBoxDims - height;
var highlighted = 0;
var physicsBodies = [];
var vertSprings = [];
var horzSprings = [];
var svgBars = [];

function reset(){
  mainAnimationLoop.removeAnimation(matterEngine);
  mainAnimationLoop.removeAnimation(render);
  physicsBodies = [];
  vertSprings = [];
  horzSprings = [];
}

function createBodies(days){
  
  if(engine){
    Engine.clear(engine);
    reset();
  }

  engine = Engine.create();

  for (var i = 0; i < days.length; i++) {
    //create top SVG element
    var hasTopElement = svgBods[i]
    var rect = (hasTopElement)? svgBods[i] : document.createElementNS(svgns, 'rect');
      var xCoord = width * i + (padding * (i+1));
      rect.setAttributeNS(null, 'height', height);
      rect.setAttributeNS(null, 'width', width);
      var rfColor = (i === highlighted)? initHighlight : initColor;
      rect.setAttributeNS(null, 'fill', rfColor);
      rect.setAttributeNS(null, 'x', xCoord);
      rect.setAttributeNS(null, 'class', "tip_svg");
      if(!hasTopElement){
        svgBods[i] = rect
        svgBG.appendChild(rect);
      }
    //create base SVG element    
    var hasBaseElement = svgBars[i]; 
    var baseSVG = (hasBaseElement) ? svgBars[i] : document.createElementNS(svgns, 'rect');
      baseSVG.setAttributeNS(null, 'height', height);
      baseSVG.setAttributeNS(null, 'width', width);
      var fColor = (i === highlighted)? initHighlight : initColor;
      baseSVG.setAttributeNS(null, 'fill', fColor);
      baseSVG.setAttributeNS(null, 'x', xCoord);
      baseSVG.setAttributeNS(null, 'class', "base_svg");
    if(!hasBaseElement){
      svgBG.appendChild(baseSVG);
      svgBars[i] = baseSVG;
    }  

    var xCoordP = 20 * i + (20 * (i+1));
    var physicsBody = Bodies.rectangle(xCoordP, svgBoxDims.height, 2, 2);
    var vertSpring = Constraint.create({ bodyA: physicsBody, pointB: { x: xCoordP, y: svgBoxDims.height } })
    vertSpring.stiffness = 0.02;
      // wave height
    var spLen = (days[i].surfMax * 30 + (height))
    vertSpring.length = spLen;
    
    var prevBody = physicsBodies[i-1]
    if(prevBody){
      var horizontalSpring = Constraint.create({ bodyA: physicsBody, bodyB: prevBody})
      horizontalSpring.length = 20 * 2;//padding * 2; 
      horizontalSpring.stiffness = 1;
      horzSprings.push(horizontalSpring);
    }
    
    rect.index = i;
    rect.physicsBody = physicsBody;
    
    function mouseOverEvent(){
        this.setAttributeNS(null, 'fill','#0c9fd5');
        var day = days[this.index]
        svgBars[this.index].setAttributeNS(null, 'fill', '#24c1f8');
        store.dispatch(hoverDay(this.index))
      }

    rect.addEventListener('mouseover', mouseOverEvent.bind(rect));

    baseSVG.addEventListener('mouseover', mouseOverEvent.bind(rect));
    
    function mouseOutEvent(){
        var fColor = (this.index === highlighted)? initHighlight : initColor;
        this.setAttributeNS(null, 'fill',fColor);
         svgBars[this.index].setAttributeNS(null, 'fill', fColor);

        Body.setVelocity(physicsBodies[this.index], {x:0,y:-5}, {x:0.000,y:0.001});
        this.setAttributeNS(null, 'height', height);
        this.setAttributeNS(null, 'width', width);
    }

    baseSVG.addEventListener('click', function(){
      var temp = highlighted;
      highlighted = this.index
      svgBods[temp].setAttributeNS(null, 'fill', initColor);
      svgBars[temp].setAttributeNS(null, 'fill', initColor);
    }.bind(rect))
      
      
      rect.addEventListener('mouseout', mouseOutEvent.bind(rect));
      baseSVG.addEventListener('mouseout', mouseOutEvent.bind(rect));

      physicsBodies.push(physicsBody);
      vertSprings.push(vertSpring)
  }
}

function render() {
  var bodies = Composite.allBodies(engine.world);
  var constraints = Composite.allConstraints(engine.world);
    for (var i = 0; i < bodies.length; i++) {
        var vertices = bodies[i].vertices;
        var rectSvg = svgBods[i];
        if(rectSvg && svgBars && svgBars[i]){
          rectSvg.setAttributeNS(null, 'y', vertices[0].y);
          svgBars[i].setAttributeNS(null, 'height',svgBoxDims.height)
          svgBars[i].setAttributeNS(null, 'y', vertices[0].y + height )
        }
    }
};

var called = false;
module.exports = function startSim(viz){ 
  if(!called){
    svgBG.style.opacity = 1;
    svgBG.style.visibility = "visible";
    document.getElementsByClassName('led_clock_container')[0].style.opacity = 1;
    document.getElementById('react-container').className += "containerLoaded";
    startViz(viz);
    called = startViz;
  }
   
}

function startViz(viz){
  var sim = viz || ary;
  mainAnimationLoop.setAnimationTimeout(function(){
      //create bodies will reset if already called
      createBodies(ary);
      engine.world.gravity.y = -0.1;
      World.add(engine.world, physicsBodies.concat(vertSprings.concat(horzSprings)));
      // // run the engine
      matterEngine = function matterEngine(){
        Engine.update(engine, 1000 / 60)
      }
      mainAnimationLoop.addAnimation(matterEngine);
      mainAnimationLoop.addAnimation(render);
    },100);
}

