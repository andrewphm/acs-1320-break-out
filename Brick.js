// eslint-disable-next-line import/extensions
import Sprite from './sprite.js';

class Brick extends Sprite {
  constructor(x, y, width = 75, height = 20, color = '#0095DD') {
    super(x, y, width, height, color);
    this.status = 1;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }
}

export default Brick;
