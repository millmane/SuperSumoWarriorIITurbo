var Asteroid = require('./asteroid');
var Ship = require("./ship");
var Border = require("./border");
var Sound = require('./sound');


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
