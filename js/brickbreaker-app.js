//CANVAS ELEMENTS
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

//CANVAS BORDER
canvas.style.border = "1px solid #0ff";

//MAKE PADDLE BORDER THICKER
ctx.lineWidth = 3;

//GAME VARIABLES & CONSTANTS
const PADDLE_WIDTH = 100;
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 20;
const BALL_RADIUS = 8;
let gameOver = false;
let leftArrow = false;
let rightArrow = false;
let heart = 3;
let score = 0;
let scoreIncrement = 10;
let level = 1;
let maxLevel = 3;

//PADDLE
const paddle = {
  x : canvas.width/2 - PADDLE_WIDTH/2,
  y : canvas.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
  width : PADDLE_WIDTH,
  height : PADDLE_HEIGHT,
  dx : 5
}

//LOAD IMAGES
const BACKGROUND_IMG = new Image();
BACKGROUND_IMG.src = "images/brickbreakerbackground.png";

const LEVEL_IMG = new Image();
LEVEL_IMG.src = "images/level.png";

const HEART_IMG = new Image();
HEART_IMG.src = "images/heart.png";

const SCORE_IMG = new Image();
SCORE_IMG.src = "images/score.png";

//CONTROL PADDLE
document.addEventListener("keydown", function(event){
  if(event.keyCode === 37) {
    leftArrow = true;
  } else if (event.keyCode === 39) {
    rightArrow = true;
  } else {}
})

document.addEventListener("keyup", function(event){
  if(event.keyCode === 37) {
    leftArrow = false;
  } else if (event.keyCode === 39) {
    rightArrow = false;
  } else {}
})

//DISPLAY GAME OVER MESSAGE
const gameover = document.getElementById("gameover");
const win = document.getElementById("win");
const lose = document.getElementById("lose");
const restart = document.getElementById("restart");

restart.addEventListener("click", function(){
  location.reload();
})

function displayWin(){
  gameover.style.display = "block";
  win.style.diplay = "block";
}

function displayLose(){
  gameover.style.display = "block";
  lose.style.diplay = "block";
}

//CREATE THE BALL
const ball = {
  x : canvas.width/2,
  y: paddle.y - BALL_RADIUS,
  radius : BALL_RADIUS,
  speed : 4,
  dx : 3 * (Math.random() * 2 - 1),
  dy : -3
}
//CREATE BRICKS
const brick = {
  row : 2,
  column : 5,
  width : 55,
  height : 20,
  offSetLeft : 20,
  offSetTop : 20,
  marginTop : 40,
  fillColor : "#2e3548",
  strokeColor : "#FFF"
}

let bricks = [];

function createBricks(){
  for(r = 0; r < brick.row; r++){
    bricks[r] = [];
    for(c = 0; c < brick.column; c++){
      bricks[r][c] = {
        x : c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
        y : r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
        status : true
      }
    }
  }
}

//MOVE PADDLE
function movePaddle(){
  if(rightArrow){
    paddle.x += paddle.dx;
  } else if (leftArrow){
    paddle.x -= paddle.dx;
  } else {}
}

//DRAW the ball
function drawBall(){
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
  ctx.fillStyle = "#ffcd05";
  ctx.fill();
  ctx.strokeStyle = "#2e3548";
  ctx.stroke();
  ctx.closePath();
}

//BALL & WALL collision detection
function ballWallCollision(){
  if(ball.x + ball.radius > canvas.width){
    ball.dx = -ball.dx;
  }

  if(ball.y - ball.radius < 0){
    ball.dy = -ball.dy;
  }

  if(ball.x - ball.radius < 0){
    ball.dx = -ball.dx;
  }

  if(ball.y + ball.radius > canvas.height){
    heart--;   //LOSE A Heart
    resetBall();
  }
}

