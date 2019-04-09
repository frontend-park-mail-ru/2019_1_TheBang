import Cell from 'src/game/Cell';
import Sprite from 'src/game/Sprite';

class SimpleCell extends Cell {
    constructor(ctx, width, height) {
        const src = '../src/game/img/SimpleCell.png';

        super(ctx, width, height, src);
    }

    render() {
        // this.ctx.DrawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.pos.x, this.pos.y, this.sprite.width, this.sprite.height);
    }
}

export default SimpleCell;