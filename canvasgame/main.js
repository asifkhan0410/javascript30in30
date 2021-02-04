

var myGamePiece;
let myObstacles = [];
var myScore;
var mySound;
var myMusic;
let storedhighscore=JSON.parse(localStorage.getItem('highscore'));
let highScore= [];
if(storedhighscore!==null){
    storedhighscore.map(hs => {
    highScore.push(hs)
});
}
console.log(storedhighscore)

function start(){
    startGame();
    updateGameArea();
    myObstacles=[]
}

const highscore = document.querySelector('.highscore');

function displayHighScore(){
    const heading = document.createElement('headerscore');
    heading.innerHTML="High Score"
    const html = highScore.slice(0,5).map(high => {
        return `<li><span class= "score">${high}</span></li>`
    }).join(" ")
    return highscore.innerHTML = html
    
}

function startGame() {
    
    myGamePiece = new component(30, 30, "red", 10, 120);
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myMusic = new sound("1992bgmusic.mp3");
    mySound = new sound("kick.wav");
    console.log(myMusic)
    myMusic.play();
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 680;
        this.canvas.height = 370;
        this.canvas.fillStyle = "red"
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
          })
          window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
          })
    },
    clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
    clearInterval(this.interval);
    highScore.push(myGameArea.frameNo);
    highScore.sort((a,b) => a<b?1:-1)
    highscore.innerHTML = "High Score"
    displayHighScore()
    localStorage.setItem("highscore", JSON.stringify(highScore));
    }
}
function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  if(src==="1992bgmusic.mp3"){
      this.sound.setAttribute("loop", "true");
  }
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = async function(){
    await this.sound.play();
  }
  this.stop = async function(){
    await this.sound.pause();
  }
}

function component(width, height, color, x, y,type) {
  this.type= type;
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.update = function(){
  ctx = myGameArea.context;
  if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}


function updateGameArea() {
    var x, y,height, gap, minHeight, maxHeight, minGap, maxGap;
  for (i = 0; i < myObstacles.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles[i])) {
        mySound.play();
        myMusic.stop();
        myGameArea.stop();
      return;
    }
  }
  myGameArea.clear();

  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
  //if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -1; }
  if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 2; }
  if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -2; }
  if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 2; } 

  myGameArea.frameNo += 1;
  if (myGameArea.frameNo == 1 || everyinterval(50)) {
    x = myGameArea.canvas.width;
    minHeight = 20;
    maxHeight = 200;
    height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
    minGap = 50;
    maxGap = 130;
    gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
    myObstacles.push(new component(10, height, "green", x, 0));
    myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
  }
  for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].x += -6;
    myObstacles[i].update();
  }
  myScore.text = "SCORE: " + myGameArea.frameNo;
  myScore.update();
  myGamePiece.newPos();
  myGamePiece.update();
}

// function moveup() {
//   myGamePiece.speedY -= 1;
// }

// function movedown() {
//   myGamePiece.speedY += 1;
// }

// function moveleft() {
//   myGamePiece.speedX -= 1;
// }

// function moveright() {
//   myGamePiece.speedX += 1;
// }
// function stopMove() {
//   myGamePiece.speedX = 0;
//   myGamePiece.speedY = 0;
// }

