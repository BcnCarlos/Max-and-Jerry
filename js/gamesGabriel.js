
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


// Configure Max 

let maxDraw = false;

let maxImage = new Image();
  maxImage.onload = function () {
    maxDraw = true;
  };

  maxImage.src = "./pics/Jerry-head-round-96.png";

let max = {
    speed: 400,
    x: 240,
    y: 380,
    width: 60,
    height: 120,
  };  




// Keys movements  for Max 
let keysDown = {};

addEventListener("keydown", function (key) {
  keysDown[key.keyCode] = true;
}, false);
addEventListener("keyup", function (key) {
  delete keysDown[key.keyCode];
}, false);


  // Controls
function keyStrokes(modifier) {
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


// Create bones objects 

let boneicon = new Image();
boneicon.src = "./pics/Bone.png"

let noOfBones = 4;

let bone = []

for (let i = 0; i< noOfBones; i++){

    let x = Math.floor(Math.random() * canvas.width);
    let y = Math.floor(Math.random() * canvas.height);

    bone[i] = new Bones(x,y);
}

// Let the Bones fall! 

function Bones(x, y){

this.x = x;
this.y = y;
this.width = 108;
this.height = 108;
//this.opacity = 0;


    this.fall = function (){
    
        this.y = this.y+1;
    
        if (this.y > canvas.height) {
            this.y =0; 
        }

    }

    this.show = function(){

        ctx.drawImage(boneicon, this.x, this.y, this.width, this.height)

    }


    

}

// Let the Balls  fall! 

let ballicon = new Image()
ballicon.src = "./pics/tennis-ball.png"

let noOfBalls = 6

let ball= []

for (let i = 0; i< noOfBalls; i++){

    let x = Math.floor(Math.random() * canvas.width);
    let y = Math.floor(Math.random() * canvas.height);

    ball[i] = new TennisBalls(x,y);

}


// What to do with the tennis balls

function TennisBalls(x, y){

    this.x = x;
    this.y = y;
    this.width = 108;
    this.height = 108;
    
    
    this.fall = function (){
    
    this.y = this.y+1;
    
    if (this.y > canvas.height){
        this.y =0;
    }
    
    }
    
    this.show = function(){
    ctx.drawImage(ballicon, this.x, this.y, this.width, this.height);
    
    }
    
    }




// Draw the game and check for collisions   

function draw() {

   if (background) {
      ctx.drawImage(backgroundImage, 0, 0);
    }

    if (maxDraw) {


      ctx.drawImage(maxImage, max.x, max.y, max.width, max.height);
      
    }


    

    for (let i =0; i<noOfBones; i++){

        bone[i].show();
        bone[i].fall();


        if ( (max.x && max.y) == (bone[i].x && bone[i].y) )
        
        {

           
            
            console.log("CRASH");    
      
              bone[i].x = Math.random() * (canvas.width - bone[i].width);
              bone[i].y = canvas.height;
          
          
      
          }




    }

    for (let i= 0; i < noOfBalls; i++){

        ball[i].show();
        ball[i].fall();



//identify the distances between the cat and the dog every 5 millisecond or every time the frame updates
  dist = Math.sqrt((ball[i].x - max.x)*(ball[i].x - max.x) + (ball[i].y - max.y)*(ball[i].y - max.y));

console.log(dist)


        /*
        if ( max.x + max.width  >= ball[i].x + ball[i].width &&
            
            max.y + max.height > ball[i].y &&

            max.y < ball[i].y + ball[i].height &&

            max.x <= ball[i].x + ball[i].width &&

            max.y + max.height > ball[i].y &&

            max.y < ball[i].y + ball.height
            
            ) 

            */



        if(dist <= 50) 
        {

           
            
            console.log("CRASH");    
      
              ball[i].x = Math.random() * (canvas.width - ball[i].width);
              ball[i].y = canvas.height;
          
          
      
          }





      }



    };  

    




function gameStart(){
  keyStrokes(0.02);
    draw();



    requestAnimationFrame(gameStart);
};
  
gameStart();














