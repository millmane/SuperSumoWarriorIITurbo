var Util = require("./utils");
var MovingObject = require("./movingObject");
var Ship = require("./ship");
var Sound = require('./sound');


var DEFAULTS = {
  // COLORS: ["red", "lime", "blueviolet"],
  COLORS: ["blueviolet"],
  DENSITY: 350,
  RADIUS: 10,
  SPEED: 5,
};

var Asteroid = function (options = {}) {
  randColor = DEFAULTS.COLORS[Math.floor(Math.random() * DEFAULTS.COLORS.length)];
  options.color = randColor;
  options.density = DEFAULTS.DENSITY;
  this.defaultSpeed = DEFAULTS.SPEED;
  options.pos = options.pos || options.game.randomPosition();
  // options.radius = DEFAULTS.RADIUS;
  options.radius = randomRadius();
  // options.speed = DEFAULTS.SPEED;
  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);

  // options.vel = options.vel || Util.attackVec(DEFAULTS.SPEED, options.pos, options.game.ships[0].pos);

  // options.deg = options.vel[4];
  // this.sound = new Sound();
  this.sumo = new Image();
  this.sumo.src = './images/sumo_mad.png';
  this.growing = false;
  this.shrinking = false;
  this.defaultRadius = DEFAULTS.RADIUS;
  MovingObject.call(this, options);
};


randomRadius = function () {
  return (DEFAULTS.RADIUS) * Math.random() + DEFAULTS.RADIUS;
};

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.draw = function (ctx) {
  if (this.growing === false && this.shrinking === false) {
    ctx.drawImage(this.sumo, this.pos[0] - this.radius, this.pos[1] - this.radius, this.radius*2, this.radius*2);
  } else if (this.growing === true) {
    this.radius += 0.5;
    ctx.drawImage(this.sumo, this.pos[0] - this.radius, this.pos[1] - this.radius, this.radius*2, this.radius*2);
    if (this.radius >= this.defaultRadius * 4) {
      this.growing = false;
      this.shrinking = true;
    }
  } else if (this.shrinking === true) {
    this.radius -= 0.5;
    ctx.drawImage(this.sumo, this.pos[0] - this.radius, this.pos[1] - this.radius, this.radius*2, this.radius*2);
    if (this.radius <= this.defaultRadius) {
      this.radius = this.defaultRadius;
      this.shrinking = false;
    }
  }


      // ctx.drawImage(this.sumo, this.pos[0] - this.radius, this.pos[1] - this.radius, this.radius*2, this.radius*2);

};

Asteroid.prototype.collideWith = function (otherObject) {
  var sound = this.sound;

  if (otherObject.type === "Ship") {
    if (this.color === "red") {
      otherObject.relocate();
      this.game.remove(this);
    } else if (this.color === "lime") {
      otherObject.eat(this.radius);
      this.game.remove(this);
    } else if (this.color === "blueviolet") {
      otherObject.bounce(this);
      // sound.playSumo();
      // this.bounce(otherObject);
      // this.game.remove(this);
    } else if (otherObject.type === "Border") {
      this.game.remove(this);
    }
  }
};

// Asteroid.prototype.bounce = function (otherVel) {
//   this.vel[0] += otherVel[0];
//   this.vel[1] += otherVel[1];
// };


Asteroid.prototype.type = "Asteroid";

module.exports = Asteroid;
