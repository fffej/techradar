document.title = "Red Gate Technology Radar (straw man edition)";

var radar_arcs = [
                   {'r':100,'name':'JFDI'}     // well proven, safe choice
                  ,{'r':200,'name':'Validate'} // worked on small example, known good, does it meet our needs?
                  ,{'r':300,'name':'Explore'}  // new ideas on the periphery we should investigate and assess 
                  ,{'r':400,'name':'Kill'}     // in the past a JFDI, but not suitable for any new projects
                 ];

//This is your raw data
//
// Key
// url:
// StringValue : This is optional, If you add it then your blips will be clickable to some URL
//
// pc: polar coordinates
//   r = distance away from origin ("radial coordinate")
//     - Each level is 100 points away from origin
//     t = angle of the point from origin ("angular coordinate")
//     - 0 degrees is due east
//
// Coarse-grained quadrants
// - Engineering Practices
// - Technology Stack
// - Operations

var h = 1160;
var w = 1200;

var makeCoords = function(depth, angle) {
  return {
    "r": depth,
    "t": angle
  };
}

var Quadrants = {
  Engineering: 270,
  Technology: 30,
  Operations: 150
};

var offset = function(base) {
  return function(ness) { return base + (100 - ness/100*100); };
};

var jfdi = function(ness) {
  return offset(0)(ness);
};

var validate = function(ness) {
  return offset(100)(ness);
};

var explore = function(ness) {
  return offset(200)(ness);
};

var kill = function(ness) {
  return offset(300)(ness);
};

var element = function(name, depth, angle, url) {
  var result = {
    "name": name,
    "pc":   makeCoords(depth,angle)
  };

  if (url) {
    result["url"] = url;
  }

  return result;
}

var engineering = function(name,depth,position,url) {
  return element(name, depth, Quadrants.Engineering + position, url);
};

var technology = function(name,depth,position,url) {
  return element(name, depth, Quadrants.Technology + position, url);
};

var operations = function(name,depth,position,url) {
  return element(name, depth, Quadrants.Operations + position, url);
};

var radar_data = [
    { "quadrant": "Engineering Practices",
        "left" : 45,
        "top" : 18,
        "color" : "#8FA227",
        "items" : [ 
          engineering("Marker #1", explore(50), 0),
          engineering("Marker #2", explore(50), 120)
        ]
    },
    { "quadrant": "Technology Stack", 
        "left": w-200+30,
        "top" : 18,
        "color" : "#587486",
        "items" : [ 
          technology("Marker #3", jfdi(0), 120), 
          technology("Marker #4", jfdi(0), 0) 
        ]
    },
    { "quadrant": "Operations", 
        "left" :45,
         "top" : (h/2 + 18),
        "color" : "#DC6F1D",
        "items" : [
          operations("Marker #5", explore(100), 120),
          operations("Marker #6", explore(100), 0)
        ]
    }
];
