var rAF_Polyfills = require('./rAFPolyfills');
var rAF = rAF_Polyfills.requestAnimationFrame;
var cAF = rAF_Polyfills.cancelAnimationFrame;

function AnimationLoop(){
  this.animations = [];
  this.isRunning = false;
  this.startTime = 0;
  this._time = 0;
  
  this.updateLoop = function updateLoop(time){ 
    // stop loop if no more animations
    if(!this.animations.length){
        return null;
    }
    
    this._time = time;
    //loop through all animations call them and pass in time
    for(var i = 0; i < this.animations.length; i++){
        this.animations[i](time);
    }
    //store reference so we can cancel it later
    this._rAF = rAF(this.updateLoop);
  }.bind(this);
}

AnimationLoop.prototype.start = function start(){
  if(!this.isRunning){
    this.isRunning = true;
    rAF(this.updateLoop);
  }
};

AnimationLoop.prototype.stop = function stop(){
  if(this.isRunning){
    cAF(this._rAF);
  }
};

AnimationLoop.prototype.addAnimation = function addAnimation(animation){
    console.log(animation)
  if (typeof animation === "function" && this.animations.indexOf(animation) === -1) {
    this.animations.push(animation);
  }
};

AnimationLoop.prototype.removeAnimation = function removeAnimation(animation) {
  //var index = this.animations.indexOf(animation);
  var index = -1;
  for (var i = this.animations.length - 1; i >= 0; i--) {
    if(this.animations[i] === animation){
      index = i
      break;
    }
  }
  if (index > -1) {
    this.animations.splice(index, 1);
  }
};

AnimationLoop.prototype.setAnimationTimeout = function setAnimationTimeout(animation, delay){
  var startTime = this._time;
  var animLoop = this;
  this.addAnimation(function delayedAnimation(time){
    if(time - startTime >= delay){
      animation();
      animLoop.removeAnimation(delayedAnimation);
    }
  });
}

AnimationLoop.prototype.setAnimationInterval = function setAnimationInterval(animation, interval){
  var startTime = this._time;
  var animLoop = this;
  this.addAnimation(function delayedAnimation(time){
    if(time - startTime >= interval){
      animation();
      startTime = time;
    }
  });
}

module.exports = AnimationLoop;
