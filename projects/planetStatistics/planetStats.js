////////////////////////
//CSMA101             //
//Intro to Programming//
//Fall 19             //
//Professor Theohar   //
//Harrison Coutee     //
//818-747-9779        //
////////////////////////

var planetsTable; // table

var names = [];
var diameters = [];
var dfs = [];
var hues = [];
var brightness = [];

function preload() {
      planetsTable = loadTable("/projects/planetStatistics/PlanetsDist.csv");
}

function setup() {

      createCanvas(1000,500);
      colorMode(HSB, 360, 100, 100);

      // load planet data
      for (var i = 0; i < planetsTable.getRowCount()-1; i ++) {
            names[i] = planetsTable.getString(i+1,0);
            diameters[i] = planetsTable.getNum(i+1,1)/850; //scale diameters
            dfs[i] = planetsTable.getNum(i+1,2)/10;
            hues[i] = planetsTable.getNum(i+1,3);
            brightness[i] = planetsTable.getNum(i+1,4);
      }
}

function draw() {

      background(0);

      for(var i = 0; i < width; i ++) {
          fill(255);
          ellipse(i, random(width), 2);
      }

      // sun is x = 0

      fill(36,58,97);
      ellipse(0-height/3,height/2,height,height);

      fill(255);
      textSize(15);
      textAlign(CENTER);
      text("Hover your mouse over a planet for more information.",width/2,height-10);

      for (var i = 0; i < planetsTable.getRowCount()-1; i++) {
            fill(0);
            strokeWeight(1);
            fill(hues[i], brightness[i], 80);
            var prevD = 0;

            if(i > 0) {
                prevD = diameters[i-1];
            }

            var x = dfs[i]+prevD+width/3;
            console.log(names[i]+": "+prevD);

            ellipse(x, height/2, diameters[i]);


            if(dist(mouseX,mouseY,x,height/2) <= diameters[i]/2) {
                textSize(20);
                textAlign(CENTER);
                fill(0);
                rect(width/2-150, height-75,width,50);
                fill(hues[i], brightness[i]-40, 80);
                text(names[i],width/2, height-50);

                //show stats and planet name
                var realD = diameters[i]*850;
                fill(0);
                rect(x-150, height-485,width,50);
                fill(hues[i], brightness[i]-40, 80);
                text("Diameter: "+realD.toLocaleString()+" km\n"+int(dfs[i]*1000000).toLocaleString()+" km away from sun",x, height-465);
            }
      }
}
