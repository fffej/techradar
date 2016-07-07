//This is the title for your window tab, and your Radar
document.title = "Redgate Technology Radar (July 2016)";


var radar_arcs = [
                   {r:100, name: 'JFDI'}     // well proven, safe choice
                  ,{r:200, name: 'Validate'} // worked on small example, known good, does it meet our needs?
                  ,{r:300, name: 'Explore'}  // new ideas on the periphery we should investigate and assess 
                  ,{r:400, name: 'Kill'}     // in the past a JFDI, but not suitable for any new projects
                 ];

//This is your raw data
//
// Key
//
// movement:
//   t = moved
//   c = stayed put
//
// blipSize: 
//  intValue; This is optional, if you omit this property, then your blip will be size 70.
//            This give you the ability to be able to indicate information by blip size too
//
// url:
// StringValue : This is optional, If you add it then your blips will be clickable to some URL
//
// pc: polar coordinates
//     r = distance away from origin ('radial coordinate')
//     - Each level is 100 points away from origin
//     t = angle of the point from origin ('angular coordinate')
//     - 0 degrees is due east
//
// Coarse-grained quadrants
// - Techniques: elements of a software development process, such as experience design; and ways of structuring software, such micro-services.
// - Tools: components, such as databases, software development tools, such as versions control systems; or more generic categories of tools, such as the notion of polyglot persistance.
// - Platforms: things that we build software on top of: mobile technologies like Android, virtual platforms like the JVM, or generic kinds of platforms like hybrid clouds
// - Programming Languages and Frameworks
//
// Rings:
// - Adopt: blips you should be using now; proven and mature for use
// - Trial: blips ready for use, but not as completely proven as those in the adopt ring; use on a trial basis, to decide whether they should be part of your toolkit
// - Assess: things that you should look at closely, but not necessarily trial yet - unless you think they would be a particularly good fit for you
// - Hold: things that are getting attention in the industry, but not ready for use; sometimes they are not mature enough yet, sometimes they are irredeemably flawed
//      Note: there's no 'avoid' ring, but throw things in the hold ring that people shouldn't use.

var h = 1000;
var w = 1200;

var makeCoords = function(depth, angle) {
  return {
    'r': depth,
    't': angle
  };
}

var Quadrants = {
  Languages:  0,
  Techniques: 90,
  Tools:      180,
  Platforms:  270
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

var element = function(name, depth, baseAngle, percentageAngle, url) {
  var result = {
    name: name,
    pc:   makeCoords(depth,baseAngle + (90 * percentageAngle / 100))
  };

  if (url) {
    result['url'] = url;
  }

  return result;
}

var techniques = function(name,depth,position,url) {
  return element(name, depth, Quadrants.Techniques, position, url);
};

var languages = function(name,depth,position,url) {
  return element(name, depth, Quadrants.Languages, position, url);
};

var tools = function(name,depth,position,url) {
  return element(name, depth, Quadrants.Tools, position, url);
};

var platforms = function(name,depth,position,url) {
  return element(name, depth, Quadrants.Platforms, position, url);
};

var radar_data = [
    {
        quadrant: 'Techniques',
        left : 45,
        top : 18,
        color : '#8FA227',
        items : [ 
            {name:'Git flow / Pull Requests ^', pc: { r: 230, t: 133 }, movement: 'c' },
            {name:'Valuable, cheap tests', pc:{'r':130,'t':150},movement:'c'},
            {name:'Sacrificial Architecture', pc:{'r':80,'t':100},movement:'c'},   
            {name:'Sensible defaults', pc:{'r':80,'t':150},movement:'c'},   
            {name:'Dependency Injection', pc:{'r':80,'t':130},movement:'c'},   
            {name:'Coding architects', pc:{'r':90,'t':170},movement:'c'}
        ]
    },
    {
        quadrant: 'Libraries',
        left: w-200+30,
        top : 18,
        color : '#587486',
        items : [ 
            { name: 'Docker', pc: { r: 170, t: 19 }, movement: 't' },
            { name: 'bind',    pc: { r: 150, t: 69 },    movement: 'c' },
            { name: 'Appium',    pc: { r: 110, t: 70 },    movement: 'c',    domain: 'mobile, front-end' }, 
            { name: 'Android Studio',    pc: { r: 180, t: 66 },    movement: 'c',    domain: 'mobile, dev' },

            { name: 'Hip Chat',    pc: { r: 280, t: 78 },    movement: 'c' },
            { name: 'Trello',    pc: { r: 260, t: 75 },    movement: 'c' },
            { name: 'Charles HTTP Proxy',    pc: { r: 260, t: 48 },    movement: 'c' },
            { name: 'Xamarin', pc: { r: 280, t: 51 }, movement: 'c' },
            { name: 'Android Annotations',    pc: { r: 280, t: 25 },    movement: 'c' },
            { name: 'GenyMotion',    pc: { r: 210, t: 31 },    movement: 'c' },
            
            { name: 'haproxy',    pc: { r: 80, t: 46 },    movement: 'c' },
        ]
    },
    {
        quadrant: 'Tools', 
        left :45,
        top : (h/2 + 18),
        color : '#DC6F1D',
        items : [
            // Adopt
            { name: 'GitHub', pc: { r: 30,t: 260 }, movement: 'c'},
            { name: 'TeamCity', pc: { r: 30, t: 230 }, movement: 'c'},
            { name: 'Slack', pc: { r: 50, t: 200 }, movement: 'c'},
            // Validate

            // Kill
//            { name: 'VM_Automation', pc: {r: 350, t: 200 }, movement: 'c'}
        ]
    },
    {
        quadrant: 'Languages & Frameworks',
        color : '#B70062',
        left  : (w-200+30),
        top :   (h/2 + 18),
        items : [
            // Adopt
            { name: 'C#', pc: { r: 60, t: 290 },  movement: 'c' },
            { name: '.NET 4.5', pc: { r: 30, t: 310 },  movement: 'c' },
            { name: 'JavaScript', pc: { r: 60, t: 330 }, movement: 'c'},
            // Validate
            { name: 'TypeScript', pc: { r: 160, t: 300 }, movement: 'c'},
            // Explore
            { name: '.NET CORE', pc: { r: 260, t: 320 }, movement: 'c'},
            // Kill
            { name: 'WinForms', pc: { r: 360, t: 320 }, movement: 'c'}
        ]
    }
];
