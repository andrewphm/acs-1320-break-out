// eslint-disable-next-line import/extensions
import Sprite from './sprite.js';

class Brick extends Sprite {
  constructor(ctx, x, y, width = 75, height = 20, color = '#0095DD') {
    super(x, y, width, height, color);
    this.status = 1;
    this.ctx = ctx;
  }

  render() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}

export default Brick;
