////////////////////////
//CSMA101             //
//Intro to Programming//
//Fall 19             //
//Professor Theohar   //
//Harrison Coutee     //
//818-747-9779        //
////////////////////////

var sun;
var clouds = [];

function setup() {
      createCanvas(600,600);
      colorMode(HSB, 360);

      // init
      sun =  new Sun(0,height/2,0.5,50);

      for(var i = 0; i < 3; i ++) {
            clouds[i] = new Cloud(random(width), random(height/2), random(100,200));
      }
}

function draw() {
      noStroke();

      //sky bg
      var skyMap = map(sun.y, 0, height/2, 0, 360);
      background(195,360,360-skyMap);

      //draw sun
      sun.draw();
      sun.tick();

      for(var i = 0; i < clouds.length; i ++) {
            clouds[i].brightness = skyMap;
            clouds[i].draw();
            clouds[i].move();
            clouds[i].check();
      }

      //draw ocean
      fill(200, 360, 250);
      rect(0, height/2, width, height/2);
}

function Cloud(x, y, size, brightness = 360) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.brightness = brightness;

      this.spX = random(2,3);

      this.draw = function() {
            fill(360-this.brightness, 250);
            ellipse(this.x, this.y, size,size/3);
      }

      this.move = function() {
            this.x += this.spX;
      }

      this.check = function() {
            if(this.x > width+this.size) {
                  this.x = 0-this.size;
            }
      }
}

function Sun(startX,startY,speed,radius) {
      this.x = startX;
      this.y = startY;
      this.spX = speed;
      this.spY = speed;

      this.radius = radius;

      this.draw = function() {
            fill(54,360,360);
            ellipse(this.x,this.y,radius,radius);

            fill(0);
            textAlign(CENTER);

            // debug shit
            //text(int(this.x)+","+int(this.y), this.x, this.y);
      }

      this.tick = function() {
            //midpoint is (width/2, 0)

            this.x += this.spX;
            this.y -= this.spY;

            this.boundaryCheck();
      }

      this.boundaryCheck = function() {
            if(this.x >= width || this.y >= height-this.radius || this.x < 0 || this.y < 0+this.radius/2) {
                  //this.spX = -this.spX;
                  this.spY = -this.spY;
            }

            // water czech
            if(this.y > height/2) {
                  this.x = startX;
                  this.y = startY;

                  //start over
                  this.spY = -this.spY;
            }
      }
}
