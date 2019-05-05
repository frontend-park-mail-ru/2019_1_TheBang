import GameAlertContent from 'src/components/GameAlertContent/GameAlertContent';
import GamePopupContent from 'src/components/GamePopupContent/GamePopupContent';
import ContentMixin from 'src/views/mixins/ContentMixin';
import onPageLoad from 'src/app';
import GameLobbyPage from 'src/views/GameLobbyPage';
import GamePage from 'src/views/GamePage';

class GameWinnerPage /*extends ContentMixin*/ {
	constructor(targetRender, score) {
		this.content = new GamePopupContent(true, score);
		this.targetRender = targetRender;
	}

	render() {
		this.targetRender.classList.add("popup");
		return this.content.render()
	}

	getTargetRender() {
		return this.targetRender
	}
	
	// constructor(score) {
	// 	let subtitle = 'Ваш счет: ' + score;
	// 	if (!score) {
	// 		subtitle = ''
	// 	}
	// 	super(GamePopupContent, 'Вы выиграли!', subtitle);
	// }

	afterRender() {
		const btn = document.querySelector('.button-primary');
		console.log('hello winner');
		const toPlay = () => {
			if (this.score) {
				onPageLoad(null, GameLobbyPage);
			} else {
				onPageLoad(null, GamePage);
			}
			console.log('click hello winner');
			btn.removeEventListener('click', toPlay);
		};
		btn.addEventListener('click', toPlay)
	}
}

export default GameWinnerPage;