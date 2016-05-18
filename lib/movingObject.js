var Util = require("./utils");
var Asteroid = require('./asteroid');


var MovingObject = function (options) {
  this.game = options.game;
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.density = options.density;
  this.mass = Math.PI * Math.pow(this.radius, 2) * this.density; // area * density = mass
};

MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;

  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  );
  ctx.fill();
};

var NORMAL_FRAME_TIME_DELTA = 1000/60;
MovingObject.prototype.move = function (timeDelta) {
  //timeDelta is number of milliseconds since last move
  //if the computer is busy the time delta will be larger
  //in this case the MovingObject should move farther in this frame
  //velocity of object is how far it should move in 1/60th of a second

  var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
    offsetX = this.vel[0] * velocityScale,
    offsetY = this.vel[1] * velocityScale;

  this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
  // this.pos = this.game.wrap(this.pos);

  if (this.game.isOutOfBounds(this.pos)) {
    // if (this.isWrappable) {
    //   this.pos = this.game.wrap(this.pos);
    // } else {
      this.remove();
    // }
  }
};

MovingObject.prototype.remove = function () {
  // this.game.remove(this);
  // if (this.type === "Asteroid") {
  //   this.game.add(new Asteroid({ game: this }));
  // }
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  var centerDist;

  if (otherObject.type === "Asteroid" || otherObject.type === "Ship") {
    centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  } else if (otherObject.type === "Border") {
    centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist > (this.radius - OtherObject.radius);
  }
};

MovingObject.prototype.willCollideWith = function (otherObject) {
  var centerDist;

  if (otherObject.type === "Asteroid" || otherObject.type === "Ship") {
    centerDist = Util.dist(
      [this.pos[0] + this.vel[0],this.pos[1] + this.vel[1]],
      [otherObject.pos[0] + otherObject.vel[0],  otherObject.pos[1] + otherObject.vel[1]]
     );
    return centerDist < (this.radius + otherObject.radius);
  } else if (otherObject.type === "Border") {
    centerDist = Util.dist(
      [this.pos[0] + this.vel[0],this.pos[1] + this.vel[1]],
      [otherObject.pos[0],  otherObject.pos[1]]
     );
     return centerDist > (otherObject.radius - this.radius);
  }
};

MovingObject.prototype.collideWith = function (otherObject) {
  // if (this.isCollidedWith(otherObject)) {
  //   this.remove();
  //   otherObject.remove();
  // }
};

dotProduct = function (v1, v2) {
  return v1[0] * v2[0] + v1[1] * v2[1];
};

vectorSubtract = function (v1, v2) {
  return [v1[0] - v2[0], v1[1] - v2[1]];
};

vectorNorm = function (v1, v2) {
  subtracted = vectorSubtract(v1,v2);
  return Math.pow(subtracted[0],2) + Math.pow(subtracted[1],2);
};

MovingObject.prototype.bounce = function (otherObject) {

  this.vel = vectorSubtract(this.vel,
      [((2 * otherObject.mass) / (this.mass + otherObject.mass)) *
      dotProduct(vectorSubtract(this.vel, otherObject.vel), vectorSubtract(this.pos,otherObject.pos)) /
      vectorNorm(this.pos, otherObject.pos) *
      vectorSubtract(this.pos, otherObject.pos)[0],
      ((2 * otherObject.mass) / (this.mass + otherObject.mass)) *
      dotProduct(vectorSubtract(this.vel, otherObject.vel), vectorSubtract(this.pos,otherObject.pos)) /
      vectorNorm(this.pos, otherObject.pos) *
      vectorSubtract(this.pos, otherObject.pos)[1]]
    );

    otherObject.vel = vectorSubtract(otherObject.vel,
        [((2 * this.mass) / (otherObject.mass + this.mass)) *
        dotProduct(vectorSubtract(otherObject.vel, this.vel), vectorSubtract(otherObject.pos,this.pos)) /
        vectorNorm(otherObject.pos, this.pos) *
        vectorSubtract(otherObject.pos, this.pos)[0],
        ((2 * this.mass) / (otherObject.mass + this.mass)) *
        dotProduct(vectorSubtract(otherObject.vel, this.vel), vectorSubtract(otherObject.pos,this.pos)) /
        vectorNorm(otherObject.pos, this.pos) *
        vectorSubtract(otherObject.pos, this.pos)[1]]
      );

};
module.exports = MovingObject;
