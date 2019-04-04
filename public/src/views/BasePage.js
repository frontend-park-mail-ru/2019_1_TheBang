import MenuContent from 'src/components/MenuContent/MenuContent';
import Store from 'src/Store';
import EventBus from 'src/events/EventBus';
import NetworkEvents from 'src/events/NetworkEvents';


class BasePage {
	static onRender() {
		const menu = new MenuContent(Store.isAuth());

		const target = document.getElementById('root');

		target.innerHTML = `
                <input type="checkbox" class="mobile-input">
                <i class="mobile-burger fa fa-bars fa-2x"></i>
                <div class="menu">
                ${menu.render()}
                </div>
                <div class="content">
                </div>
        `;
		BasePage.afterRender();
	}

	static afterRender() {
		const menuButtons = document.getElementsByClassName('menu-button');

		const name = 'logout';

		const button = [].filter.call(menuButtons, (item) => {
			return item.hash && ~item.hash.indexOf(name)
		})[0];

		if (button) {
			button.addEventListener('click', (e) => {
				e.preventDefault();

				EventBus.emit(NetworkEvents.LOGOUT);
			})
		}
	}
}

export default BasePage;