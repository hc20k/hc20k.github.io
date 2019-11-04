// pong

// ball
var ballX = 50;
var ballY = 50;
var d = 50;
var dirX = 2;
var dirY = 3;
var shade = [];

// paddle
var rectX;
var rectY;
var rectW = 200;
var rectH = 10;

var started = false;
var score = 0;

function setup() {
      createCanvas(500,500);
}

function draw() {
      background(0);

      ballX += dirX;
      ballY += dirY;

      // bounds detection (bounce)
      if(ballX < 0 || ballX > width) {
            shade = [random(255), random(255), random(255)];
            dirX = -dirX;
      }

      if(ballY < 0 || ballY > height) {
            shade = [random(255), random(255), random(255)];
            dirY = -dirY;
      }

      // lose
      if(ballY > height) {
            // reset
            score = 0;
            ballX, ballY = 0;
            dirX = 3; dirY = 2;
            rectW = 200;
            d = 50;
      }

      // paddle detection (bounce)
      if((ballX > rectX && ballX < rectX+rectW) && (ballY + (d/2)) >= rectY) {
            // increase score
            score++;

            // ball gets faster
            dirX += random(2);
            dirY += random(2);

            // ball gets smaller
            d --;

            dirX *= -1;
            dirY *= -1;

            shade = [random(255), random(255), random(255)];

            if(rectW > 2) {
                  rectW -= 5;
            }
      }

      // draw ball
      fill(shade[0], shade[1], shade[2]);
      ellipse(ballX, ballY, d, d);

      // draw paddle
      fill(shade[0], shade[1], shade[2]);
      rect(rectX,rectY,rectW,rectH);

      // update paddle loc
      if(!started) {
            rectX = width/2;
            rectY = height - 50;
            started = true;
      }

      if(keyIsDown(LEFT_ARROW) && rectX > 0) {
            rectX -= 10;
      }
      if(keyIsDown(RIGHT_ARROW) && rectX < width-rectW) {
            rectX += 10;
      }

      fill(255);
      text("Score: "+score, 10, 25);
}
