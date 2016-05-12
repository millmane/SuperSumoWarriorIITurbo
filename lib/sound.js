var Sound = function () {
  this.sound = document.createElement("audio");
  this.display =  "none";
  this.preload = "none";

  this.sound.setAttribute("preload", this.preload);
  this.sound.setAttribute("controls", true);
  this.sound.style.display = this.display;
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
  };
  this.playGame = function(){
    this.sound.src = ("./sounds/the_veldt.mov");
    this.sound.play();
  };
};

  module.exports = Sound;
