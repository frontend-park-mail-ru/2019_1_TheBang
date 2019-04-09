import GameContent from 'src/components/GameContent/GameContent';

import EventBus from 'src/events/EventBus';
import GameEvents from 'src/events/GameEvents';

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
		const canvas = document.querySelector("canvas");
		EventBus.emit(GameEvents.INIT_GAME, canvas);
	}
}

export default GamePage;