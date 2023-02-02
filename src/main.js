/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */

import Background from './background.js';
import Brick from './brick.js';
import Lives from './lives.js';
import Score from './score.js';
import Game from './game.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const brickRowCount = 3;
const brickColumnCount = 5;

const brickColors = ['red', 'green', 'purple'];
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = new Brick(ctx, 0, 0, 75, 20, brickColors[r]);
  }
}

const score = new Score(0);
const lives = new Lives(3);
const background = new Background('black', canvas.width, canvas.height);
const game = new Game(bricks, score, lives, ctx, canvas.width, canvas.height, background);
game.draw();

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    game.rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    game.leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    game.rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    game.leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    game.paddleX = relativeX - game.paddleWidth / 2;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);
