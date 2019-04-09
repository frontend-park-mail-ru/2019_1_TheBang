import Player from 'src/game/Player';
import Map from 'src/game/Map';

class GameState {
    constructor(ctx) {
        // задать приоритет отрисовки (координата z)
        this.map = new Map(ctx);
        this.me = new Player(ctx);
    }
}

export default GameState;