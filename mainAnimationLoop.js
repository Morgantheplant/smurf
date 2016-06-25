var MainAnimationLoop = require('./animation/animationLoop');
var mainAnimation = new MainAnimationLoop();
// exporting instance so we can access in multiple places
module.exports = mainAnimation;
