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
		// const fullScreenEvent = (event) => {
		// 	if (event.keyCode === 13) {
		// 		document.querySelector('.frame').requestFullscreen();
		// 	}
		// };

		// document.addEventListener('keydown', fullScreenEvent);

		EventBus.emit(GameEvents.GAME_START);
	}
}

export default GamePage;