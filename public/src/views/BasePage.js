import MenuContent from "../components/MenuContent/MenuContent";
import Store from "../Store";
import EventBus from "../events/EventBus";
import NetworkEvents from "../events/NetworkEvents";


class BasePage {
    static render() {
        let menu = new MenuContent(Store.isAuth());

        let target = document.getElementById('root');

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
        let menuButtons = document.getElementsByClassName('menu-button');

        let name = "logout";

        let button = [].filter.call(menuButtons, (item) => {
            return item.hash && ~item.hash.indexOf(name)
        })[0];

        if (button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                EventBus.emit(NetworkEvents.LogoutUser);
            })
        }
    }
}

export default BasePage;