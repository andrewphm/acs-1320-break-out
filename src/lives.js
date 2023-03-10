class Lives {
  constructor(lives) {
    this.lives = lives;
    this.defaultLives = lives;
  }

  render(ctx, width) {
    ctx.beginPath();
    ctx.font = '16px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText(`Lives: ${this.lives}`, width - 65, 20);
    ctx.closePath();
  }

  loseLife() {
    this.lives -= 1;
  }

  reset() {
    this.lives = this.defaultLives;
  }
}

export default Lives;
