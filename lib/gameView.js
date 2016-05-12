var Sound = require('./sound');

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
