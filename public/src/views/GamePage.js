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

		// сюда вместо 12 писать с бека размерность лабиринта
		document.querySelector('.frame').style.setProperty('--matrix-capacity', 12);

		EventBus.emit(GameEvents.GAME_START);
	}
}

export default GamePage;