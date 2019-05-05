import gameAlertComponent from 'src/components/GamePopupContent/template.pug'
import 'src/components/GamePopupContent/style.scss';
import 'src/pug-mixins/animation/rotate.scss';

class GamePopupContent {
	constructor (win, score) {
		this.win = win;
		if (this.score) {
			this.score = "Счет: " + score;
		} else {
			this.score = "Играйте в мультиплеер для сохранения счета!";
		}
	}

	render() {
		const renderData = {
			win: this.win,
			score: this.score
        };
		return gameAlertComponent.call({}, renderData);
	}
}

export default GamePopupContent;