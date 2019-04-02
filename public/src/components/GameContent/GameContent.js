import gameComponent from 'src/components/GameContent/template.pug'


class GameContent {
	render() {
		return gameComponent.call({}, {});
	}
}

export default GameContent;