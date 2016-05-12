var Game = require("./game");
var GameView = require("./gameView");
var Sound = require('./sound');

document.addEventListener("DOMContentLoaded", function(){
  var gameCanvas = document.getElementById("game-canvas");
  var sound = new Sound();
  // var bgCanvas = document.getElementById("background-canvas");
  gameCanvas.width = Game.DIM_X;
  gameCanvas.height = Game.DIM_Y;

  var gameCtx = gameCanvas.getContext("2d");
  // var bgCtx = bgCanvas.getContext("2d");
  var game = new Game();
  new GameView(game, gameCtx).start();

});
