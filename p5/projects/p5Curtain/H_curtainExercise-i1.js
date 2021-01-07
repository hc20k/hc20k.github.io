////////////////////////
//CSMA101             //
//Intro to Programming//
//Fall 19             //
//Professor Theohar   //
//Harrison Coutee     //
//818-747-9779        //
////////////////////////

var img1;
var img2;
var img3;
var img4;

var totalCircles;
var x,y;
var desiredColor;
var c;

function preload() {
      img1 = loadImage("/projects/p5Curtain/data/space.jpg");
      img2 = loadImage("/projects/p5Curtain/data/space2.jpg");
      img3 = loadImage("/projects/p5Curtain/data/grad.jpg");
      img4 = loadImage("/projects/p5Curtain/data/grad2.png");
}

function setup() {
      createCanvas(602, 400);
      background(50);

      img1.loadPixels();
      img2.loadPixels();
      img3.loadPixels();

      // init
      totalCircles = 50;
      y = 0;
      c = 1;
}

function draw() {
      // set circle size (totalCircles)
      var circleSize = width/totalCircles;

      // draw circles
      var currentCircle = 0;

      // size is proportional to width
      while(currentCircle < totalCircles) {
            x = currentCircle * circleSize;

            var desiredColor1 = getColor1();
            var desiredColor2 = getColor2();
            var desiredColor3 = getColor3();
            var desiredColor4 = getColor4();

            switch(c) {
                  case -1:
                        fill(desiredColor1);
                        break;
                  case 0:
                        fill(desiredColor2);
                        break;
                  case 1:
                        fill(desiredColor3);
                        break;
                  case 2:
                        fill(desiredColor4);
                        break;
                  default:
                        fill(desiredColor3);
                        break;
            }


            var randomNum = floor(randomGaussian(-3,3));

            noStroke();

            translate(random(-40,40),random(-40,40));
            rotate(radians(random(-10, 10)));

            triangle(x,y,x+randomNum,y+randomNum,x+10,x+10);

            currentCircle++;
      }

      y = y + circleSize;

      if(y > height) {
            totalCircles = random(200, 400);
            c += 1;
            if(c > 2) {
                  c = -1;
            }
            y = 0;
      }

}


function getColor1() {
      return img1.get(floor(x),floor(y));;
}

function getColor2() {
      return img2.get(floor(x),floor(y));;
}

function getColor3() {
      return img3.get(floor(x),floor(y));;
}

function getColor4() {
      return img4.get(floor(x),floor(y));;
}
