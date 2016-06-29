var MainAnimationLoop = require('./animation/animationLoop');
var mainAnimation = new MainAnimationLoop();
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
