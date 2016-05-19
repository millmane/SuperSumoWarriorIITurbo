var Sound = require('./sound');

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

  Object.keys(GameView.MOVES).forEach(function (k) {
    var move = GameView.MOVES[k];
    key(k, function () { ship.power(move);});
  });

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
