////////////////////////
//CSMA101             //
//Intro to Programming//
//Fall 19             //
//Professor Theohar   //
//Harrison Coutee     //
//818-747-9779        //
////////////////////////

var startX, startY, velX, velY; //ellipse

function setup() {
      createCanvas(400,400);
      background(255);

      //start
      startX = width / 2;
      startY = width / 2;

      //movement
      velX = 5;
      velY = 10;

      //rect
      rectH = 100;
      rectW = 20;
      rectX = 10;
}


function draw() {
      //starting point & movement

      var d = 50;

      startX += velX;
      startY += velY;

      if (startX > width || startX < 0) {
            velX = -velX;
      } else if (startY > height || startY < 0) {
            velY = -velY;
      }

      var rect1xy = [startX, startY];
      var rect2xy = [width-startX-d, height-startY-d];

      if(rect1xy[0] == rect2xy[0] && rect1xy[1] == rect2xy[1]) {
            background(random(0,255),random(0,255),random(0,255));
      }

      if(rect1xy[0] < width/2) {
            fill(255);
            stroke(0);
            rect(rect1xy[0], rect1xy[1], d, d);
      } else if(rect1xy[0] == width/2 || rect1xy[0] == rect1xy[1]) {
            fill(255,0,0);
            stroke(255);
            rect(rect1xy[0], rect1xy[1], d, d);
      } else {
            fill(0);
            stroke(255);
            rect(rect1xy[0], rect1xy[1], d, d);
      }

      if(rect2xy[0] < height/2) {
            fill(255);
            stroke(0);
            rect(rect2xy[0], rect2xy[1], d, d);
      } else if(rect2xy[0] == height/2 || rect2xy[0] == rect2xy[1]) {
            fill(255,0,0);
            stroke(255);
            rect(rect2xy[0], rect2xy[1], d, d);
      } else {
            fill(0);
            stroke(255);
            rect(rect2xy[0], rect2xy[1], d, d);
      }

      rect(rect2xy[0], rect2xy[1], d, d);
}
