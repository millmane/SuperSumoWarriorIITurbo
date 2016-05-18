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
