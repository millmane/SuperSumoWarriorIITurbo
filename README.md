# Super Sumo Warrior II Turbo

### [Live Link](http://millmane.github.io/SuperSumoWarriorIITurbo/)

Super Sumo Warrior II Turbo is a Javascript game where you control a massive Sumo.  You must hold your ground as an onslaught of angry Sumo try to defeat you.

### How to Play
* Tap W-A-S-D to move the Sumo Warrior.
* Stay within the ring as long as you can while angry Sumos try to push you out
* Beat your high score

## Technical Features

### Collision Detection
* checks by comparing two Sumo's position, velocity, center-to-center distance, and radii.  

  ```
  centerDist = Util.dist(
    [this.pos[0] + this.vel[0],this.pos[1] + this.vel[1]],
    [otherObject.pos[0] + otherObject.vel[0],  otherObject.pos[1] + otherObject.vel[1]]
   );

   return centerDist > (otherObject.radius - this.radius);
   ```
* Bounce - Utilizes elastic collision equations to give collisions a real feel

  ![elastic_collision]

  ```
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
  ```
* Eat - Allows Sumos to absorb each other and grow accordingly
* Destroy - Sumos can remove other Sumos from the game

### Custom Artwork
* Art designed and created by [Robert Kornstein](http://www.rkanimation.com)

* Sumo Warrior - ![sumo_regular]
* Angry Sumo - ![sumo_mad]

## To Do
* DRY and reorganize code
* Add a mute button on start page instead of a control bar
* Add leaderboards
* Other Game Modes

## Future Features
* **Reverse Mode** You are now a small Sumo, while the Angry Sumo are large
* **Sticky Mode** Angry Sumo attach to you on collisions.  This causes restricts your movement
* **Hyper Mode** Angry Sumo no longer bounce away.  They stick to you and continue pushing in whatever directions they were traveling
* **Leader Board** Incorporate a leader board to see how your high score compares to other player's

[elastic_collision]: ./images/elastic_collision.png
[sumo_regular]: ./images/sumo_regular.png
[sumo_mad]: ./images/sumo_mad.png
