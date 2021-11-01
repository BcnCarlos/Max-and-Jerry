

const canvas = document.getElementById('canvas2');
const ctx = canvas.getContext('2d');


canvas.width = 1024;
canvas.height = 768;


// Make sure the image is loaded first otherwise nothing will draw.

let background = false;
let backgroundImage = new Image();
backgroundImage.onload = function () {
  background = true;
};
backgroundImage.src = "./pics/Barcelona-Tile.jpg";



// Max 
let maxDraw = false;
let maxImage = new Image();
  maxImage.onload = function () {
    maxDraw = true;
};
  maxImage.src = "./pics/Max-head-round-96.png";

let max = {
    speed: 400,
    x: 240,
    y: 380
  };  


// Handle keyboard controls
let keysDown = {};
// Check for keys pressed where key represents the keycode captured
addEventListener("keydown", function (key) {
  keysDown[key.keyCode] = true;
}, false);
addEventListener("keyup", function (key) {
  delete keysDown[key.keyCode];
}, false);


  // Controls
let update = function (modifier) {
    if (38 in keysDown) { 
      max.y -= max.speed * modifier;
      if (max.y < 0) {
        max.y = 0;
        }
    }
    if (40 in keysDown) { 
      max.y += max.speed * modifier;
      if (max.y >= 690) {
        max.y = 690;
        }
    }
    if (37 in keysDown) { 
      max.x -= max.speed * modifier;
      if (max.x <= 0) {
        max.x = 0;
        }
    }
    if (39 in keysDown) { 
      max.x += max.speed * modifier;
      if (max.x >= 980) {
        max.x = (canvas.width-max.x);
        }
    }
}







  var draw = function () {
    if (background) {
      ctx.drawImage(backgroundImage, 0, 0);
    }
    if (maxDraw) {
      ctx.drawImage(maxImage, max.x, max.y, 60, 120);
    }
    
    };  



  let main = function () {
    update(0.02);
    draw();
    requestAnimationFrame(main);
  };
  
  main();














