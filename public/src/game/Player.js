import Entity from 'src/game/Entity';

class Player extends Entity {
    constructor(ctx) {
        const width = 30;
        const height = 30;
        const src = 'path to player sprite';

        super(ctx, width, height, src);
    }

    render() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.pos.x, this.pos.y, this.sprite.width, this.sprite.height);
    }

    update() {}
}

export default Player;