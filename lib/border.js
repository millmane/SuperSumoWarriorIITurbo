var Util = require("./utils");
var MovingObject = require("./movingObject");
var Ship = require("./ship");

var DEFAULTS = {
  COLOR: "black",
  RADIUS: 300,
};

var Border = function (options = {}) {
  this.color = DEFAULTS.COLOR;
  this.radius = DEFAULTS.RADIUS;
  this.pos = [(window.innerWidth / 2) ,(window.innerHeight / 2)];
};

Border.prototype.draw = function (ctx) {
  ctx.strokeStyle = DEFAULTS.COLOR;
  ctx.beginPath();
  ctx.arc((window.innerWidth / 2) ,(window.innerHeight / 2),DEFAULTS.RADIUS,0,2*Math.PI);
  ctx.lineWidth = 5;
  ctx.stroke();
};


// Border.prototype.isCollidedWith = function (otherObject) {
//   var centerDist = Util.dist(this.pos, otherObject.pos);
//   return centerDist > (this.radius - OtherObject.radius);
// };

Border.prototype.collideWith = function (otherObject) {

  if (object.type === "Asteroid") {
    otherObject.remove();
  }
};

Border.prototype.type = "Border";


module.exports = Border;
