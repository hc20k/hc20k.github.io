////////////////////////
//CSMA101             //
//Intro to Programming//
//Fall 19             //
//Professor Theohar   //
//Harrison Coutee     //
//818-747-9779        //
////////////////////////

var startX, startY, velX, velY; //ellipse

var blockSize = 30;
var ellipseCount = 10;

function setup() {
      createCanvas(1000,1000);
      background(0);

      //start
      startX = width / 2;
      startY = width / 2;

      //movement
      velX = 5;
      velY = 8;

      //rect
      rectH = 100;
      rectW = 20;
      rectX = 10;
}


function draw() {
      //starting point & movement
      //background(0);

      startX += velX;
      startY += velY;

      if (startX > width || startX < 0) {
            velX = -velX;
      } else if (startY > height || startY < 0) {
            velY = -velY;
      }

      blockSize = map(abs(height/3-mouseY), startX, 0, startY, 5, 40);
      ellipseCount = map(abs(width/3-mouseX), startX, 0, startY, 5, 40);

      strokeWeight(0);
      fill((startX/width)*255,(startY/height)*255,startX/2*startY/2)
      stroke(255-((startX/width)*255), 255-((startY/height)*255), 255-(startX/2*startY/2))

      for(var i = 0; i < ellipseCount; i++) {
            var rStartX = startX-random(blockSize/2);
            var rStartY = startY-random(blockSize/2);
            ellipse(rStartX, rStartY, 10, 10);
      }
}
