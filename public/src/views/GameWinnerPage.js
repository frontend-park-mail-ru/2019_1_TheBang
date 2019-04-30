import GameAlertContent from 'src/components/GameAlertContent/GameAlertContent';
import ContentMixin from 'src/views/mixins/ContentMixin';
import onPageLoad from 'src/app';
import GameLobbyPage from 'src/views/GameLobbyPage';

class GameWinnerPage extends ContentMixin {
	constructor(score) {
		let subtitle = 'Ваш счет: ' + score;
		if (!score) {
			subtitle = ''
		}
		super(GameAlertContent, 'Вы выиграли!', subtitle);
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