var rAF_Polyfills = require('./rAFPolyfills');
var rAF = rAF_Polyfills.requestAnimationFrame;
var cAF = rAF_Polyfills.cancelAnimationFrame;

function AnimationLoop(){
  this.animations = [];
  this.isRunning = false;
  this.startTime = 0;
  
  this.updateLoop: function updateLoop(time){ 
    // stop loop if no more animations
    if(!this.animations.length){
        return null;
    }

    //loop through all animations call them and pass in time
    for(var i = 0; i < this.animations.length; i++){
        this.animations[i](time);
    }
    // set start time
    if(this.startTime!){
      this.startTime = time;
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
  if (this.animations.indexOf(animation) === -1) {
    this.animations.push(animation);
  }
};

AnimationLoop.prototype.removeAnimation = function removeAnimation(animation) {
  var index = this.animations.indexOf(animation);
  if (index > -1) {
    this.animations.splice(index, 1);
  }
};