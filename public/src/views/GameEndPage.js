import GamePopupContent from 'src/components/GamePopupContent/GamePopupContent';
import onPageLoad from 'src/app';
import GameLobbyPage from 'src/views/GameLobbyPage';
import GamePage from 'src/views/GamePage';

class GameEndPage {
	constructor(targetRender, win, score, online) {
		this.content = new GamePopupContent(win, score, online);
		this.targetRender = targetRender;
		this.online = online;
	}

	render() {
		this.targetRender.classList.add('popup');
		return this.content.render()
	}

	getTargetRender() {
		return this.targetRender
	}
	
	afterRender() {
		const popup = document.querySelector('.popup');
		popup.querySelector('.button-secondary').addEventListener('click', () => {
			popup.remove();
		});

		const btn = popup.querySelector('.button-primary');

		if (this.win) {
			console.log('hello winner');
		} else {
			console.log('hello looser');
		}

		const toPlay = () => {
			if (this.online) {
				onPageLoad(null, GameLobbyPage);
			} else {
				onPageLoad(null, GamePage);
			}
			console.log('click play');
			btn.removeEventListener('click', toPlay);
			popup.remove();
		};
		btn.addEventListener('click', toPlay)

		const closeButton = popup.querySelector('.popup__close');
		const close = () => {
			closeButton.removeEventListener('click', close);
			popup.remove();
		};
		closeButton.addEventListener('click', close);
	}
}

export default GameEndPage;