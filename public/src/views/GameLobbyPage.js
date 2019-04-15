import GameLobbyContent from 'src/components/GameLobbyContent/GameLobbyContent';
import EventBus from 'src/events/EventBus';
import GameNetworkEvents from 'src/events/GameNetworkEvents';

/**
 * Мультиплеер, пока только комнаты
 */
class GameLobbyPage{
	constructor() {
		this.content = new GameLobbyContent();
	}

	render()  {
		return this.content.render()
	}

	getTargetRender() {
		return document.getElementById('root')
	}

	afterRender() {
		EventBus.emit(GameNetworkEvents.GET_ROOMS)
	}

	static onSuccess(data) {
		const container = document.querySelector('.game-container');

		data.forEach((item) => {
			const block = GameLobbyContent.createGameDescription(item);
			container.append(block)
		});
	}
}

export default GameLobbyPage;