import GameLobbyContent from 'src/components/GameLobbyContent/GameLobbyContent';
import GameWaitingPage from 'src/views/GameWaitingPage';
import EventBus from 'src/events/EventBus';
import GameNetworkEvents from 'src/events/GameNetworkEvents';
import GameEvents from 'src/events/GameEvents';
import ContentMixin from 'src/views/mixins/ContentMixin';
import onPageLoad from 'src/app';


/**
 * Мультиплеер, пока только комнаты
 */
class GameLobbyPage extends ContentMixin {
	constructor() {
		super(GameLobbyContent);
	}

	afterRender() {
		super.afterRender();

		EventBus.emit(GameNetworkEvents.GET_ROOMS);

		const refreshLobby = setInterval(() => {
			EventBus.emit(GameNetworkEvents.GET_ROOMS);
		}, 50);


		const change = () => {
			window.removeEventListener('hashchange', change);
			clearInterval(refreshLobby);
		};

		window.addEventListener('hashchange', change);


		const btn = document.querySelector('button');

		const createRoom = () => {
			EventBus.emit(GameNetworkEvents.CREATE_ROOM);
		};

		btn.addEventListener('click', createRoom)
	}

	static onSuccess(data) {
		const container = document.querySelector('.game-container');

		data.forEach((item) => {
			const counter = document.querySelector('.game-players-js' + item.id);
			if (!counter && !(item.players_count === item.max_players)) {
				const block = GameLobbyContent.createGameDescription(item);
				if (container) {
					container.append(block);
				}
				return
			}
			if (counter && (item.players_count === item.max_players)) {
				counter.parentNode.parentNode.remove();
				return
			}
			if (counter) {
				counter.innerText = item.players_count;
			}
		});
	}

	static onCreateRoom(data) {
		GameLobbyPage.onSuccess(data);
		EventBus.emit(GameEvents.GAME_START, data[0].id);

		onPageLoad(null, GameWaitingPage, data[0].room);
	}

}

export default GameLobbyPage;