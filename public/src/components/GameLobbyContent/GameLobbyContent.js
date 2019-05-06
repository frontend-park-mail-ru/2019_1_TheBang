import 'src/components/GameLobbyContent/style.scss'
import 'src/pug-mixins/absolute/absolute.scss';
import gameLobbyComponent from 'src/components/GameLobbyContent/template.pug'
import EventBus from 'src/events/EventBus';
import GameEvents from 'src/events/GameEvents';
import GameWaitingPage from 'src/views/GameWaitingPage';
import onPageLoad from 'src/app';


class GameLobbyContent {
	render() {
		return gameLobbyComponent.call({}, {});
	}

	static createGameDescription(data) {
		const block = document.createElement('div');
		block.classList.add('game-container__game-block');

		const name = document.createElement('div');
		name.innerText = data.room;

		const score = document.createElement('div');

		const current_count = document.createElement('span');
		current_count.classList.add('game-players-js' + data.id);
		current_count.innerText = data.players_count;

		const max_count = document.createElement('span');
		max_count.innerText = '/' + data.max_players;

		score.append(current_count, max_count);

		const btn = document.createElement('div');
		btn.classList.add('game-container__game-block__btn');
		btn.innerText = 'Присоединиться';
		btn.dataset.id = data.id;
		btn.dataset.room = data.room;

		const handler = (event) => {
			btn.removeEventListener('click', handler);
			EventBus.emit(GameEvents.GAME_START, event.target.dataset.id);


			onPageLoad(null, GameWaitingPage, event.target.dataset.room);

		};

		btn.addEventListener('click', handler);

		block.append(name, score, btn);

		return block
	}

}

export default GameLobbyContent;