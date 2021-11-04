//Define the Canvas

class Player {
  constructor(speed, x, y, width, height, boneScore, ballScore, countdown) {
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.boneScore = boneScore;
    this.ballScore = ballScore;
    this.countdown = countdown;
  }
}

class Game {
  constructor() {
    this.canvas = document.getElementById("board");

    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 1024;
    this.canvas.height = 768;

    this.max = new Player(400, 240, 380, 60, 120, 0, 0, 60000);
    this.speedofKey = 0.02;
    this.boneicon = new Image();
    this.boneicon.src = "../pics/Bone.png";
    this.noOfBones = 4;
    this.bone = [];
    this.ballicon = new Image();
    this.ballicon.src = "../pics/tennis-ball.png";
    this.noOfBalls = 8;
    this.ball = [];
    this.keysDown = {};
    this.backgroundImage = new Image();
    this.backgroundImage.src = "../pics/Barcelona-Tile.jpg";
    this.maxImage = new Image();
    this.maxImage.src = "../pics/Max-head-round-96.png";
  }

  paly = () => {

    this.keyStrokes();
    this.draw();
    
    requestAnimationFrame(this.paly);

    document.addEventListener(
      "keydown",
      function (key) {
        this.keysDown[key.keyCode] = true;
      },
      false
    );

    document.addEventListener(
      "keyup",
      function (key) {
        delete this.keysDown[key.keyCode];
      },
      false
    );




  };

  

    
  

  draw = () => {
    this.ctx.drawImage(this.backgroundImage, 0, 0, 1024, 768);
    this.ctx.drawImage(
      this.maxImage,
      this.max.x,
      this.max.y,
      this.max.width,
      this.max.height
    );

    this.ctx.font = "bold 48px Comic Sans MS";
    this.ctx.fillStyle = "purple";
    this.ctx.fillText(`Balls: ${this.max.ballScore}`, 40, 50);
    this.ctx.fillText(`Bones: ${this.max.boneScore}`, 300, 50);
  };

  keyStrokes = () => {
    if (38 in this.keysDown) {
      this.max.y -= this.max.speed * this.speedofKey;
      if (this.max.y < 0) {
        this.max.y = 0;
      }
    }
    if (40 in this.keysDown) {
      this.max.y += this.max.speed * this.speedofKey;
      if (this.max.y >= 660) {
        this.max.y = 660;
      }
    }
    if (37 in this.keysDown) {
      this.max.x -= this.max.speed * this.speedofKey;
      if (this.max.x <= 0) {
        this.max.x = 0;
      }
    }
    if (39 in this.keysDown) {
      this.max.x += this.max.speed * this.speedofKey;
      if (this.max.x >= 960) {
        this.max.x = 960;
      }
    }
  }
}

// Create Class Bones and its methods

class Bones {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 108;
    this.height = 108;
  }

  fall() {
    this.y = this.y + 1;

    if (this.y > this.canvas.height) {
      this.y = 0;
    }
  }

  show() {
    this.ctx.drawImage(this.boneicon, this.x, this.y, this.width, this.height);

    for (let i = 0; i < this.noOfBones; i++) {
      let x = Math.floor(Math.random() * this.canvas.width);
      let y = Math.floor(Math.random() * this.canvas.height);

      this.bone[i] = new Bones(x, y);
    }

    for (let i = 0; i < this.noOfBones; i++) {
      this.bone[i].show();
      this.bone[i].fall();

      // Check for collisions of the bones and Max  using the Pythagorean Theorem and increment Scores

      dist = Math.sqrt(
        (this.bone[i].x - this.max.x) * (this.bone[i].x - this.max.x) +
          (this.bone[i].y - this.max.y) * (this.bone[i].y - this.max.y)
      );

      if (dist <= 50) {
        this.max.boneScore += 1;

        this.bone[i].x =
          Math.random() * (this.canvas.width - this.bone[i].width);
        this.bone[i].y = this.canvas.height;
      }
    }
  }
}

class TennisBalls {
  constructor(x, y) {
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
  }

  show() {
    ctx.drawImage(this.ballicon, this.x, this.y, this.width, this.height);

    for (let i = 0; i < this.noOfBalls; i++) {
      let x = Math.floor(Math.random() * this.canvas.width);
      let y = Math.floor(Math.random() * this.canvas.height);

      this.ball[i] = new TennisBalls(x, y);
    }

    for (let i = 0; i < this.noOfBalls; i++) {
      this.ball[i].show();
      this.ball[i].fall();

      // Check for collisions of the balls and Max  using the Pythagorean Theorem and increment Scores

      dist = Math.sqrt(
        (this.ball[i].x - this.max.x) * (this.ball[i].x - this.max.x) +
          (this.ball[i].y - this.max.y) * (this.ball[i].y - this.max.y)
      );

      if (dist <= 50) {
        this.max.ballScore += 1;
        let audio = new Audio("../pics/Dog_Bark_Sound_Effect.mp3");
        audio.play();
        this.ball[i].x =
          Math.random() * (this.canvas.width - this.ball[i].width);
        this.ball[i].y = this.canvas.height;
      }
    }
  }
}

setInterval(() => {
  window.location.assign("./over.html");
}, 600000);