//BALL & PADDLE collision detection
function ballPaddleCollision(){
  if (
    ball.x < paddle.x + paddle.width &&
    ball.x > paddle.x &&
    paddle.y < paddle.y + paddle.height &&
    ball.y > paddle.y
  ){
    let collidePoint = ball.x - (paddle.x + paddle.width/2);
    collidePoint = collidePoint / (paddle.width/2);
    let angle = collidePoint * Math.PI/3;

    ball.dx = -ball.speed * Math.sin(angle);
    ball.dy = -ball.speed * Math.cos(angle);
  }
}

createBricks();

//BALL & BRICK COLLISION detection
function ballBrickCollision(){
  for(let r = 0; r < brick.row; r++){
    for(let c = 0; c < brick.column; c++){
        let b = bricks[r][c];
        if(b.status === true){
          if (
            ball.x + ball.radius > b.x &&
            ball.x - ball.radius < b.x + brick.width
            && ball.y + ball.radius > b.y &&
            ball.y - ball.radius < b.y + brick.height
          ){
            ball.dy = -ball.dy;
            b.status = false;
            score += scoreIncrement;
          }
        }
    }
  }
}

// DRAW THE bricks
function drawBricks(){
  for(let r = 0; r < brick.row; r++){
    for(let c = 0; c < brick.column; c++){
        let b = bricks[r][c];
        if(b.status === true){
          ctx.fillStyle = brick.fillColor;
          ctx.fillRect(b.x, b.y, brick.width, brick.height);
          ctx.strokeStyle = brick.strokeColor;
          ctx.strokeRect(b.x, b.y, brick.width, brick.height);
        }
    }
  }
}

//DRAW PADDLE
function drawPaddle(){
  ctx.fillStyle = "#2e3548";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.strokeStyle = "#ffcd05";
  ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

//RESET the ball
function resetBall(){
  ball.x = canvas.width/2;
  ball.y = paddle.y - BALL_RADIUS;
  ball.radius = BALL_RADIUS;
  ball.dx = 3 * (Math.random() * 2 - 1);
  ball.dy = -3;
}

//MOVE the BALL
function moveBall(){
  ball.x += ball.dx;
  ball.y += ball.dy;
}

//DISPLAY GAME STATS
function displayGameStats(text, textX, textY, img, imgX, imgY){
  ctx.fillStyle = "#FFF";
  ctx.font = "25px Germania One";
  ctx.fillText(text, textX, textY);
  ctx.drawImage(img, imgX, imgY, width = 25, width = 25)
}

//DRAW functions
function draw(){
  drawPaddle();
  drawBall();
  drawBricks();
  displayGameStats(score, 35, 25, SCORE_IMG, 5, 5);
  displayGameStats(level, canvas.width/2 + 5, 25, LEVEL_IMG, canvas.width/2 - 25, 5);
  displayGameStats(heart, canvas.width - 25, 25, HEART_IMG, canvas.width-55, 5);
}

//GAME OVER
function endGame(){
  if(heart < 0){
    displayLose();
    gameOver = true;
  }
}

//LEVEL UP
function levelUp(){
  let isLevelCompleted = true;
  for(let r = 0; r < brick.row; r++){
    for(let c = 0; c < brick.column; c++){
      isLevelCompleted = isLevelCompleted && ! bricks[r][c].status;
    }
  }

  if(isLevelCompleted){
    if(level >= maxLevel){
      displayWin();
      gameOver = true;
      return;
    }

    brick.row++;
    createBricks();
    ball.speed += 1.5;
    resetBall();
    level++;
  }
}

//UPDATE GAME FUNCTION
function update(){
  movePaddle();
  moveBall();
  ballWallCollision();
  ballPaddleCollision();
  ballBrickCollision();
  levelUp();
  endGame();
}

//GAME LOOP
function loop(){
  //CLEAR THE canvas
  ctx.drawImage(BACKGROUND_IMG, 0, 0);

  draw();
  update();

  if(!gameOver){
    requestAnimationFrame(loop);
  }
}

loop();
