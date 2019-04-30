import GameAlertContent from 'src/components/GameAlertContent/GameAlertContent';
import ContentMixin from 'src/views/mixins/ContentMixin';
import onPageLoad from 'src/app';
import GameLobbyPage from 'src/views/GameLobbyPage';

class GameWinnerPage extends ContentMixin {
	constructor(score) {
		super(GameAlertContent, 'Вы выиграли!', 'Ваш счет: ' + score);
	}

	afterRender() {
		const btn = document.querySelector('.link');

		const toLobby = () => {
			onPageLoad(null, GameLobbyPage);
			btn.removeEventListener('click', toLobby);
		};
		btn.addEventListener('click', toLobby)
	}
}

export default GameWinnerPage;