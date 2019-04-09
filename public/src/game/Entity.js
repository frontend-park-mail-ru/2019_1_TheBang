import Sprite from 'src/game/Sprite';

class Entity {
    constructor(ctx, width, height, src) {
        this.pos = {
            x: 0,
            y: 0
        }

        this.ctx = ctx;
        this.sprite = new Sprite(width, height, src);
    }

    update() {}
}

export default Entity;