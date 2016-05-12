var Ship = require("./ship");
var MovingObject = require("./movingObject");
var Util = require("./utils");

function randomColor() {
  var hexDigits = "0123456789ABCDEF";

  var color = "#";
  for (var i = 0; i < 3; i ++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return color;
}

var DEFAULTS = {
  // COLORS: ["red", "lime", "blueviolet"],
  COLORS: ["blueviolet"],
  DENSITY: 50,
  RADIUS: 100,
  SPEED: 40,
};

var Ship = function (options) {
  options.radius = DEFAULTS.RADIUS;
  options.vel = options.vel || [0, 0];
  options.density = DEFAULTS.DENSITY;

  // options.color = options.color || randomColor();
  options.color = options.color || "fuchsia";

  this.sumo = new Image();
  this.sumo.src = './images/sumo_test.jpg';



  MovingObject.call(this, options);
};

Util.inherits(Ship, MovingObject);

Ship.prototype.draw = function (ctx) {
  ctx.drawImage(this.sumo, this.pos[0] - DEFAULTS.RADIUS, this.pos[1] - DEFAULTS.RADIUS, DEFAULTS.RADIUS*2, DEFAULTS.RADIUS*2);
};

Ship.prototype.relocate = function () {
  // this.pos = this.game.randomPosition();
  this.pos = [window.innerWidth / 2, window.innerHeight / 2];
  this.vel = [0, 0];
};

Ship.prototype.eat = function (otherRadius) {
  otherArea = Math.PI * Math.pow(otherRadius, 2);
  oldArea = Math.PI * Math.pow(this.radius , 2);
  newArea = otherArea + oldArea;
  newRadius = Math.sqrt((newArea / Math.PI));

  this.radius = newRadius;
};
//
// Ship.prototype.bounce = function (otherVel) {
//   this.vel[0] += otherVel[0];
//   this.vel[1] += otherVel[1];
// };

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
  this.speed = Math.hypot(this.vel[0], this.vel[1]);
  this.deg = Math.asin(this.vel[0] / this.speed);
};

Ship.prototype.collideWith = function (otherObject) {
  if (otherObject.type === "Border") {
    this.game.remove(this);
  }
};

Ship.prototype.type = "Ship";

module.exports = Ship;
