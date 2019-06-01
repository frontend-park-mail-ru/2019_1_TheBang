import 'src/components/MenuContent/style.scss';
import 'src/pug-mixins/animation/rotate.scss';
import 'src/pug-mixins/button/button.scss';
import 'src/pug-mixins/mobile-input/mobile-input.scss';
import 'src/pug-mixins/player/player.scss';
import 'src/pug-mixins/music/music.scss';
import 'src/pug-mixins/music-next/music-next.scss';
import 'src/pug-mixins/music-prev/music-prev.scss';
import menuComponent from 'src/components/MenuContent/template.pug';


class MenuContent {
	constructor (isAuth) {
		this.isAuth = isAuth;
	}

	render() {
		const renderData = {
			is_auth: Boolean(this.isAuth),
		};
		return menuComponent.call({}, renderData)
	}

	static activateButton(name) {
		if (!name) {
			return
		}
		const menuButtons = document.getElementsByClassName('button-menu');

		this.disactivateButtons();

		const button = [].filter.call(menuButtons, (item) => {
			return item.hash && ~item.hash.indexOf(name)
		})[0];

		if (button) {
			button.classList.add('button-menu-selected');
			
			const menuCheck = document.querySelector('.mobile-input');
			menuCheck.checked = false;
		}
	}

	static disactivateButtons() {
		const menuButtons = document.getElementsByClassName('button-menu');

		if (menuButtons) {
			[].forEach.call(menuButtons, (item) => {
				item.classList.remove('button-menu-selected');
			});
		}
	}

}

export default MenuContent;