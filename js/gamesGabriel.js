
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

  maxImage.src = "./pics/Max-head-round-96.png";

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

    }
    


 //   console.log(`MAX X, ${max.x}, MAX Y, ${max.y}`) 

   console.log(`MAX X, ${max.x}, MAX Y, ${max.y}`) 

    console.log( `BONE 0 X, ${bone[0].x}, BONE 0 Y, ${bone[0].y}`)

    console.log( `BONE 1 X, ${bone[1].x}, BONE 1 Y, ${bone[1].y}` )

    console.log( `BONE 2 X, ${bone[2].x}, BONE 2 Y, ${bone[2].y}` )

    console.log( `BONE 3 X, ${bone[3].x}, BONE 3 Y, ${bone[3].y}` )

    /*
    bone.forEach((b, index)=> {


      if ( (max.x && max.y) == (bone[0].x && bone[0].y)   ) {

        bone.splice(index, 1)


      }



    })

    */

    if ( (max.x && max.y) == (bone[0].x && bone[0].y) ){

      //ctx.clearRect(bone[0].x, bone[0].y, bone[0].x + bone[0].width , bone[0].y + bone[0].height );

      //ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      //let index = 0 
      //bone.shift(0)
      
      console.log("CRASH")    

      
      
        bone[0].shift();
        bone[0].y.shift();
        bone[0].width.shift();
        bone[0].height.shit();
        //track++;

    
      
      
      
      
      //bone[0].opacity = 0;

      //canvas.renderAll();

      //ctx.clearRect(0,0,canvas.width ,canvas.height);



      //bone[0].show 

      //bone[0].width = 108
      //bone[0].height = 108   


      //bone[0].fall
      


      //ctx.clearRect(0,0,canvas.width ,canvas.height);
 

  

    }




    };  

    




function gameStart(){
  keyStrokes(0.02);
    draw();



    requestAnimationFrame(gameStart);
};
  
gameStart();














