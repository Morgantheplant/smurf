var rAF_Polyfills = require('./rAFPolyfill');
var rAF = rAF_Polyfills.requestAnimationFrame;
var cAF = rAF_Polyfills.cancelAnimationFrame;

function AnimationLoop(){
  this.animations = [];
  this.isRunning = false;
  this.startTime = 0;
  this._time = 0;
  this.updateLoop = function updateLoop(time){ 
    this._time = time;
    //loop through all animations call them and pass in time
    for(var i = 0, len = this.animations.length; i < len; i++){
        // if(typeof  !== "function"){
        //      debugger
        // }
        this.animations[i] && this.animations[i](time);
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
  if (typeof animation === "function" && this.animations.indexOf(animation) === -1) {
    this.animations.push(animation);
  }
};


AnimationLoop.prototype.removeAnimation = function removeAnimation(animation) {
  var index = -1;
  if(animation){
    for (var i = 0, len = this.animations.length; i < len; i++) {
      if(this.animations[i] === animation){
        index = i
        break;
      }
    }
    if (index > -1) {
      this.animations.splice(index, 1);
    }
  }
};

AnimationLoop.prototype.setAnimationTimeout = function setAnimationTimeout(animation, delay){
  var startTime = this._time;
  var animLoop = this;
  this.addAnimation(function timeoutAnimation(time){
    if(time - startTime >= delay){
      animation();
      animLoop.removeAnimation(timeoutAnimation);
    }
  });
}

AnimationLoop.prototype.setAnimationInterval = function setAnimationInterval(animation, interval){
  var startTime = this._time;
  var animLoop = this;
  this.addAnimation(function intervalAnimation(time){
    if(time - startTime >= interval){
      animation();
      startTime = time;
    }
  });
}

AnimationLoop.prototype.getTime = function(){
  return this._time
}

module.exports = AnimationLoop;
