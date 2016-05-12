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
	var GameView = __webpack_require__(2);
	var Sound = __webpack_require__(8);
	
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

	var Asteroid = __webpack_require__(3);
	var Ship = __webpack_require__(5);
	var Border = __webpack_require__(7);
	var Sound = __webpack_require__(8);
	
	
	var Game = function () {
	  this.asteroids = [];
	  this.ships = [];
	  this.border = new Border();
	  this.addAsteroids();
	  this.addShip();
	  this.gameover = false;
	  this.started = false;
	  // this.sound = new Sound();
	  // this.sumoSound = new Sound();
	  this.elements = [];
	  this.gameTime = 0;
	  this.highScore = 0;
	
	  this.elements.push({
	  colour: '#a64040',
	  width: 250,
	  height: 75,
	  top: 230,
	  left: (window.innerWidth / 2) - 160
	  });
	
	  this.elements.push({
	  colour: '#a64040',
	  width: 290,
	  height: 75,
	  top: 300,
	  left: (window.innerWidth / 2) - 200
	  });
	
	};
	
	Game.BG_COLOR = "#fad5a6";
	Game.DIM_X = window.innerWidth;
	Game.DIM_Y = window.innerHeight;
	Game.NUM_ASTEROIDS = 70;
	
	Game.prototype.add = function (object) {
	  if (object.type === "Asteroid") {
	    this.asteroids.push(object);
	  } else if (object.type === "Ship") {
	    this.ships.push(object);
	  } else if (object.type === "Border") {
	
	  }
	
	};
	
	Game.prototype.addAsteroids = function () {
	  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
	    this.add(new Asteroid({ game: this }));
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
	  // this.add(border);
	  return border;
	};
	
	Game.prototype.allObjects = function () {
	  return [].concat(this.asteroids, this.ships);
	};
	
	Game.prototype.draw = function (ctx) {
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	    if (this.gameover === false) {
	      if (this.started === true){
	        if (this.gameTime < 180) {
	          ctx.clearRect(0, 0, window.innerWidth, Game.DIM_Y);
	          ctx.fillStyle = Game.BG_COLOR;
	          ctx.fillRect(0, 0, window.innerWidth, Game.DIM_Y);
	          ctx.fillStyle = "#0a7e8c";
	            ctx.font = "normal normal 72px Kaushan Script";
	            ctx.fillText(3 - Math.floor(this.gameTime/60), (window.innerWidth / 2) - 50, window.innerHeight / 2);
	
	            ctx.font = "normal normal 48px Kaushan Script";
	            ctx.fillText("Directions", 35, 50);
	            ctx.font = "normal normal 24px Kaushan Script";
	            ctx.fillText("__________________", 15, 52);
	            ctx.fillText("- W,A,S,D to move", 25, 80);
	            ctx.fillText("- Stay within the ring", 25, 110);
	            ctx.fillText("- Press E to show your might!", 25, 140);
	
	
	
	        } else {
	          ctx.clearRect(0, 0, window.innerWidth, Game.DIM_Y);
	          ctx.fillStyle = Game.BG_COLOR;
	          ctx.fillRect(0, 0, window.innerWidth, Game.DIM_Y);
	
	          ctx.fillStyle = "#0a7e8c";
	            ctx.font = "normal normal 48px Kaushan Script";
	            ctx.fillText("Score: " + Math.floor(this.gameTime), (window.innerWidth / 2) - 100, 70);
	
	            ctx.font = "normal normal 48px Kaushan Script";
	            ctx.fillText("Directions", 35, 50);
	            ctx.font = "normal normal 24px Kaushan Script";
	            ctx.fillText("__________________", 15, 52);
	            ctx.fillText("- W,A,S,D to move", 25, 80);
	            ctx.fillText("- Stay within the ring", 25, 110);
	            ctx.fillText("- Press E to show your might!", 25, 140);
	
	
	
	
	
	          this.allObjects().forEach(function (object){
	            object.draw(ctx);
	          });
	
	          this.border.draw(ctx);
	        }
	      } else {
	        this.drawStartScreen(ctx);
	
	      }
	    } else {
	      this.drawEndScreen(ctx);
	      // this.reset();
	    }
	};
	
	Game.prototype.drawStartScreen = function (ctx) {
	  // ctx.clearRect(0, 0, window.innerWidth, Game.DIM_Y);
	  // ctx.fillStyle = "blue";
	  // ctx.fillRect(0, 0, window.innerWidth, Game.DIM_Y);
	  {
			ctx.clearRect(0, 0, window.innerWidth, Game.DIM_Y);
			ctx.fillStyle = Game.BG_COLOR;
			ctx.fillRect(0, 0, window.innerWidth, Game.DIM_Y);
			// ctx.drawImage(this.background,bgX,bgY);
		  // 	ctx.drawImage(this.background,bgX2,bgY);
		  // 	if (bgX > 600) {
			//     	bgX = -1000;
			//   	}
		  // 	if (bgX2 > 600) {
		  //   	bgX2 = -1000;
		  //   }
		  // 	bgX += 4;
		  // 	bgX2 += 4;
	
	    // -------------------
	    var elem = ctx.canvas,
	        elemLeft = elem.offsetLeft,
	        elemTop = elem.offsetTop,
	        context = ctx;
	        // elements = [];
	
	    // Add event listener for `click` events.
	    // elem.addEventListener('click', function(event) {
	    //
	    //
	    // var x = event.pageX - elemLeft,
	    //     y = event.pageY - elemTop;
	    //
	    // // Collision detection between clicked offset and element.
	    // elements.forEach(function(element) {
	    //     if (y > element.top && y < element.top + element.height
	    //         && x > element.left && x < element.left + element.width) {
	    //         alert('clicked an element');
	    //     }
	    // });
	    //
	    // }, false);
	    //
	    // this.elements.push({
	    // colour: '#a64040',
	    // width: 300,
	    // height: 100,
	    // top: 220,
	    // left: (window.innerWidth / 2) - 160
	    // });
	    //
	    // // Render elements.
	    // this.elements.forEach(function(element){
	    //
	    //   context.fillStyle = element.colour;
	    //   context.fillRect(element.left, element.top, element.width, element.height);
	    // });
	      context.fillStyle = this.elements[0].colour;
	      context.fillRect((window.innerWidth / 2) - 135, this.elements[0].top, this.elements[0].width, this.elements[0].height);
	    // -------------------
	
			ctx.fillStyle = "#0a7e8c";
	    // font-family: 'Kaushan Script', cursive;
	    ctx.font = "48px Kaushan Script";
	
		  	// ctx.font = "normal normal 60px Herculanum";
		  	ctx.fillText("SUPER SUMO WARRIOR II TURBO", (window.innerWidth / 2) - 400, 125);
	
	      ctx.font = "normal normal 30px Kaushan Script";
		  	ctx.fillText("Enter the ring and TEST YOUR MIGHT!", (window.innerWidth / 2) - 275, 180);
	
	      ctx.font = "normal normal 48px Kaushan Script";
	      ctx.fillText("Directions", (window.innerWidth / 2) - 110, 390);
	      ctx.font = "normal normal 24px Kaushan Script";
	      ctx.fillText("____________________", (window.innerWidth / 2) - 145, 397);
	      ctx.fillText("- W,A,S,D to move", (window.innerWidth / 2) - 110, 425);
	      ctx.fillText("- Stay within the ring", (window.innerWidth / 2) - 120, 455);
	      ctx.fillText("- Press E to show your might!", (window.innerWidth / 2) - 155, 485);
		  	// ctx.fillText("TEST YOUR MIGHT!", (window.innerWidth / 2) - 460, 225);
	      ctx.fillStyle = "#cd7f7f";
	      ctx.font = "normal normal 36px Kaushan Script";
	
		  	ctx.fillText("Click to start", (window.innerWidth / 2) - 110, 280);
	
	
		}
	};
	
	
	Game.prototype.drawEndScreen = function (ctx) {
	
	  var elem = ctx.canvas,
	      elemLeft = elem.offsetLeft,
	      elemTop = elem.offsetTop,
	      context = ctx;
	
	  // ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  // ctx.fillStyle = "blue";
	  // ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  {
			ctx.clearRect(0, 0, window.innerWidth, Game.DIM_Y);
			ctx.fillStyle = Game.BG_COLOR;
			ctx.fillRect(0, 0, window.innerWidth, Game.DIM_Y);
			// ctx.drawImage(this.background,bgX,bgY);
		  // 	ctx.drawImage(this.background,bgX2,bgY);
		  // 	if (bgX > 600) {
			//     	bgX = -1000;
			//   	}
		  // 	if (bgX2 > 600) {
		  //   	bgX2 = -1000;
		  //   }
		  // 	bgX += 4;
		  // 	bgX2 += 4;
	
	
	      // this.elements.push({
	      // colour: '#a64040',
	      // width: 350,
	      // height: 75,
	      // top: 235,
	      // left: (window.innerWidth / 2) - 200
	      // });
	      //
	      // // Render elements.
	
	      context.fillStyle = this.elements[1].colour;
	      context.fillRect((window.innerWidth / 2) - 200, this.elements[1].top, this.elements[1].width, this.elements[1].height);
	
	      ctx.fillStyle = "#0a7e8c";
	        ctx.font = "normal normal 48px Kaushan Script";
	        ctx.fillText("YOU HAVE FALLEN, BUT WITH HONOR.", (window.innerWidth / 2) - 450, 125);
	
	        ctx.fillText("Last Score: " + Math.floor(this.gameTime), (window.innerWidth / 2) - 200, 200);
	        ctx.fillText("High Score: " + Math.floor(this.highScore), (window.innerWidth / 2) - 215, 250);
	
	        ctx.fillStyle = "#cd7f7f";
	        ctx.font = "normal normal 36px Kaushan Script";
	        ctx.fillText("Click to Restart", (window.innerWidth / 2) - 175, 350);
	
		}
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
	
	  this.allObjects().forEach(function (obj1) {
	    game.allObjects().forEach(function (obj2) {
	      if (obj1 == obj2) {
	        return;
	      }
	      if (obj1.willCollideWith(obj2)) {
	        obj1.collideWith(obj2);
	      }
	    });
	  });
	};
	
	Game.prototype.step = function (delta) {
	  if (this.started === true && this.gameover === false) {
	    this.gameTime += 1;
	  }
	
	  if (this.gameTime > 180) {
	    if (this.gameover === false && this.started === true) {
	      this.moveObjects(delta);
	      this.checkCollisions();
	    }
	  }
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
	  this.addAsteroids();
	  this.addShip();
	  // this.sound = new Sound();
	};
	
	Game.prototype.isOutOfBounds = function (pos) {
	  return (pos[0] < 0) || (pos[1] < 0) ||
	    (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
	};
	
	
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Sound = __webpack_require__(8);
	
	var GameView = function (game, ctx) {
	  this.ctx = ctx;
	  this.game = game;
	  this.ship = this.game.ships[0];
	  this.started = false;
	  this.sound = new Sound();
	  this.sumoSound = new Sound();
	  this.sumoSound.class = "soundSumo";
	  // this.sound.display = "flex";
	  this.sound.class = "soundStart";
	  // this.sound.autoplay = true;
	  this.sound.volume = 0;
	
	  this.sound.resetAttributes();
	  this.sumoSound.resetAttributes();
	
	  this.sound.playStartScreen();
	  // -------------------
	
	
	// var elem = this.ctx.canvas,
	//     elemLeft = elem.offsetLeft,
	//     elemTop = elem.offsetTop,
	//     context = this.ctx,
	//     elements = [];
	//
	// // Add event listener for `click` events.
	// elem.addEventListener('click', function(event) {
	// var x = event.pageX - elemLeft,
	//     y = event.pageY - elemTop;
	//
	// // Collision detection between clicked offset and element.
	// elements.forEach(function(element) {
	//     if (y > element.top && y < element.top + element.height
	//         && x > element.left && x < element.left + element.width) {
	//         alert('clicked an element');
	//     }
	// });
	//
	// }, false);
	//
	// // Add element.
	// elements.push({
	// colour: '#05EFFF',
	// width: 150,
	// height: 100,
	// top: 200,
	// left: 150
	// });
	//
	// // Render elements.
	// elements.forEach(function(element){
	//
	//   context.fillStyle = element.colour;
	//   context.fillRect(element.left, element.top, element.width, element.height);
	//   debugger
	// });
	
	// -------------------
	// var elem = ctx.canvas,
	//     elemLeft = elem.offsetLeft,
	//     elemTop = elem.offsetTop,
	//     context = ctx,
	//     elements = [];
	
	var gameView = this;
	
	  ctx.canvas.addEventListener('click', function(){
	  //
	    var x = event.pageX - gameView.ctx.canvas.offsetLeft,
	        y = event.pageY - gameView.ctx.canvas.offsetTop;
	  //
	  //   // Collision detection between clicked offset and element.
	    // gameView.game.elements.forEach(function(element) {
	  //       // if (y > element.top && y < element.top + element.height
	  //       //     && x > element.left && x < element.left + element.width) {
	            if (gameView.game.started === false) {
	              if (y > gameView.game.elements[0].top && y < gameView.game.elements[0].top + gameView.game.elements[0].height
	                  && x > gameView.game.elements[0].left && x < gameView.game.elements[0].left + gameView.game.elements[0].width)
	                  {
	                    gameView.sound.stop();
	                    gameView.sound.class = "soundGame";
	                    gameView.sound.resetAttributes();
	                    gameView.game.started = true;
	
	                    gameView.sound.playGame();
	                  }
	            } else if (gameView.game.started === true && gameView.game.gameover === true) {
	              if (y > gameView.game.elements[1].top && y < gameView.game.elements[1].top + gameView.game.elements[1].height
	                  && x > gameView.game.elements[1].left && x < gameView.game.elements[1].left + gameView.game.elements[1].width)
	                {
	                  gameView.game.started = false;
	                  gameView.game.gameover = false;
	                  gameView.sound.class = "soundStart";
	                  gameView.sound.resetAttributes();
	                  gameView.game.reset();
	                  gameView.ship = gameView.game.ships[0];
	
	                  gameView.start();
	                  gameView.sound.stop();
	
	                  gameView.sound.playStartScreen();
	                }
	              }
	      // }
	    }, false);
	
	    // elements.push({
	    // colour: '#a64040',
	    // width: 300,
	    // height: 100,
	    // top: 220,
	    // left: (window.innerWidth / 2) - 160
	    // });
	
	    // Render elements.
	    // elements.forEach(function(element){
	    //
	    //   context.fillStyle = element.colour;
	    //   context.fillRect(element.left, element.top, element.width, element.height);
	    // });
	
	
	  // }.bind(this));
	// };
	};
	GameView.MOVES = {
	  "w": [ 0, -1],
	  "a": [-1,  0],
	  "s": [ 0,  1],
	  "d": [ 1,  0],
	};
	
	GameView.prototype.start = function () {
	  this.game.gameTime = 0;
	
	    this.bindKeyHandlers();
	    this.lastTime = 0;
	
	    //every call to animate requests causes another call to animate
	    requestAnimationFrame(this.animate.bind(this));
	
	  // window.setInterval(this.game.moveObjects.bind(this.game), 20, 10);
	  // window.setInterval(this.game.step.bind(this.game), 20, 10);
	  //
	  // window.setInterval(this.game.draw.bind(this.game), 20, this.ctx);
	
	};
	
	GameView.prototype.bindKeyHandlers = function () {
	  var ship = this.ship;
	  var sumoSound = this.sumoSound;
	
	  Object.keys(GameView.MOVES).forEach(function (k) {
	    var move = GameView.MOVES[k];
	    key(k, function () { ship.power(move);});
	  });
	
	  // key("space", function () { ship.fireBullet() ;});
	  key("e", function () {
	    sumoSound.playSumo();
	  });
	
	};
	
	GameView.prototype.animate = function(time){
	    var timeDelta = time - this.lastTime;
	
	    this.game.step(timeDelta);
	    this.game.draw(this.ctx);
	    this.sound.resetPosition(this.ctx.canvas.top + 1000, this.ctx.canvas.left + 100);
	
	
	    this.lastTime = time;
	
	if (this.game.gameover === true) {
	  this.sound.class = "soundEnd";
	  this.sound.resetAttributes();
	  return;
	}
	    //every call to animate requests causes another call to animate
	    requestAnimationFrame(this.animate.bind(this));
	  };
	// };
	module.exports = GameView;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(6);
	var MovingObject = __webpack_require__(4);
	var Ship = __webpack_require__(5);
	var Sound = __webpack_require__(8);
	
	
	var DEFAULTS = {
	  // COLORS: ["red", "lime", "blueviolet"],
	  COLORS: ["blueviolet"],
	  DENSITY: 350,
	  RADIUS: 10,
	  SPEED: 10,
	};
	
	var Asteroid = function (options = {}) {
	  randColor = DEFAULTS.COLORS[Math.floor(Math.random() * DEFAULTS.COLORS.length)];
	  options.color = randColor;
	  options.density = DEFAULTS.DENSITY;
	  options.pos = options.pos || options.game.randomPosition();
	  // options.radius = DEFAULTS.RADIUS;
	  options.radius = randomRadius();
	  // options.speed = DEFAULTS.SPEED;
	  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
	  // options.deg = options.vel[4];
	  // this.sound = new Sound();
	  this.sumo = new Image();
	  this.sumo.src = './images/sumo_mad.png';
	
	  MovingObject.call(this, options);
	};
	
	
	randomRadius = function () {
	  return (DEFAULTS.RADIUS) * Math.random() + DEFAULTS.RADIUS;
	};
	
	Util.inherits(Asteroid, MovingObject);
	
	Asteroid.prototype.draw = function (ctx) {
	  ctx.drawImage(this.sumo, this.pos[0] - this.radius, this.pos[1] - this.radius, this.radius*2, this.radius*2);
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(6);
	var Asteroid = __webpack_require__(3);
	
	
	var MovingObject = function (options) {
	  this.pos = options.pos;
	  this.vel = options.vel;
	  // this.speed = this.vel[2];
	  // this.speed = Math.hypot(this.vel[0], this.vel[1]);
	  // this.deg = this.vel[3];
	  // this.deg = Math.asin(this.vel[0] / this.speed);
	  this.radius = options.radius;
	  this.color = options.color;
	  this.density = options.density;
	  this.mass = Math.PI * Math.pow(this.radius, 2) * this.density; // area * density = mass
	  this.game = options.game;
	};
	
	MovingObject.prototype.draw = function (ctx) {
	  ctx.fillStyle = this.color;
	
	  ctx.beginPath();
	  ctx.arc(
	    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
	  );
	  ctx.fill();
	};
	
	// MovingObject.prototype.move = function (delta) {
	//   this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
	//   this.pos = this.game.wrap(this.pos);
	//
	//   // if (this.game.isOutOfBounds(this.pos)) {
	//   //   if (this.isWrappable) {
	//   //     this.pos = this.game.wrap(this.pos);
	//   //   } else {
	//   //     this.remove();
	//   //   }
	//   // }
	// };
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
	var Util = __webpack_require__(6);
	
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
	  this.sumo.src = './images/sumo_regular.png';
	
	
	
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


/***/ },
/* 6 */
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
	    var deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length, deg);
	  },
	
	  scale: function (vec, m) {
	    // return [vec[0] * m, vec[1], m];
	    return [vec[0] * m, vec[1]];
	
	  },
	
	  inherits: function (ChildClass, BaseClass) {
	    function Surrogate () { this.constructor = ChildClass; }
	    Surrogate.prototype = BaseClass.prototype;
	    ChildClass.prototype = new Surrogate();
	  },
	};
	
	module.exports = Util;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(6);
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
/***/ function(module, exports) {

	var Sound = function () {
	  this.sound = document.createElement("audio");
	  this.class = "soundStart";
	  // this.display =  "none";
	  this.preload = "none";
	  this.type = "audio/mpeg";
	  this.volume = 0;
	  // this.autoplay = true;
	
	  this.sound.setAttribute("preload", this.preload);
	  this.sound.setAttribute("controls", true);
	  this.sound.setAttribute("type", this.type);
	  this.sound.setAttribute("class", this.class);
	  this.sound.setAttribute("volume", this.volume);
	
	  // this.sound.style.top = window.innerHeight / 2 - 200;
	  // this.sound.style.left = window.innerWidth / 2 - 160;
	
	
	  // this.sound.setAttribute("autoplay", this.autoplay);
	
	  // this.sound.style.display = this.display;
	  this.sources = [
	    "sumo-attackme.mov",
	    "sumo-canthurtme.mov",
	    "sumo-headbutt.mov",
	    "sumo-smash.mov",
	    "sumo.mp3",
	    "sumo1.mov",
	    "sumo2.mov",
	    "sumo3.mov"
	  ];
	  document.body.appendChild(this.sound);
	  this.playSumo = function(){
	    randSound = this.sources[Math.floor(Math.random() * this.sources.length)];
	    this.sound.src = ("./sounds/" + randSound);
	    // this.sound.src = ("./sounds/sumo.mp3");
	    this.sound.play();
	  };
	  this.stop = function(){
	      this.sound.pause();
	  };
	  this.playStartScreen = function(){
	    this.sound.src = ("./sounds/cyans_theme.mp3");
	    this.sound.play();
	    this.sound.volume = 0;
	
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
	    // this.sound.setAttribute("autoplay", this.autoplay);
	
	
	
	    // this.sound.setAttribute("autoplay", false);
	
	    // this.sound.style.display = this.display;
	  };
	
	  this.resetPosition = function(x, y){
	    this.sound.style.left = x;
	    this.sound.style.top = y;
	  };
	};
	
	  module.exports = Sound;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map