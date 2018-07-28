// var rAF_Polyfills = require('./rAFPolyfill');
var rAF = window.requestAnimationFrame //;rAF_Polyfills.requestAnimationFrame;
var cAF = window.cancelAnimationFrame // rAF_Polyfills.cancelAnimationFrame;

function AnimationLoop(options){
  this.animations = [];
  this._animations = [];
  this.isRunning = false;
  this.startTime = 0;
  this._time = 0;
}

AnimationLoop.prototype._updateLoop = function _updateLoop(time){ 
  this._time = time;
  // make a copy so animations can be removed during loop
  this._animations = this.animations.slice();
  while(this._animations.length){
    // pop animations off and call each animation passin in time
    this._animations.pop()(time);
  }
  //store reference so we can cancel it later
  this._rAF = rAF(this.updateLoop);
}

AnimationLoop.prototype.start = function start(){
  if(!this.isRunning){
    this.isRunning = true;
    this.updateLoop = this._updateLoop.bind(this);
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
  return animation;
};


AnimationLoop.prototype.removeAnimation = function removeAnimation(animation) {
  var index = this.animations.indexOf(animation);
  if (index !== -1) {
    this.animations.splice(index, 1);
  }
  index = this._animations.indexOf(animation);
  // remove animation if midway through loop
  if(index !== -1){
    this._animations.splice(index, 1);
  }
};

AnimationLoop.prototype.setAnimationTimeout = function setAnimationTimeout(animation, delay){
  var startTime = this._time;
  var animLoop = this;
  return this.addAnimation(function timeoutAnimation(time){
    if(time - startTime >= delay){
      animation();
      animLoop.removeAnimation(timeoutAnimation);
    }
  });
}

AnimationLoop.prototype.setAnimationInterval = function setAnimationInterval(animation, interval){
  var startTime = this._time;
  var animLoop = this;
  return this.addAnimation(function intervalAnimation(time){
    if(time - startTime >= interval){
      animation();
      startTime = time;
    }
  });
}

AnimationLoop.prototype.getTime = function(){
  return this._time
}


var mainAnimation = new AnimationLoop();
// exporting instance so we can access in multiple places
// window.addEventListener('resize', function throttleResize(){ 
//     if(!mainAnimation.animations.timeout){
//       var temp = mainAnimation.animations; 
//     }
//     mainAnimation.animations = []
//     var resizeTimeout = function resizeTimeout() {
//         mainAnimation.animations = temp;
//     }
//     resizeTimeout.timeout = true;
//     mainAnimation.setAnimationTimeout(resizeTimeout, 100);
// })
module.exports = mainAnimation;
