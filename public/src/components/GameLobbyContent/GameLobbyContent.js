import 'src/components/GameLobbyContent/style.scss'
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
		btn.innerText = 'join';
		btn.dataset.id = data.id;

		btn.addEventListener('click', (event) => {
			EventBus.emit(GameEvents.GAME_START, event.target.dataset.id);
		});

		block.append(name, score, btn);

		return block
	}

}

export default GameLobbyContent;