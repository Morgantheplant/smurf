var Matter = require('matter-js');
var surf = require('./public/data.json');
var dataBuilder = require('./dataBuilder.js');
var map = require('./map.js');

   var World = Matter.World,
		Bodies = Matter.Bodies,
		Body = Matter.Body,
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

// create an engine
var engine = Engine.create();




var svgBG = document.getElementById('world');

var svgBods = [];
var svgBoxDims = svgBG.getBoundingClientRect();
var yCoord = svgBoxDims - height;

var physicsBodies = [];
var springs = [];
function createBodies(days){ 
  for (var i = 0; i < days.length; i++) {
    var rect = document.createElementNS(svgns, 'rect');
      var xCoord = width * i + (padding * (i+1));
      rect.setAttributeNS(null, 'height', '20');
      rect.setAttributeNS(null, 'width', '20');
      rect.setAttributeNS(null, 'fill', 'blue');
      rect.setAttributeNS(null, 'x', xCoord);
      svgBods.push(rect)
      svgBG.appendChild(rect);
      // physics bodies 
      var physicsBody = Bodies.rectangle(xCoord, svgBoxDims.height, height, width);
      
      var vertSpring = Constraint.create({ bodyA: physicsBody, pointB: { x: xCoord, y: svgBoxDims.height } })
      var prevBody = physicsBodies[i-1]
      if(prevBody){
        var horizontalSpring = Constraint.create({ bodyA: physicsBody, bodyB: prevBody})
        horizontalSpring.length = padding * 2
        horizontalSpring.stiffness = 1;
        springs.push(horizontalSpring)
      }
      vertSpring.stiffness = 0.02;
      //wave height
      vertSpring.length = (days[i].surfMax *10 + height/2);

      physicsBodies.push(physicsBody);
      springs.push(vertSpring)
  }
}

createBodies(ary);
engine.world.gravity.y = -0.1;
World.add(engine.world, physicsBodies.concat(springs));

// run the engine
Engine.run(engine);


// render loop
(function render() {
    var bodies = Composite.allBodies(engine.world);

    window.requestAnimationFrame(render);

    for (var i = 0; i < bodies.length; i++) {
        var vertices = bodies[i].vertices;
        var rectSvg = svgBods[i];
        //rectSvg.setAttributeNS(null, 'x', vertices[0].x);
        rectSvg.setAttributeNS(null, 'y', vertices[0].y);
    }
})();
