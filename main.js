/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */

import Background from './background.js';
import Brick from './brick.js';
import Ball from './ball.js';
import Paddle from './paddle.js';
import Lives from './lives.js';
import Score from './score.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const ballRadius = 10;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const lives = 3;

const score = new Score(0);
const classLives = new Lives(lives);

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = new Brick(ctx, 0, 0);
  }
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        bricks[c][r].render();
      }
    }
  }
}

function drawPaddle() {
  const paddle = new Paddle(
    paddleX,
    canvas.height - paddleHeight,
    paddleWidth,
    paddleHeight,
    '#0095DD'
  );
  paddle.render(ctx);
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          score.update(1);
          if (score.score === brickRowCount * brickColumnCount) {
            alert('YOU WIN, CONGRATULATIONS!');
            document.location.reload();
            requestAnimationFrame(draw);
          }
        }
      }
    }
  }
}

const background = new Background('grey', canvas.width, canvas.height);

function draw() {
  const ball = new Ball(x, y, ballRadius, '#0095DD');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.render(ctx);
  drawBricks();
  drawPaddle();
  ball.render(ctx);
  ball.move(dx, dy);
  score.render(ctx);

  classLives.render(ctx, canvas);
  collisionDetection();

  if (rightPressed) {
    paddleX += 4;
  } else if (leftPressed) {
    paddleX -= 4;
  }

  if (rightPressed) {
    paddleX = Math.min(paddleX + 4, canvas.width - paddleWidth);
  } else if (leftPressed) {
    paddleX = Math.max(paddleX - 4, 0);
  }

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      classLives.loseLife();
      if (!classLives.lives) {
        alert('GAME OVER');
        document.location.reload();
        requestAnimationFrame(draw);
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);
