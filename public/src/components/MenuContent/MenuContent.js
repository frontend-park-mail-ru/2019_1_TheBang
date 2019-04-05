import 'src/components/MenuContent/style.scss';
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
		const menuButtons = document.getElementsByClassName('menu-button');

		this.disactivateButtons();

		const button = [].filter.call(menuButtons, (item) => {
			return item.hash && ~item.hash.indexOf(name)
		})[0];

		if (button) {
			button.classList.add('menu-button_selected');
		}
	}

	static disactivateButtons() {
		const menuButtons = document.getElementsByClassName('menu-button');

		if (menuButtons) {
			[].forEach.call(menuButtons, (item) => {
				item.classList.remove('menu-button_selected');
			});
		}
	}

}

export default MenuContent;