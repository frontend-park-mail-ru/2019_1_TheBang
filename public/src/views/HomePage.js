import HomeContent from 'src/components/HomeContent/HomeContent';
import ContentMixin from 'src/views/mixins/ContentMixin';

import EventBus from 'src/events/EventBus';
import GameEvents from 'src/events/GameEvents';

class HomePage extends ContentMixin{
	constructor() {
		super(HomeContent);
	}

	static onSuccess() {
		window.location.replace('#/');
	}

	afterRender() {
		const singlePlayerButton = document.getElementsByClassName('js-singleplayer')[0];
		singlePlayerButton.addEventListener('click', () => {
			EventBus.emit(GameEvents.CHOOSE_GAME_MODE, "SINGLEPLAYER");
		});
	}
}

export default HomePage;