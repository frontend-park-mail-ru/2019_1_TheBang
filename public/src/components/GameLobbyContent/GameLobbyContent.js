import 'src/components/GameLobbyContent/style.scss'
import 'src/pug-mixins/absolute/absolute.scss';
import gameLobbyComponent from 'src/components/GameLobbyContent/template.pug'
import EventBus from 'src/events/EventBus';
import GameEvents from 'src/events/GameEvents';


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
		score.innerText = data.players_count + '/' + data.max_players;

		const btn = document.createElement('div');
		btn.classList.add('game-container__game-block__btn');
		btn.innerText = 'Присоединиться';
		btn.dataset.id = data.id;

		const handler = (event) => {
			btn.removeEventListener('click', handler);
			EventBus.emit(GameEvents.GAME_START, event.target.dataset.id);
		};

		btn.addEventListener('click', handler);

		block.append(name, score, btn);

		return block
	}

}

export default GameLobbyContent;