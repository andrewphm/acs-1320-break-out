/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable no-plusplus */
import Paddle from './paddle.js';
import Ball from './ball.js';

class Game {
  constructor(bricks, score, lives, ctx, width, height, background) {
    this.bricks = bricks;
    this.score = score;
    this.lives = lives;
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.background = background;
    this.x = width / 2;
    this.y = height - 30;
    this.dx = 2;
    this.dy = -2;
    this.ballRadius = 10;

    this.brickRowCount = 3;
    this.brickColumnCount = 5;
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.paddleHeight = 10;
    this.paddleWidth = 75;
    this.paddleX = (this.width - this.paddleWidth) / 2;

    this.rightPressed = false;
    this.leftPressed = false;
  }

  draw() {
    const ball = new Ball(this.x, this.y, this.ballRadius, 'black');
    this.ctx.clearRect(0, 0, this.width, this.height);
    // this.background.render(this.ctx);
    this.drawBricks();
    this.drawPaddle();
    ball.render(this.ctx);
    ball.move(this.dx, this.dy);
    this.score.render(this.ctx);
    this.lives.render(this.ctx, this.width);
    this.collisionDetection();

    if (this.rightPressed) {
      this.paddleX += 4;
    } else if (this.leftPressed) {
      this.paddleX -= 4;
    }

    if (this.rightPressed) {
      this.paddleX = Math.min(this.paddleX + 4, this.width - this.paddleWidth);
    } else if (this.leftPressed) {
      this.paddleX = Math.max(this.paddleX - 4, 0);
    }

    if (this.x + this.dx > this.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
      this.dx = -this.dx;
    }

    if (this.y + this.dy < this.ballRadius) {
      this.dy = -this.dy;
    } else if (this.y + this.dy > this.height - this.ballRadius) {
      if (this.x > this.paddleX && this.x < this.paddleX + this.paddleWidth) {
        this.dy = -this.dy;
      } else {
        this.lives.loseLife();
        if (this.lives.lives === 0) {
          alert('GAME OVER');
          document.location.reload();
          requestAnimationFrame(() => this.draw());
        } else {
          this.x = this.width / 2;
          this.y = this.height - 30;
          this.dx = 2;
          this.dy = -2;
          this.paddleX = (this.width - this.paddleWidth) / 2;
        }
      }
    }

    this.x += this.dx;
    this.y += this.dy;
    requestAnimationFrame(() => this.draw());
  }

  drawBricks() {
    for (let c = 0; c < this.brickColumnCount; c++) {
      for (let r = 0; r < this.brickRowCount; r++) {
        if (this.bricks[c][r].status === 1) {
          const brickX = c * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft;
          const brickY = r * (this.brickHeight + this.brickPadding) + this.brickOffsetTop;
          this.bricks[c][r].x = brickX;
          this.bricks[c][r].y = brickY;
          this.bricks[c][r].render();
        }
      }
    }
  }

  drawPaddle() {
    const paddle = new Paddle(
      this.paddleX,
      this.height - this.paddleHeight,
      this.paddleWidth,
      this.paddleHeight,
      'black'
    );

    paddle.render(this.ctx);
  }

  collisionDetection() {
    for (let c = 0; c < this.brickColumnCount; c++) {
      for (let r = 0; r < this.brickRowCount; r++) {
        const b = this.bricks[c][r];
        if (b.status === 1) {
          if (
            this.x > b.x &&
            this.x < b.x + this.brickWidth &&
            this.y > b.y &&
            this.y < b.y + this.brickHeight
          ) {
            this.dy = -this.dy;
            b.status = 0;
            this.score.update(1);
            if (this.score.score === this.brickRowCount * this.brickColumnCount) {
              alert('YOU WIN, CONGRATULATIONS!');
              document.location.reload();
              requestAnimationFrame(() => this.draw());
            }
          }
        }
      }
    }
  }
}

export default Game;
