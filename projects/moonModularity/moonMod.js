////////////////////////
//CSMA101             //
//Intro to Programming//
//Fall 19             //
//Professor Theohar   //
//Harrison Coutee     //
//818-747-9779        //
////////////////////////

/* NOT AN ACCURATE DEPICTION OF THE SOLAR SYSTEM (lol) */

var _score = 0;

var moon, earth;
var moon2, moon3;
var mouseMoon;

var earthImg;

var earthHealth = 100;
var streak = 0;
var longestStreak = 0;

function setup() {
      createCanvas(600,500);
      background(0);

      earthImg = loadImage("/projects/moonModularity/data/earth.png", function() {
            console.log("Loaded pic");
      }, function() {
            console.log("Failed to Load pic");
      });

      earth = new Earth(200, 8);

      // function Moon(scale = 20, orbitDistance = 10, speed, tint = [255, 255, 255])
      moon = new Moon(75, 1);
      moon2 = new Moon(50, 2, [0, 0, 255]);
      moon3 = new Moon(25, 3, [255, 0, 0]);

      mouseMoon = new Moon(75, 3, [255, 0, 0]);
  }

function draw() {

      background(0);

      if (earthHealth <= 0) {
          // L
          textSize(30);
          fill(255,0,0);
          textAlign(CENTER);
          text("You Lose!\nScore: "+_score+"\nLongest Streak: "+longestStreak+"\nReload to play again!",width/2,height/2);
          return;
      }

      randomStars(10);

      earth.draw();

      moon2.draw();
      moon2.move();
      moon2.bounce();

      moon3.draw();
      moon3.move();
      moon3.bounce();

      moon.draw();
      moon.move();
      moon.bounce();

      mouseMoon.draw();
      mouseMoon.x = mouseX;
      mouseMoon.y = mouseY;

      fill(255);
      textSize(14);
      textAlign(LEFT);
      text('Earth Health: '+earthHealth+'%', 10+textSize(), 10+textSize());
      text('Score: '+score(), 10+textSize(), 30+textSize());

      if(streak >= 5) {
          fill(100,100,255);
          text('Streak: '+streak, 10+textSize(), 50+textSize());
          fill(255);
      }

      textAlign(CENTER);
      text('Objective: Use your mouse to destroy the moons and stop them\n from hitting the earth!', width/2, height-50)
}

function score() {
    if(frameCount % 60 == 0) {
        _score++;
    }
    return _score;
}

function randomStars(count) {
      stroke(255);
      strokeWeight(3);
      for(var i = 0; i < count; i++) {
            point(random(width),random(height));
      }
}

function Earth(scale = 50, speed = 8) {
      this.scale = scale;
      this.darkness = 0;
      this.speed = speed;
      this.earthScale = this.scale+75;

      this.redness = 0;

      var startX = width/2 - scale*2;
      this.x = startX;

      this.draw = function() {
            noStroke();
            image(earthImg,width/2-(this.earthScale/2)+100,height/2-(this.earthScale/2),this.earthScale,this.earthScale);

            fill(255,0,0,this.redness);
            ellipse(width/2+100, height/2, this.earthScale);

            fill(0,0,0,this.darkness);
            ellipse(width/2+100, height/2, this.earthScale);
      }
}

function Moon(scale = 20, speed, tint = [255, 255, 255]) {

      this.scale = scale;

      this.x = 0-this.scale;
      this.y = random(0,height);

      this.spX = speed;
      this.spY = 0;

      this.draw = function() {
            noStroke();
            fill(0,0,0,100);
            ellipse(this.x-scale/2,this.y,this.scale); //shadow

            stroke(255,255,255);
            fill(255, 254, 204);
            ellipse(this.x,this.y,this.scale); //outside

            fill(237, 230, 149);
            stroke(191, 184, 90);
            strokeWeight(this.scale/50);
            ellipse(this.x-this.scale/6,this.y-this.scale/7,this.scale/3); //crater 1
            fill(224, 218, 141);

            noStroke();
            stroke(207, 200, 112);
            strokeWeight(this.scale/40);
            noFill();
            arc(this.x-this.scale/6, this.y-this.scale/7, this.scale/3, this.scale/3, 50,PI+QUARTER_PI); //lil shadow

            noStroke();
            fill(207, 200, 112);
            ellipse(this.x+this.scale/15,this.y+this.scale/5,this.scale/5); //crater 2

            fill(184, 177, 88);
            ellipse(this.x+this.scale/4,this.y-this.scale/40,this.scale/6); //crater 3

            fill(184, 177, 88);
            ellipse(this.x-this.scale/5,this.y+this.scale/5,this.scale/10); //crater 3

            strokeWeight(2)

            // tint
            fill(tint[0],tint[1],tint[2],100)
            ellipse(this.x,this.y,this.scale+3); //outside

            // cover moon
            var distanceToEarth = (dist(this.x,this.y,width/2+100,height/2));
            if(distanceToEarth > 255) { distanceToEarth = 255; } else if (distanceToEarth < 0) { distanceToEarth = 0; }

            fill(0,distanceToEarth-50);
            earth.darkness = 255-distanceToEarth-25;
            ellipse(this.x,this.y,this.scale+3); //outside
      }

      this.move = function() {
            this.x += this.spX;
            this.y += this.spY;
      }

      this.bounce = function() {
            if(this.x > width+this.scale) {
                this.reset();
            }

            if(mouseMoon) {
                if(this != mouseMoon && dist(this.x, this.y, width/2+100, height/2) < this.scale+100) {
                    earth.redness += 15;
                    streak = 0;
                    earthHealth = int(100-earth.redness/255*100);
                    this.reset();
                }

                if(dist(this.x, this.y, mouseMoon.x, mouseMoon.y) < this.scale) {
                    this.x = 0-this.scale;
                    this.y = random(0,height-this.scale);
                    this.spX += random(0.1,0.2);
                    if(mouseMoon.scale > 40) {
                        mouseMoon.scale -= 0.5;
                    }
                    streak++;
                    if(streak > longestStreak) {
                        longestStreak = streak;
                    }
                    _score += 10;
                }
            }
      }

      this.reset = function() {
          this.x = 0-this.scale;
          this.y = random(0,height-this.scale);
          this.spX = speed;
          this.spY = 0;
      }

      this.isCollided = function(otherX, otherY) {
            return (dist(this.x, this.y, otherX, otherY) <= 100);
      }
}
