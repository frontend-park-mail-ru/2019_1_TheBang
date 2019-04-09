import EventBus from 'src/events/EventBus';
import GameEvents from 'src/events/GameEvents';

class GameStrategy {
    constructor() {
        EventBus.on(GameEvents.INIT_GAME_STRATEGY, this.onInit.bind(this));
    }

    onInit() {}
}

export default GameStrategy;