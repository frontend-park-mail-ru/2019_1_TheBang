import gameAlertComponent from 'src/components/GameAlertContent/template.pug'

class GameAlertContent {
	constructor (title, subtitle) {
		this.title = title;
		this.subtitle = subtitle;
	}

	render() {
		const renderData = {
			title: this.title,
			subtitle: this.subtitle
		};
		return gameAlertComponent.call({}, renderData);
	}
}

export default GameAlertContent;