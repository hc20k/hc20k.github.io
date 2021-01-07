function setup() {
  createCanvas(500, 500);
  background(0);
}

function draw() {}

function mouseDragged() {
  noStroke();

  //brush 1

  let rgb = random(255);

  fill(rgb,rgb,rgb);
  stroke(random(255),25,25);
  strokeWeight(2);

  triangle(mouseX-20+random(30), mouseY+25+random(30), mouseX+8+random(30), mouseY-30+random(30), mouseX+36+random(30), mouseY+25+random(30));
  

  //brush 2


}
