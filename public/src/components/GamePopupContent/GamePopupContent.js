import gamePopupComponent from 'src/components/GamePopupContent/template.pug'
import 'src/components/GamePopupContent/style.scss';
import 'src/pug-mixins/animation/rotate.scss';

class GamePopupContent {
	constructor (win, score, online) {
		this.win = win;
		this.score = score;
		this.online = online;
	}

	render() {
		let title = '';
		if (this.win) {
			title = 'Вы выиграли!';
		} else {
			title = 'Вы проиграли!';
		}

		let score = '';
		if (this.online) {
			score = 'Счет: ' + this.score;
		} else {
			score = 'Играйте в мультиплеер для сохранения счета!';
		}

		const renderData = {
			title: title,
			score: score
		};
		return gamePopupComponent.call({}, renderData);
	}
}

export default GamePopupContent;