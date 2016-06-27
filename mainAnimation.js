var Matter = require('matter-js');
var surf = require('./data/surfData.json');
var dataBuilder = require('./dataBuilder.js');
var mainAnimationLoop = require('./mainAnimationLoop');

var World = Matter.World,
Bodies = Matter.Bodies,
Body = Matter.Body,
Render = Matter.Render,
Composite = Matter.Composite,
Composites = Matter.Composites,
Constraint = Matter.Constraint;


var svgns = "http://www.w3.org/2000/svg";
var ary = dataBuilder(surf)

var width = 20;
var height = 20;
var padding = 20;

var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

// todo: encapsulate physics engine into Singleton module 
//and rename engine to currentEngine so it can be tracked
// and cleared if it already exists
// possibly move this into its own component
var engine = Engine.create();
// http://brm.io/matter-js/docs/classes/Engine.html
// Matter.Engine.clear(engine);
var svgBG = document.getElementById('world');
var text = document.getElementById('text-container').children;
var dateHeading = document.getElementById('date');

var svgBods = [];
var svgBoxDims = svgBG.getBoundingClientRect();
var yCoord = svgBoxDims - height;

var physicsBodies = [];
var vertSprings = [];
var horzSprings = [];
var lines = [];
function createBodies(days){ 
  for (var i = 0; i < days.length; i++) {
    var rect = document.createElementNS(svgns, 'rect');
      var xCoord = width * i + (padding * (i+1));
      rect.setAttributeNS(null, 'height', '20');
      rect.setAttributeNS(null, 'width', '20');
      rect.setAttributeNS(null, 'fill', '#0E4F64');
      rect.setAttributeNS(null, 'x', xCoord);
      svgBods.push(rect)
      svgBG.appendChild(rect);
      
      var physicsBody = Bodies.rectangle(xCoord, svgBoxDims.height, 2, 2);
      var vertSpring = Constraint.create({ bodyA: physicsBody, pointB: { x: xCoord, y: svgBoxDims.height } })
       var vertLineSVG = document.createElementNS(svgns, 'line');
      vertLineSVG.setAttributeNS(null, 'x1', xCoord + width/2)
      vertLineSVG.setAttributeNS(null, 'y1', svgBoxDims.height)
      vertLineSVG.setAttributeNS(null, 'stroke', "#08304B")
      vertLineSVG.setAttributeNS(null, 'stroke-width', 1)
      vertLineSVG.setAttributeNS(null, 'x2',xCoord + width/2)
      svgBG.appendChild(vertLineSVG);
      lines.push(vertLineSVG);
      var prevBody = physicsBodies[i-1]
      if(prevBody){
        var horizontalSpring = Constraint.create({ bodyA: physicsBody, bodyB: prevBody})
        horizontalSpring.length = padding * 2; 
        horizontalSpring.stiffness = 1;
        horzSprings.push(horizontalSpring);
      }
      vertSpring.stiffness = 0.02;
      rect.index = i;
      rect.physicsBody = physicsBody;
      // wave height
      var spLen = (days[i].surfMax * 30 + height)
      vertSpring.length = spLen;

      rect.addEventListener('mouseover', function(){
        this.setAttributeNS(null, 'height', '30');
        this.setAttributeNS(null, 'width', '30');
        this.style.transform = "translate(-15%,-40%)"
        // todo: refactor DOM elements into component and 
        // dispatch events from here 
        var day = days[this.index]
        text[0].innerText = day.dayOfWeek + ' ' + day.date
        text[1].innerText = day.surfText;
        text[1].style.fontWeight = "bold";
        text[1].style.marginBottom = "10px"
        text[2].innerText = "Surf Conditions: " + day.generalCondition;
        text[3].innerText = "Surf Max: " +  day.surfMax + " Surf min:" + day.surfMin
        text[4].innerText = day.generalText;
        text[4].style.marginTop = "20px"
      }.bind(rect));

      
      
      rect.addEventListener('mouseout', function(){
        Body.setVelocity(physicsBodies[this.index], {x:0,y:-5}, {x:0.000,y:0.001});
        this.setAttributeNS(null, 'height', '20');
        this.setAttributeNS(null, 'width', '20');
        //todo: dispatch event from here
        this.style.transform = "translate(0%,0%)"
      }.bind(rect));
      physicsBodies.push(physicsBody);
      vertSprings.push(vertSpring)
  }
}

// todo: make render loop extensible
// add render queue and pass in highresTimestamp
// add ability to queue and dequeue animations
// remove setTimeout for clock

function render() {
  var bodies = Composite.allBodies(engine.world);
  var constraints = Composite.allConstraints(engine.world);
    for (var i = 0; i < bodies.length; i++) {
        var vertices = bodies[i].vertices;
        var rectSvg = svgBods[i];
        rectSvg.setAttributeNS(null, 'y', vertices[0].y);
        lines[i].setAttributeNS(null, 'y2',vertices[0].y + height)
    }
};

module.exports = function startSim(){ 
    svgBG.style.opacity = 1;
    document.getElementsByClassName('container')[0].style.opacity = 1;
    mainAnimationLoop.setAnimationTimeout(function(){
      createBodies(ary);
      engine.world.gravity.y = -0.1;
      World.add(engine.world, physicsBodies.concat(vertSprings.concat(horzSprings)));
      // // run the engine
      function matterEngine(){
        Engine.update(engine, 1000 / 60)
      }
      mainAnimationLoop.addAnimation(matterEngine);
      mainAnimationLoop.addAnimation(render);
  // //////////////////////////
  // //debugging    
  // var renderer = Render.create({
  //     element: document.body,
  //     engine: engine
  // });
  // Render.run(renderer);
  // //debugging
  // /////////////////////////
    },500);
}

module