import GameContent from 'src/components/GameContent/GameContent';
import EventBus from 'src/events/EventBus';
import GameEvents from 'src/events/GameEvents';

/**
 * Синглплеер как база
 */
class GamePage{
	constructor() {
		this.content = new GameContent();
	}

	render()  {
		return this.content.render()
	}

	getTargetRender() {
		return document.getElementById('root')
	}

	afterRender() {
		EventBus.emit(GameEvents.GAME_START);
	}
}

export default GamePage;