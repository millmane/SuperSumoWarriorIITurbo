var Asteroid = require('./asteroid');
var Ship = require("./ship");
var Border = require("./border");
var Sound = require('./sound');
var Util = require("./utils");


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
  this.addShip();
  this.addAsteroids();
  // this.sound = new Sound();
};

Game.prototype.isOutOfBounds = function (pos) {
  return (pos[0] < 0) || (pos[1] < 0) ||
    (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
};

module.exports = Game;
