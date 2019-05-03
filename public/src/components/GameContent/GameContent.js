import gameComponent from 'src/components/GameContent/template.pug';
import 'src/components/GameContent/style.scss';
import 'src/pug-mixins/animation/rotate.scss';
import 'src/pug-mixins/controlls/controlls.scss';

class GameContent {
	render() {
		return gameComponent.call({}, {});
	}
}

export default GameContent;