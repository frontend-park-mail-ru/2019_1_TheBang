import gameComponent from 'src/components/GameContent/template.pug'
import 'src/components/GameContent/style.scss'

class GameContent {
	render() {
		return gameComponent.call({}, {});
	}
}

export default GameContent;