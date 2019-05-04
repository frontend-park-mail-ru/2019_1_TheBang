import gameComponent from 'src/components/GameContent/template.pug';
import 'src/components/GameContent/style.scss';
import 'src/pug-mixins/animation/rotate.scss';
import 'src/pug-mixins/controlls/controlls.scss';
import Store from 'src/Store';

class GameContent {
	render() {
		const user = Store.getUser();
		let nickname = user.nickname;

		if (!user.nickname) {
			nickname = "undef";
		}

		const renderData = {
			nickname: nickname
		};

		return gameComponent.call({}, renderData);
	}
}

export default GameContent;