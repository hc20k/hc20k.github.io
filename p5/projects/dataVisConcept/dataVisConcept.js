////////////////////////
//CSMA101             //
//Intro to Programming//
//Fall 19             //
//Professor Theohar   //
//Harrison Coutee     //
//818-747-9779        //
////////////////////////

// Needs to be hosted on a server.... cors...

// Bug: User can navigate outside of skybox, Not sure how to fix.

// Data is prefetched from the last.fm api.
// ISO-3166 names are from https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes
// Lat / Long data is from https://github.com/albertyw/avenews/blob/master/old/data/average-latitude-longitude-countries.csv

let productSans;

var earthModel;
var earthTex;
var earthTexN;
var earth;

var skybox;

var iso3166;
var latLongTable;

var countryIndex = 1; //skip first row (header)
var showingTopArtist = true;

var mostPopularArtist;
var mostPopularTrack;

var isLoaded = false;

/* debug */
var debugX = 0;
var debugY = 0;
var debugZ = 0;
var debugPoints = [];
var debugIndex = 1;
var debugHideEarth = false;
/* debug end */

var camera__;

// data
var artistsData = {};
var tracksData = {};
var nightMode = false;

p5.disableFriendlyErrors = true; //performance?

function preload() {

      //loadTable(filename,options,[callback],[errorCallback])
      iso3166 = loadTable("assets/iso3166.csv",'csv',function() {
            console.log("Loaded ISO 3166 Countries. Fetching Data...");
            fetchLastFM();
      }, function() {
            //Error
            document.getElementById("loading_text").innerHTML = "Failed to load ISO 3166 Data!";
            return;
      });

      latLongTable = loadTable("assets/latlon.csv",'csv',function() {
            console.log("Loaded Latitude and Longitude Data.");
      }, function() {
            //Error
            document.getElementById("loading_text").innerHTML = "Failed to load Lat/Lon Data!";
            return;
      });

      productSans = loadFont("assets/productsansreg.ttf"); // thanks https://befonts.com/product-sans-font.html
      earthModel = loadModel("models/earth.obj",true); // thanks https://free3d.com/3d-model/earth-photorealistic-2k-927613.html
      earthTex = loadImage("models/tex/earth/Diffuse_2K.png");
      earthTexN = loadImage("models/tex/earth/Night_lights_2K.png");

      skybox = loadImage("assets/skybox.png");
}

function setup() {
      // pre-prereq
      angleMode(DEGREES)
      createCanvas(windowWidth, windowHeight,WEBGL);
      textFont(productSans);
      textAlign(CENTER, CENTER);
      ellipseMode(CENTER);

      // TITAN RTX required (jk) ........ unless
      setAttributes('perPixelLighting', true);
      setAttributes('antialias', true);
      smooth();

      camera__ = this._renderer._curCamera;
}

