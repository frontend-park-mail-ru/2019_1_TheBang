import GameState from 'src/game/GameState';
import GameStrategy from 'src/game/GameStategy';

class Singleplayer extends GameStrategy{
    constructor() {
        super();
        this.state = new GameState();
    }

    onInit() {
        this.state.me.pos.x = 0;
        this.state.me.pos.y = 0;
    }
}

export default Singleplayer;