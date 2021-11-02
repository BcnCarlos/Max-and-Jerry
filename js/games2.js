
const canvas = document.getElementById('canvas2');
const ctx = canvas.getContext('2d');


canvas.width = 1024;
canvas.height = 768;


let background = false;
let backgroundImage = new Image();
backgroundImage.onload = function () {
  background = true;
};
backgroundImage.src = "./pics/Barcelona-Tile.jpg";



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
function update(modifier) {
    if (38 in keysDown) { 
      max.y -= max.speed * modifier;
      if (max.y < 0) {
        max.y = 0;
        }
    }
    if (40 in keysDown) { 
      max.y += max.speed * modifier;
      if (max.y >= 660) {
        max.y = 660;
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
      if (max.x >= 960) {
        max.x = 960;

        }
    }

    

}


//bones

let boneicon = new Image();
boneicon.src = "./pics/Bone.png"

let noOfBones = 4;

let bone = []

for (let i = 0; i< noOfBones; i++){

    let x = Math.floor(Math.random() * canvas.width);
    let y = Math.floor(Math.random() * canvas.height);

    bone[i] = new Bones(x,y);

}


function Bones(x, y){

this.x = x;
this.y = y;

    this.fall = function (){
    
        this.y = this.y+1;
    
        if (this.y > canvas.height) {
        this.y =0; 
        }

    }

    this.show = function(){

        ctx.drawImage(boneicon, this.x, this.y, 108, 108);
    }
    

}



// tennis balls 

let ballicon = new Image()
ballicon.src = "./pics/tennis-ball.png"

let noOfBalls = 8

let ball= []

for (let i = 0; i< noOfBalls; i++){

    let x = Math.floor(Math.random() * canvas.width);
    let y = Math.floor(Math.random() * canvas.height);

    ball[i] = new TennisBalls(x,y);

}


function TennisBalls(x, y){

    this.x = x;
    this.y = y;
    
    
    this.fall = function (){
    
    this.y = this.y+1;
    
    if (this.y > canvas.height){
        this.y =0;
    }
    
    }
    
    this.show = function(){
    ctx.drawImage(ballicon, this.x, this.y, 108, 108);
    
    }
    
    }


function draw() {

   if (background) {
      ctx.drawImage(backgroundImage, 0, 0);
    }

    if (maxDraw) {
      ctx.drawImage(maxImage, max.x, max.y, 60, 120);

      for (let i =0; i<noOfBones; i++){

        bone[i].show();
        bone[i].fall();
      }

      for (let i= 0; i < noOfBalls; i++){

        ball[i].show();
        ball[i].fall();
        }
    }
    
    };  



function updategame(){
    update(0.02);
    draw();
    requestAnimationFrame(updategame);
};
  
updategame();














