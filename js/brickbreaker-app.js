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
let leftArrow = false;
let rightArrow = false;
let life = 3;

//PADDLE
const paddle = {
  x : canvas.width/2 - PADDLE_WIDTH/2,
  y : canvas.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
  width : PADDLE_WIDTH,
  height : PADDLE_HEIGHT,
  dx : 5
}

//LOAD BACKGROUND IMAGE
const backgroundImage = new Image();
backgroundImage.src = "images/brickbreakerbackground.png";

//DRAW PADDLE
function drawPaddle(){
  ctx.fillStyle = "#2e3548";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.strokeStyle = "#ffcd05";
  ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

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

//CREATE THE BALL
const ball = {
  x : canvas.width/2,
  y: paddle.y - BALL_RADIUS,
  radius : BALL_RADIUS,
  speed : 4,
  dx : 3 * (Math.random() * 2 - 1),
  dy : -3
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

//DRAW function
function draw(){
  drawPaddle();
  drawBall();
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
    life--;   //LOSE A life
    resetBall();
  }
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

//UPDATE GAME FUNCTION
function update(){
  movePaddle();
  moveBall();
  ballWallCollision();
}

//GAME LOOP
function loop(){
  //CLEAR THE canvas
  ctx.drawImage(backgroundImage, 0, 0);

  draw();
  update();
  requestAnimationFrame(loop);
}

loop();
