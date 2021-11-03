
const canvas = document.getElementById("canvas2");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 768;

// prepare to draw background 

let background = false;
let backgroundImage = new Image();
backgroundImage.onload = function () {
  background = true;
};
backgroundImage.src = "./pics/Barcelona-Tile.jpg";

// prepare to draw Max

let maxDraw = false;

let maxImage = new Image();
maxImage.src = "./pics/Max-head-round-96.png";


maxImage.onload = function () {
  maxDraw = true;
};


class Player {

constructor(speed, x, y, width, height, boneScore, ballScore, countdown ){
  this.speed = speed
  this.x = x
  this.y = y
  this.width = width
  this.height = height
  this.boneScore = boneScore
  this.ballScore = ballScore
  this.countdown =  countdown
} 
}


let max = new Player (400, 240, 380, 60, 120, 0, 0, 60000)
  


// Keys Down or Up

let keysDown = { };

addEventListener(
  "keydown",
  function (key) {
    keysDown[key.keyCode] = true;
  },
  false
);

addEventListener(
  "keyup",
  function (key) {
    delete keysDown[key.keyCode];
  },
  false
);

// Keyboard Controls for Player Max

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



// Let the Bones fall!

class Bones {

  constructor (x, y) {

  this.x = x;
  this.y = y;
  this.width = 108;
  this.height = 108;
  }

  fall() {

    this.y = this.y + 1;

    if (this.y > canvas.height) {
      this.y = 0;
    }
  };

  show() {
    ctx.drawImage(boneicon, this.x, this.y, this.width, this.height);
  };
}

// Create bones objects

let boneicon = new Image();
boneicon.src = "./pics/Bone.png";

let noOfBones = 4;



let bone = [];

for (let i = 0; i < noOfBones; i++) {
  let x = Math.floor(Math.random() * canvas.width);
  let y = Math.floor(Math.random() * canvas.height);

  bone[i] = new Bones(x, y);
}




// What to do with the tennis balls

class TennisBalls {

  constructor (x, y ){
  this.x = x;
  this.y = y;
  this.width = 108;
  this.height = 108;
  }


  fall() {
    this.y = this.y + 1;

    if (this.y > canvas.height) {
      this.y = 0;
    }
  };

  show() {
    ctx.drawImage(ballicon, this.x, this.y, this.width, this.height);
  };
}

// Create ball objects

let ballicon = new Image();
ballicon.src = "./pics/tennis-ball.png";

let noOfBalls = 8;

let ball = [];

for (let i = 0; i < noOfBalls; i++) {
  let x = Math.floor(Math.random() * canvas.width);
  let y = Math.floor(Math.random() * canvas.height);

  ball[i] = new TennisBalls(x, y);
}


// Draw the game and check for collisions

function draw() {
  
  // Draw Background
  if (background) {
    ctx.drawImage(backgroundImage, 0, 0);
  }

  // Draw Max

  if (maxDraw) {
    ctx.font = "bold 48px Comic Sans MS";
    ctx.fillStyle = "purple";
    ctx.fillText(`Balls: ${max.ballScore}`, 40, 50);
    ctx.fillText(`Bones: ${max.boneScore}`, 300, 50);

    ctx.drawImage(maxImage, max.x, max.y, max.width, max.height);

    // Draw the Bones and check for collisions

    for (let i = 0; i < noOfBones; i++) {
      bone[i].show();
      bone[i].fall();

      // Check for collisions of the balls and Max and increment Scores

      dist = Math.sqrt(
        (bone[i].x - max.x) * (bone[i].x - max.x) +
          (bone[i].y - max.y) * (bone[i].y - max.y)
      );

      if (dist <= 50) {
        max.boneScore += 1;
        
        bone[i].x = Math.random() * (canvas.width - bone[i].width);
        bone[i].y = canvas.height;
      }
    }

    // Draw the Balls and Check for collisions

    for (let i = 0; i < noOfBalls; i++) {
      ball[i].show();
      ball[i].fall();

      // Check for collisions of the balls and Max

      dist = Math.sqrt(
        (ball[i].x - max.x) * (ball[i].x - max.x) +
          (ball[i].y - max.y) * (ball[i].y - max.y)
      );

      if (dist <= 50) {
        max.ballScore += 1;
        let audio = new Audio("./pics/Dog_Bark_Sound_Effect.mp3")
        audio.play();
        ball[i].x = Math.random() * (canvas.width - ball[i].width);
        ball[i].y = canvas.height;
      }
    }
  }
}

function gameStart() {
  keyStrokes(0.02);
  draw();
  requestAnimationFrame(gameStart);
}

gameStart(),


  setInterval(() => {
    window.location.assign(
      "https://bcncarlos.github.io/Max-and-Jerry-/over.html"
    );
  }, max.countdown);
