// this.keys = {
//   LEFT: false,
//   RIGHT: false,
//   UP: false,
//   DOWN: false,
//   A: false,
//   S: false,
//   D: false,
//   W: false,
//   R: false
// };

var Keys = function () {
  this.KEYS = {
    LEFT: false,
    RIGHT: false,
    UP: false,
    DOWN: false,
    A: false,
    S: false,
    D: false,
    W: false,
    R: false
  };

window.addEventListener('keydown', function(e) {
  // debugger
  switch(e.keyCode) {
    case 37:
      e.preventDefault();
      this.KEYS.LEFT = true;
      break;
    case 38:
      e.preventDefault();
      this.KEYS.UP = true;
      break;
    case 39:
      e.preventDefault();
      this.KEYS.RIGHT = true;
      break;
    case 40:
      e.preventDefault();
      this.KEYS.DOWN = true;
      break;
    case 65:
      this.KEYS.A = true;
      break;
    case 87:
      this.KEYS.W = true;
      break;
    case 68:
      this.KEYS.D = true;
      break;
    case 83:
      this.KEYS.S = true;
      break;
    case 82:
      this.KEYS.R = true;
      break;
  }
}.bind(this));

window.addEventListener('keyup', function(e) {
  switch(e.keyCode) {
    case 37:
      this.KEYS.LEFT = false;
      break;
    case 38:
      this.KEYS.UP = false;
      break;
    case 39:
      this.KEYS.RIGHT = false;
      break;
    case 40:
      this.KEYS.DOWN = false;
      break;
    case 65:
      this.KEYS.A = false;
      break;
    case 87:
      this.KEYS.W = false;
      break;
    case 68:
      this.KEYS.D = false;
      break;
    case 83:
      this.KEYS.S = false;
      break;
    case 82:
      this.KEYS.R = false;
      break;
  }
}.bind(this));
};


module.exports = Keys;
