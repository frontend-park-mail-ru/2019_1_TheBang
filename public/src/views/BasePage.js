import MenuContent from 'src/components/MenuContent/MenuContent';
import Store from 'src/Store';
import EventBus from 'src/events/EventBus';
import NetworkEvents from 'src/events/NetworkEvents';
import volumeController from 'src/pug-mixins/music/music';
import musicNextController from 'src/pug-mixins/music-next/music-next';
import musicPrevController from 'src/pug-mixins/music-prev/music-prev';


class BasePage {
	static onRender() {
		const menu = new MenuContent(Store.isAuth());

		const target = document.getElementById('root');

		target.innerHTML =
                '<input type="checkbox" class="mobile-input">' +
                '<div class="mobile-burger"></div>' +
                '<div class="menu">' +
                menu.render() +
                '</div>' +
                '<div class="content">' +
                '</div>';
		BasePage.afterRender();
	}

	static afterRender() {
		const menuButtons = document.getElementsByClassName('button-secondary');

		const name = 'logout';

		const button = [].filter.call(menuButtons, (item) => {
			return item.hash && ~item.hash.indexOf(name)
		})[0];

		if (button) {
			const btnHandler = (e) => {
				e.preventDefault();
				button.removeEventListener('click', btnHandler);
				EventBus.emit(NetworkEvents.LOGOUT);
			};

			button.addEventListener('click', btnHandler);
		}

		volumeController();
		musicNextController();
		musicPrevController();
	}
}

export default BasePage;