/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);
	var GameView = __webpack_require__(8);
	var Sound = __webpack_require__(6);
	
	document.addEventListener("DOMContentLoaded", function(){
	  var gameCanvas = document.getElementById("game-canvas");
	  // var sound = new Sound();
	  // var bgCanvas = document.getElementById("background-canvas");
	  gameCanvas.width = Game.DIM_X;
	  gameCanvas.height = Game.DIM_Y;
	
	  var gameCtx = gameCanvas.getContext("2d");
	  // var bgCtx = bgCanvas.getContext("2d");
	  var game = new Game();
	  new GameView(game, gameCtx).start();
	
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Asteroid = __webpack_require__(2);
	var Ship = __webpack_require__(5);
	var Border = __webpack_require__(7);
	var Sound = __webpack_require__(6);
	var Util = __webpack_require__(3);
	var Keys = __webpack_require__(9);
	//testing merge fix stuff
	
	var Game = function () {
	  this.asteroids = [];
	  this.ships = [];
	  this.border = new Border();
	  this.addShip();
	  this.addAsteroids();
	  this.gameover = false;
	  this.started = false;
	  this.elements = [];
	  this.gameTime = 0;
	  this.highScore = 0;
	  this.keys = new Keys();
	
	  this.start_button = {
	    color: '#a64040',
	    width: 250,
	    height: 75,
	    top: 230,
	    left: (window.innerWidth / 2) - 250 - 10,
	    action: function (gameView) {
	        gameView.game.started = true;
	        gameView.sound.playGame();
	      }
	  };
	
	  this.restart_button = {
	    color: '#a64040',
	    width: 290,
	    height: 75,
	    top: 300,
	    left: (window.innerWidth / 2) - 200,
	    action: function (gameView) {
	        gameView.game.started = false;
	        gameView.game.gameover = false;
	        gameView.game.reset();
	        gameView.ship = gameView.game.ships[0];
	        // gameView.game.addShips();
	
	        gameView.start();
	      }
	  };
	
	  this.mute_button = {
	    color: '#a64040',
	    width: 250,
	    height: 75,
	    top: 230,
	    left: (window.innerWidth / 2) + 10,
	    action: function (gameView) {
	        if (gameView.sound.muted() === true) {
	          gameView.sound.unmute();
	        } else {
	          gameView.sound.mute();
	        }
	      }.bind(this)
	  };
	
	  // this.rage_bar = {
	  //   color: 'blue',
	  //   width: 250,
	  //   height: 75,
	  //   top: 230,
	  //   left: 230,
	  //   action: function() {}
	  // };
	
	  this.elements.push(
	    this.start_button,
	    this.restart_button,
	    this.mute_button,
	    this.rage_bar
	  );
	};
	
	Game.BG_COLOR = "#fad5a6";
	Game.DIM_X = window.innerWidth;
	Game.DIM_Y = window.innerHeight;
	Game.NUM_ASTEROIDS = 100;
	
	Game.prototype.add = function (object) {
	  if (object.type === "Asteroid") {
	    this.asteroids.push(object);
	  } else if (object.type === "Ship") {
	    this.ships.push(object);
	  } else if (object.type === "Border") {
	
	  }
	
	};
	
	Game.prototype.addAsteroids = function () {
	  // vel = Util.attackVec(DEFAULTS.SPEED, this.pos, this.game.ships[0].pos);
	
	  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
	    this.add(new Asteroid({ game: this}));
	  }
	};
	
	Game.prototype.freezeAsteroids = function () {
	  var shrink = function (asteroid){
	    // if (asteroid.radius === asteroid.defaultRadius) {
	    //   asteroid.s
	    // }
	    asteroid.growing = false;
	    asteroid.shrinking = true;
	  };
	
	  for (var i = 0; i < this.asteroids.length; i++) {
	    this.asteroids[i].vel = [0,0];
	    this.asteroids[i].growing = true;
	    // if (this.asteroids[i].radius === this.asteroids[i].defaultRadius ){
	    //
	    // }
	    // setTimeout(shrink(this.asteroids[i]), 5000);
	  }
	};
	
	Game.prototype.resetAsteroidsVelocity = function () {
	  for (var i = 0; i < this.asteroids.length; i++) {
	    this.asteroids[i].vel = Util.randomVec(this.asteroids[i].defaultSpeed);
	  }
	};
	
	Game.prototype.addShip = function () {
	  var ship = new Ship({
	    pos: [window.innerWidth / 2, window.innerHeight / 2],
	    game: this
	  });
	
	  this.add(ship);
	  return ship;
	};
	
	Game.prototype.addBorder = function () {
	  var border = new Border({});
	  return border;
	};
	
	Game.prototype.allObjects = function () {
	  return [].concat(this.asteroids, this.ships);
	};
	
	Game.prototype.draw = function (ctx) {
	  this.elements = [];
	  ctx.canvas.width = window.innerWidth;
	  ctx.canvas.height = window.innerHeight;
	    if (this.gameover === false) {
	      if (this.started === true){
	        if (this.gameTime < 180) {
	          this.drawGameCountdown(ctx);
	        } else {
	          this.drawGameScreen(ctx);
	        }
	      } else {
	        this.drawStartScreen(ctx);
	      }
	    } else {
	      this.drawEndScreen(ctx);
	    }
	};
	
	Game.prototype.drawGameCountdown = function (ctx) {
	  ctx.clearRect(0, 0, window.innerWidth, Game.DIM_Y);
	  ctx.fillStyle = Game.BG_COLOR;
	  ctx.fillRect(0, 0, window.innerWidth, Game.DIM_Y);
	  ctx.fillStyle = "#0a7e8c";
	    ctx.font = "normal normal 72px Kaushan Script";
	    ctx.fillText(3 - Math.floor(this.gameTime/60), (window.innerWidth / 2) - 50, window.innerHeight / 2);
	
	    ctx.font = "normal normal 36px Kaushan Script";
	    ctx.fillText("Directions", 35, 50);
	    ctx.font = "normal normal 20px Kaushan Script";
	    ctx.fillText("_________________", 15, 52);
	    ctx.fillText("W,A,S,D - movement", 25, 80);
	    ctx.fillText("E - to show your might!", 25, 110);
	    ctx.fillText("F - to become immovable!", 25, 140);
	    ctx.fillText("R - to knock your enemies into the air!", 25, 170);
	
	};
	
	Game.prototype.drawGameScreen = function (ctx) {
	
	  this.elements = [this.rage_bar];
	
	  // ctx.strokeStyle = DEFAULTS.COLOR;
	
	  ctx.clearRect(0, 0, window.innerWidth, Game.DIM_Y);
	  ctx.fillStyle = Game.BG_COLOR;
	  ctx.fillRect(0, 0, window.innerWidth, Game.DIM_Y);
	
	  // ctx.fillStyle = this.rage_bar.color;
	    // this.rage_bar.width = this.ships[0].rage;
	    // ctx.fillRect(((window.innerWidth / 2) - this.rage_bar.width - 10), this.rage_bar.top, this.rage_bar.width, this.rage_bar.height);
	
	  ctx.fillStyle = "#0a7e8c";
	    ctx.font = "normal normal 48px Kaushan Script";
	    ctx.fillText("Score: " + Math.floor(this.gameTime), (window.innerWidth / 2) - 100, 70);
	
	    ctx.font = "normal normal 36px Kaushan Script";
	    ctx.fillText("Directions", 35, 50);
	    ctx.font = "normal normal 20px Kaushan Script";
	    ctx.fillText("_________________", 15, 52);
	    ctx.fillText("W,A,S,D - movement", 25, 80);
	    ctx.fillText("E - to show your might!", 25, 110);
	    ctx.fillText("F - to become immovable!", 25, 140);
	    ctx.fillText("R - to knock your enemies into the air!", 25, 170);
	
	  this.allObjects().forEach(function (object){
	    object.draw(ctx);
	  });
	
	
	  var opacity = (this.ships[0].rage / 100 - 0.25).toString();
	  ctx.beginPath();
	  ctx.arc(this.ships[0].pos[0] ,this.ships[0].pos[1],this.ships[0].radius,0,2*Math.PI);
	  // ctx.lineWidth = 5;
	
	if (this.ships[0].colorDelay === false) {
	  if (this.ships[0].rage >= 100)
	  {
	    // ctx.fillStyle = "rgba(0, 0, 0, " + opacity + ")";
	
	    // console.log(this);
	    // console.log(ctx.fillStyle);
	    this.ships[0].colorDelay = true;
	    setTimeout(function(){
	    //   console.log("hi");
	    // //   // debugger
	      this.ships[0].colorDelay = false;
	    // //   // var opacity = (this.ships[0].rage / 100 - 0.25).toString();
	    // //
	    // //   ctx.beginPath();
	    // //
	    // //   ctx.arc(this.ships[0].pos[0] ,this.ships[0].pos[1],this.ships[0].radius,0,2*Math.PI);
	    // //
	      ctx.fillStyle = "rgba(" +
	      Math.floor(Math.random() * 255) + ", " +
	      Math.floor(Math.random() * 255) + ", " +
	      Math.floor(Math.random() * 255) + ", " +
	      opacity + ")";
	      this.test = ctx.fillStyle;
	      // ctx.fill();
	    // //   debugger
	  }.bind(this), 180, ctx);
	    ctx.fill();
	  } else {
	    ctx.fillStyle = "rgba(255, 0, 0, " + opacity + ")";
	    ctx.fill();
	  }
	} else {
	  ctx.fillStyle = this.test || "rgba(0,0,0,0)" ;
	    // ctx.fillStyle = "rgba(" +
	    // Math.floor(Math.random() * 255) + ", " +
	    // Math.floor(Math.random() * 255) + ", " +
	    // Math.floor(Math.random() * 255) + ", " +
	    // opacity + ")";
	  ctx.fill();
	
	}
	  //  ctx.fill();
	
	
	
	
	  this.border.draw(ctx);
	
	};
	
	Game.prototype.drawStartScreen = function (ctx) {
	  this.elements = [this.start_button, this.mute_button];
	
	    //background
			ctx.clearRect(0, 0, window.innerWidth, Game.DIM_Y);
			ctx.fillStyle = Game.BG_COLOR;
			ctx.fillRect(0, 0, window.innerWidth, Game.DIM_Y);
	
	    //start_button
	    ctx.fillStyle = this.start_button.color;
	      ctx.fillRect(((window.innerWidth / 2) - this.start_button.width - 10), this.start_button.top, this.start_button.width, this.start_button.height);
	
	    //mute_button
	    ctx.fillStyle = this.mute_button.color;
	      ctx.fillRect(((window.innerWidth / 2) + 10), this.mute_button.top, this.mute_button.width, this.mute_button.height);
	
			ctx.fillStyle = "#0a7e8c";
	      ctx.font = "48px Kaushan Script";
	    	ctx.fillText("SUPER SUMO WARRIOR II TURBO", (window.innerWidth / 2) - 400, 125);
	
	      ctx.font = "normal normal 30px Kaushan Script";
	    	ctx.fillText("Enter the ring and TEST YOUR MIGHT!", (window.innerWidth / 2) - 275, 180);
	
	      ctx.font = "normal normal 48px Kaushan Script";
	      ctx.fillText("Directions", (window.innerWidth / 2) - 110, 390);
	      ctx.fillText("Powers", (window.innerWidth / 2) - 90, 585);
	
	      ctx.font = "normal normal 24px Kaushan Script";
	      ctx.fillText("_______________________", (window.innerWidth / 2) - 165, 397);
	      ctx.fillText("- Tap W,A,S,D repeatedly to move", (window.innerWidth / 2) - 185, 425);
	      ctx.fillText("- Stay within the ring", (window.innerWidth / 2) - 185, 455);
	      ctx.fillText("- Build Rage when you get hit until you are Flashing", (window.innerWidth / 2) - 185, 485);
	      ctx.fillText("- When Flashing you may use Powers", (window.innerWidth / 2) - 185, 515);
	
	      ctx.fillText("_______________________", (window.innerWidth / 2) - 165, 592);
	
	      ctx.fillText("- Press E to show your might!", (window.innerWidth / 2) - 185, 620);
	      ctx.fillText("- Press F to become immovable!", (window.innerWidth / 2) - 185, 650);
	      ctx.fillText("- Press R to knock your enemies into the air!", (window.innerWidth / 2) - 185, 680);
	      ctx.fillText("- Press Space slap!(sound only)", (window.innerWidth / 2) - 185, 710);
	
	
	    ctx.fillStyle = "#cd7f7f";
	      ctx.font = "normal normal 36px Kaushan Script";
		  	ctx.fillText("Click to Start", (window.innerWidth / 2) - this.start_button.width + 15, 280);
	
	    ctx.fillStyle = "#cd7f7f";
	      ctx.font = "normal normal 36px Kaushan Script";
	      ctx.fillText("Click to Mute", (window.innerWidth / 2) + 30, 280);
	};
	
	Game.prototype.drawEndScreen = function (ctx) {
	  this.elements = [this.restart_button];
			ctx.clearRect(0, 0, window.innerWidth, Game.DIM_Y);
	
			ctx.fillStyle = Game.BG_COLOR;
	  		ctx.fillRect(0, 0, window.innerWidth, Game.DIM_Y);
	
	    ctx.fillStyle = this.restart_button.color;
	      ctx.fillRect((window.innerWidth / 2) - 200, this.restart_button.top, this.restart_button.width, this.restart_button.height);
	
	    ctx.fillStyle = "#0a7e8c";
	      ctx.font = "normal normal 48px Kaushan Script";
	      ctx.fillText("YOU HAVE FALLEN, BUT WITH HONOR.", (window.innerWidth / 2) - 450, 125);
	
	      ctx.fillText("Last Score: " + Math.floor(this.gameTime), (window.innerWidth / 2) - 200, 200);
	      ctx.fillText("High Score: " + Math.floor(this.highScore), (window.innerWidth / 2) - 215, 250);
	
	    ctx.fillStyle = "#cd7f7f";
	      ctx.font = "normal normal 36px Kaushan Script";
	      ctx.fillText("Click to Restart", (window.innerWidth / 2) - 175, 350);
	};
	
	drawBorder = function (ctx) {
	  ctx.beginPath();
	  ctx.arc(100,75,50,0,2*Math.PI);
	  ctx.strokeStyle = "blue";
	  ctx.stroke();
	};
	
	Game.prototype.randomPosition = function () {
	  x = Game.DIM_X * Math.random();
	  y = Game.DIM_Y * Math.random();
	  while (
	    x > window.innerWidth/2 - this.border.radius &&
	    x < window.innerWidth/2 + this.border.radius &&
	    y < window.innerHeight/2 + this.border.radius &&
	    y > window.innerHeight/2 - this.border.radius
	  ) {
	    x = Game.DIM_X * Math.random();
	    y = Game.DIM_Y * Math.random();
	  }
	
	  return [x, y];
	};
	
	Game.prototype.moveObjects = function (delta) {
	  game = this;
	  this.allObjects().forEach(function (object) {
	      object.move(delta);
	      if (game.isOutOfBounds(object.pos)) {
	        game.remove(object);
	        game.add(new Asteroid({ game: game }));
	      }
	  });
	};
	
	Game.prototype.wrap = function (pos) {
	  return [
	    wrap(pos[0], Game.DIM_X), wrap(pos[1], Game.DIM_Y)
	  ];
	
	  function wrap(coord, max) {
	    if (coord < 0) {
	      return max - (coord % max);
	    } else if (coord > max) {
	      return coord % max;
	    } else {
	      return coord;
	    }
	  }
	};
	
	Game.prototype.checkCollisions = function () {
	  var game = this;
	
	  if (typeof this.ships[0] !== 'undefined' && this.ships[0].willCollideWith(this.border)) {
	    game.gameover = true;
	    if (game.gameTime > game.highScore) {
	      game.highScore = game.gameTime;
	    }
	  }
	
	  this.allObjects().forEach(function (obj) {
	    if (this.ships[0].willCollideWith(obj)) {
	      this.ships[0].collideWith(obj);
	    }
	  }.bind(this));
	
	  // this.allObjects().forEach(function (obj1) {
	  //   game.allObjects().forEach(function (obj2) {
	  //     if (obj1 == obj2) {
	  //       return;
	  //     }
	  //     if (obj1.willCollideWith(obj2)) {
	  //       obj1.collideWith(obj2);
	  //     }
	  //   });
	  // });
	};
	
	Game.prototype.remove = function (object) {
	  var idx;
	  if (object instanceof Asteroid) {
	    idx = this.asteroids.indexOf(object);
	    this.asteroids.splice(idx, 1);
	    // this.asteroids[idx] = new Asteroid({ game: this });
	  } else if (object instanceof Ship) {
	    idx = this.ships.indexOf(object);
	    this.ships.splice(idx, 1);
	  }
	};
	
	Game.prototype.reset = function () {
	
	  this.asteroids = [];
	  this.ships = [];
	  this.border = new Border();
	  this.addShip();
	  this.addAsteroids();
	  // this.sound = new Sound();
	};
	
	Game.prototype.isOutOfBounds = function (pos) {
	  return (pos[0] < 0) || (pos[1] < 0) ||
	    (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
	};
	
	Game.MOVES = {
	  "w": [ 0, -0.25],
	  "a": [-0.25,  0],
	  "s": [ 0,  0.25],
	  "d": [ 0.25,  0],
	};
	
	Game.prototype.handleInput = function() {
	  if (this.keys.KEYS.A) {
	    this.ships[0].power(Game.MOVES.a);
	  }
	  if (this.keys.KEYS.S) {
	    this.ships[0].power(Game.MOVES.s);
	  }
	  if (this.keys.KEYS.W) {
	    this.ships[0].power(Game.MOVES.w);
	  }
	  if (this.keys.KEYS.D) {
	    this.ships[0].power(Game.MOVES.d);
	  }
	};
	
	Game.prototype.step = function (delta) {
	  if (this.started === true && this.gameover === false) {
	    this.gameTime += 1;
	  }
	
	  if (this.gameTime > 180) {
	    if (this.gameover === false && this.started === true) {
	      this.handleInput();
	      this.moveObjects(delta);
	      this.checkCollisions();
	    }
	  }
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	var MovingObject = __webpack_require__(4);
	var Ship = __webpack_require__(5);
	var Sound = __webpack_require__(6);
	
	
	var DEFAULTS = {
	  // COLORS: ["red", "lime", "blueviolet"],
	  COLORS: ["blueviolet"],
	  DENSITY: 700,
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
	  // options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
	
	  options.vel = options.vel || Util.attackVec(DEFAULTS.SPEED, options.pos, options.game.ships[0].pos);
	
	  // options.deg = options.vel[4];
	  // this.sound = new Sound();
	  this.sumo = new Image();
	  this.sumo.src = './images/sumo_mad.png';
	  this.growing = false;
	  this.shrinking = false;
	  this.defaultRadius = DEFAULTS.RADIUS;
	  this.slapped = false;
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
	      // if (this.game.ships[0].slapped === false) {
	      //   this.sound.playSlap();
	      // }
	        // setTime(function(){this.game.ships[0].slapped = false;}.bind(this), 2000);
	      // } else {
	      //   sound.playSlap();
	      //   this.game.ships[0].slapped = true;
	      // }
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	var Util = {
	  dir: function (vec) {
	    var norm = Util.norm(vec);
	    return Util.scale(vec, 1 / norm);
	  },
	
	  dist: function (pos1, pos2) {
	    return Math.sqrt(
	      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
	    );
	  },
	
	  norm: function (vec) {
	    return Util.dist([0,0], vec);
	  },
	
	  randomVec: function (length) {
	    // var deg = 2 * Math.PI * Math.random();
	    var deg = 2 * Math.PI * Math.random();
	
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },
	
	  attackVec: function (length, pos, attackPos) {
	    // var deg = 2 * Math.PI * Math.random();
	
	    var x = attackPos[0] - pos[0];
	    var y = attackPos[1] - pos[1];
	
	    var deg;
	    if (x > 0 && y > 0) {
	        deg = Math.atan(x/y);
	    } else if (x > 0 && y < 0) {
	        deg = Math.atan(x/y) - Math.PI;
	    } else if (x < 0 && y > 0) {
	        deg = Math.atan(x/y);
	    } else if (x < 0 && y < 0) {
	        deg = Math.atan(x/y) - Math.PI;
	    }
	
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },
	
	  scale: function (vec, m) {
	    // return [vec[0] * m, vec[1], m];
	    return [vec[0] * m, vec[1] * m , m];
	
	  },
	
	  inherits: function (ChildClass, BaseClass) {
	    function Surrogate () { this.constructor = ChildClass; }
	    Surrogate.prototype = BaseClass.prototype;
	    ChildClass.prototype = new Surrogate();
	  },
	};
	
	module.exports = Util;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	var Asteroid = __webpack_require__(2);
	
	
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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Ship = __webpack_require__(5);
	var MovingObject = __webpack_require__(4);
	var Util = __webpack_require__(3);
	var Sound = __webpack_require__(6);
	
	
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
	  DENSITY: 75,
	  RADIUS: 100,
	  SPEED: 40,
	};
	
	var Ship = function (options) {
	  options.radius = DEFAULTS.RADIUS;
	  options.vel = options.vel || [0, 0];
	  options.density = DEFAULTS.DENSITY;
	  this.sound = new Sound();
	  this.sound.sound.loop = false;
	  this.sound.sound.volume = 0.5;
	  // options.color = options.color || randomColor();
	  options.color = options.color || "fuchsia";
	
	  this.sumo = new Image();
	  this.sumo.src = './images/sumo_regular.png';
	  this.powersDisabled = false;
	  this.slapped = false;
	  this.rage = 0;
	  this.colorDelay = false;
	
	
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
	
	Ship.prototype.powerDensity = function(sound){
	  // if (this.powersDisabled === true) {
	  //   return;
	  // }
	  if (this.rage < 100) {
	    return;
	  }
	  else {
	    sound.playSumoDensity();
	    this.density = 50000;
	    this.mass = Math.PI * Math.pow(this.radius, 2) * this.density;
	    this.vel = [0,0];
	    this.powersDisabled = true;
	    setTimeout(function(){
	      this.density = DEFAULTS.DENSITY;
	      this.mass = Math.PI * Math.pow(this.radius, 2) * this.density;
	    }.bind(this), 2000);
	    setTimeout(function(){
	      this.powersDisabled = false;
	    }.bind(this), 3000);
	    this.rage = 0;
	
	  }
	};
	
	Ship.prototype.powerSmash = function(sound){
	  // if (this.powersDisabled === true) {
	  //   return;
	  // }
	    if (this.rage < 100) {
	      return;
	    }
	
	    else {
	    this.colorDelay = false;
	    sound.playSumoSmash();
	
	    this.game.freezeAsteroids();
	    this.powersDisabled = true;
	    setTimeout(function(){
	      this.game.resetAsteroidsVelocity();
	
	    }.bind(this), 2000);
	    setTimeout(function(){
	      this.powersDisabled = false;
	    }.bind(this), 3000);
	    this.rage = 0;
	  }
	};
	
	Ship.prototype.powerSlap = function (ctx) {
	  ctx.beginPath();
	  var pos = this.game.randomPosition();
	  ctx.arc(pos[0],pos[1],150,0,2*Math.PI);
	  ctx.fillStyle = "blue";
	  ctx.fill();
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
	  if (this.density === DEFAULTS.DENSITY) {
	    this.vel[0] += impulse[0];
	    this.vel[1] += impulse[1];
	    this.speed = Math.hypot(this.vel[0], this.vel[1]);
	    this.deg = Math.asin(this.vel[0] / this.speed);
	  }
	};
	
	Ship.prototype.collideWith = function (otherObject) {
	  if (otherObject.type === "Border") {
	    this.game.remove(this);
	  } else if (otherObject.type === "Asteroid") {
	    this.bounce(otherObject);
	    if (this.rage < 100 && this.powersDisabled === false) {
	      this.rage += 0.5;
	    }
	    // if (this.slapped === false) {
	    //   this.sound.playSlap();
	    //   this.slapped = true;
	    //   setTimeout(function(){
	    //     this.slapped = false;
	    //   }.bind(this), Math.random() * 3000 + 1000);
	    // }
	  }
	};
	
	Ship.prototype.type = "Ship";
	
	module.exports = Ship;


/***/ },
/* 6 */
/***/ function(module, exports) {

	var Sound = function () {
	  this.sound = document.createElement("audio");
	  // this.sound.class = "soundStart";
	  this.sound.autoplay = true;
	  this.sound.volume = 1;
	
	  this.sound.loop = true;
	  // this.sound.controls = false;
	  this.sound.style.display = 'none';
	
	  // this.muted = false;
	  // this.display =  "none";
	  // this.preload = "none";
	  // this.type = "audio/mpeg";
	  // this.volume = 1;
	  // this.muted = false;
	  // this.autoplay = true;
	
	  // this.sound.setAttribute("preload", this.preload);
	  // this.sound.setAttribute("controls", true);
	  // this.sound.setAttribute("type", this.type);
	  // this.sound.setAttribute("class", this.class);
	  // this.sound.setAttribute("volume", this.volume);
	
	  // this.sound.style.top = window.innerHeight / 2 - 200;
	  // this.sound.style.left = window.innerWidth / 2 - 160;
	
	// this.sound.autoplay = true;
	  // this.sound.setAttribute("autoplay", this.autoplay);
	  //
	  // this.sound.style.display = this.display;
	  this.sources = [
	    "sumo-attackme.mov",
	    // "sumo-canthurtme.mov",
	    "sumo-headbutt.mov",
	    // "sumo-smash.mov",
	    "sumo.mp3",
	    "sumo1.mov",
	    "sumo2.mov",
	    "sumo3.mov"
	  ];
	
	  document.body.appendChild(this.sound);
	
	  this.playSlap = function(){
	    this.sound.src = ("./sounds/slap.mp3");
	    this.sound.play();
	  };
	
	  this.playSumo = function(){
	    randSound = this.sources[Math.floor(Math.random() * this.sources.length)];
	    this.sound.src = ("./sounds/" + randSound);
	    // this.sound.src = ("./sounds/sumo.mp3");
	    this.sound.play();
	  };
	
	  this.playSumoSmash = function(){
	    this.sound.src = ("./sounds/sumo-smash.mov");
	    this.sound.play();
	  };
	
	  this.playSumoDensity = function(){
	    this.sound.src = ("./sounds/sumo-canthurtme.mov");
	    this.sound.play();
	  };
	
	  this.stop = function(){
	      this.sound.pause();
	  };
	
	  this.mute = function(){
	    this.sound.volume = 0;
	  };
	
	  this.unmute = function(){
	    this.sound.volume = 1;
	  };
	
	  this.muted = function(){
	    if (this.sound.volume === 0) {
	      return true;
	    } else {
	      return false;
	    }
	  };
	
	  this.playStartScreen = function(){
	    this.sound.src = ("./sounds/cyans_theme.mp3");
	    this.sound.play();
	    // this.sound.volume = 0;
	
	    this.resetAttributes();
	  };
	
	  this.playGame = function(){
	    this.sound.src = ("./sounds/the_veldt.mov");
	    this.sound.play();
	  };
	
	  this.resetAttributes = function(){
	    this.sound.setAttribute("preload", this.preload);
	    this.sound.setAttribute("controls", true);
	    this.sound.setAttribute("type", this.type);
	    this.sound.setAttribute("class", this.class);
	    this.sound.setAttribute("volume", this.volume);
	    this.sound.setAttribute("autoplay", this.autoplay);
	
	
	
	    // this.sound.setAttribute("autoplay", false);
	
	    // this.sound.style.display = this.display;
	  };
	
	  this.resetPosition = function(x, y){
	    this.sound.style.left = x;
	    this.sound.style.top = y;
	  };
	};
	
	  module.exports = Sound;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	var MovingObject = __webpack_require__(4);
	var Ship = __webpack_require__(5);
	
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


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Sound = __webpack_require__(6);
	
	var GameView = function (game, ctx) {
	  this.ctx = ctx;
	  this.game = game;
	  this.ship = this.game.ships[0];
	  this.started = false;
	  this.sound = new Sound();
	  this.sumoSound = new Sound();
	  this.sumoSound.sound.loop = false;
	
	var gameView = this;
	
	  ctx.canvas.addEventListener('click', function(){
	    var x = event.pageX - gameView.ctx.canvas.offsetLeft,
	        y = event.pageY - gameView.ctx.canvas.offsetTop;
	
	    gameView.game.elements.forEach(function(element) {
	      if (y > element.top && y < element.top + element.height &&
	          x > element.left && x < element.left + element.width)
	      { element.action(gameView); }
	    });
	  }, false);
	
	};
	
	GameView.MOVES = {
	  "w": [ 0, -2],
	  "a": [-2,  0],
	  "s": [ 0,  2],
	  "d": [ 2,  0],
	};
	
	GameView.prototype.start = function () {
	  this.game.gameTime = 0;
	  this.bindKeyHandlers();
	  this.lastTime = 0;
	  this.sound.playStartScreen();
	
	  requestAnimationFrame(this.animate.bind(this));
	};
	
	GameView.prototype.bindKeyHandlers = function () {
	  var ship = this.ship;
	  var sumoSound = this.sumoSound;
	
	  // Object.keys(GameView.MOVES).forEach(function (k) {
	  //   var move = GameView.MOVES[k];
	  //   key(k, function () {
	  //     ship.power(move);
	  //   });
	  // });
	
	  key("e", function () {
	    sumoSound.playSumo();
	  });
	
	  key("f", function () {
	    this.game.ships[0].powerDensity(this.sumoSound);
	  }.bind(this));
	
	  key("r", function () {
	    this.game.ships[0].powerSmash(this.sumoSound);
	  }.bind(this));
	
	  key("space", function () {
	    sumoSound.playSlap();
	    // this.game.ships[0].powerSlap(this.ctx);
	  }.bind(this));
	
	};
	
	GameView.prototype.animate = function(time){
	  var timeDelta = time - this.lastTime;
	
	  if (this.game.gameover === true) {
	    return;
	  }
	
	  this.game.step(timeDelta);
	  this.game.draw(this.ctx);
	
	  this.lastTime = time;
	
	  requestAnimationFrame(this.animate.bind(this));
	};
	
	module.exports = GameView;


/***/ },
/* 9 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map