function draw() {

      isLoaded = true;

      document.getElementById("mpar").innerHTML = mostPopularArtist;
      document.getElementById("mpt").innerHTML = mostPopularTrack;

      if(showingTopArtist == true) {
            document.getElementById("mpar").setAttribute("style","color:orange;");
            document.getElementById("mpt").setAttribute("style","color:white;");
      } else {
            document.getElementById("mpt").setAttribute("style","color:orange;");
            document.getElementById("mpar").setAttribute("style","color:white;");
      }

      //hide loading text
      document.getElementById("loading_text").hidden = true;

      //update html
      var selectedCountryName = latLongTable.getString(countryIndex, 1);
      var sTA =  "N/A";
      var sTT =  "N/A";

      if(isDefined(artistsData[selectedCountryName])) {
            sTA = artistsData[selectedCountryName][0]["name"];
      }
      if(isDefined(tracksData[selectedCountryName])) {
            sTT = tracksData[selectedCountryName][0]["artist"]["name"]+" - "+tracksData[selectedCountryName][0]["name"]; 
      }

      document.getElementById("current-country").innerHTML = "&#8226; " + selectedCountryName;
      document.getElementById("current-ta").innerHTML = `Top Artist: ${sTA}`;
      document.getElementById("current-tt").innerHTML = `Top Track: ${sTT}`;

      // instructions
      var instructionString = (showingTopArtist == true) ? "top tracks" : "top artists";
      document.getElementById("toggle-instruction").innerHTML = `Press T to visualize ${instructionString}.`;
      document.getElementById("loading_text").hidden = true;

      // prereq
      orbitControl(2,2);
      background(0x0);
      noStroke();

      // skybox
      texture(skybox);
      box(3000);

      // lighting
      specularMaterial(255);
      shininess(255);
      ambientLight(255);

      // lil animation
      if(frameCount < 40) {
            scale(map(frameCount,0,40,0,3));
      } else {
            scale(3);
      }

      texture((nightMode == false) ? earthTex : earthTexN);

      push();
            // lil animation
            if(frameCount < 40) {
                  rotateY(Math.pow(frameCount,2));
            } else {
                  rotateY(frameCount*0.01);
            }

            //tint(255,100); uncomment for transparency (debug)
            push();

            //rotation offset (bc points are off by a lil)
            rotateX(3);
            rotateY(-98);

            if(debugHideEarth == false) {
                  model(earthModel); //draw earth
            }
            pop();

            fill(255);

            stroke(255,0,0);
            strokeWeight(10);
            textSize(3);

            for (var i = 1; i < latLongTable.getRowCount(); i++) {
                  textSize(3);

                  var name = latLongTable.getString(i, 1);

                  // pick name from data. if data exists put a point.
                  var tt = "n/a";
                  var ta = "n/a";

                  // https://xkcd.com/1513/
                  if(isDefined(artistsData[name])) {
                        ta = artistsData[name][0]["name"];
                  }
                  if(isDefined(tracksData[name])) {
                        tt = tracksData[name][0]["name"];  
                  }

                  if(showingTopArtist == true) {               
                        stroke(0,255,0);
                        fill(0,255,0);
                        if(ta == mostPopularArtist) {
                              textSize(5);
                              fill(255, 147, 84)
                        }
                        name = ta;
                  } else {
                        stroke(0,255,0);
                        fill(0,255,0);
                        if(mostPopularTrack.includes(tt)) // yikes
                        {
                              textSize(5);
                              fill(255, 147, 84)
                        }
                        name = tt;
                  }

                  //adaptation from java (thanks CodingTrain) (https://github.com/CodingTrain/website/blob/master/CodingChallenges/CC_058_EarthQuakeViz3D/Processing/CC_058_EarthQuakeViz3D/CC_058_EarthQuakeViz3D.pde)
                  var lon = latLongTable.getNum(i, 3);
                  var lat = latLongTable.getNum(i,2);
                  var theta = radians(lat);
                  var phi = radians(lon) + PI;

                  var r = 100 + 4; //lil radius offset of 4, so points are not clipping into the earth
                  var x = r * Math.cos(theta) * Math.cos(phi);
                  var y = -r * Math.sin(theta);
                  var z = -r * Math.cos(theta) * Math.sin(phi);

                  if(countryIndex == i) {
                        // is showing this countries info.
                        stroke(255,255,0);
                        strokeWeight(30);
                  } else {
                        strokeWeight(10);
                  }

                  // probably could be better 
                  if(ta == "n/a" && tt == "n/a") {
                        name = "";
                        strokeWeight(3);
                        stroke(255,0,0);
                  }

                  point(x,y,z); // country point

                  var cameraRotationY = map(camera__.eyeY/TWO_PI, -760, 760, -360, 360); // text follows camera on y

                  push();
                        translate(x, y, z);
                        rotateY(atan2(x,z)); // took two years to figure this out
                        rotateX(-cameraRotationY);
                        text(name,0,0);
                  pop();
            }
      pop();
}

function windowResized() {
      resizeCanvas(windowWidth, windowHeight);
}

function keyPressed(obj) {
      if(!isLoaded) { return; }

      if(keyCode === RIGHT_ARROW && countryIndex < latLongTable.getRowCount()-1) {
            countryIndex ++;
      }
      if(keyCode === LEFT_ARROW && countryIndex > 1) {
            countryIndex --;
      } 
}

function keyTyped() {
      if(!isLoaded) { return; }

      if(key === 't')
            showingTopArtist = !showingTopArtist;

      if(key === 'n')
            nightMode = !nightMode; //easter egg
}

// json shtuff

function fetchLastFM() {

      var topArtistOverall = [];
      var topTrackOverall = [];

      for (var i = 1; i < iso3166.getRowCount(); i++) {
            //top artists
            var currentCountry = iso3166.getString(i,0);

            $.ajax({
                  url:"prefetched/topartists/"+currentCountry+".json",
                  type: 'get',
                  dataType: 'json',
                  async: false,
                  success: function(data) {
                        if(data["error"] || !data || !data["topartists"]) { // does !data also cover undefined? idk
                              console.error(`Error fetching top artists for ${currentCountry}: ${data["message"]}`);
                        } else {
                              artistsData[currentCountry] = data["topartists"]["artist"];
                              topArtistOverall.push(data["topartists"]["artist"][0]["name"]);
                        }
                  }
            });

            $.ajax({
                  url:"prefetched/toptracks/"+currentCountry+".json",
                  type: 'get',
                  dataType: 'json',
                  async: false,
                  success: function(data) {
                        if(data["error"] || !data || !data["tracks"]) {
                              console.error(`Error fetching top tracks for ${currentCountry}: ${data["message"]}`);
                        } else {
                              tracksData[currentCountry] = data["tracks"]["track"];
                              var tname = data["tracks"]["track"][0]["name"];
                              var aname = data["tracks"]["track"][0]["artist"]["name"];
                              topTrackOverall.push(`${aname} - ${tname}`);
                        }
                  }
            });

            document.getElementById("loading_text").innerHTML = `Success.`;
      }

      // find top artist and top track
      mostPopularArtist = mode(topArtistOverall);
      mostPopularTrack = mode(topTrackOverall);
}

// https://stackoverflow.com/a/20762713
function mode(arr){
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop();
}

function isDefined(obj) {
      return (typeof obj !== "undefined" && typeof obj !== undefined && obj && (typeof obj).toString() != "undefined"); // pretend this doesnt exist
}