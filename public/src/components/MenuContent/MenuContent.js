import btn from "../../blocks/menu-button/menu-button";
import './menu.scss';

class MenuContent {
    constructor () {
        this.btn = btn;
    }

    render() {
        return `
            <a href="#" class="menu__header">
                    <div class="menu__logo">
                    </div><h1>TheBang!</h1>
            </a>

            <nav class="menu__nav">
                    ${this.btn('Профиль', '/profile')}
                    ${this.btn('Авторизация', '/auth')}
                    ${this.btn('Регистрация', '/signup')}
                    ${this.btn('Авторы', '/authors')}
                    ${this.btn('Играть', '/game')}
                    ${this.btn('Таблица лидеров', '/leaders')}
            </nav>
        `
    }

    static activateButton(name) {
        if (!name) {
            return
        }
        let menuButtons = document.getElementsByClassName('menu-button');

        this.disactivateButtons();

        let button = [].filter.call(menuButtons, (item) => {
            return item.hash && ~item.hash.indexOf(name)
        })[0];

        if (button) {
            button.classList.add("menu-button_selected");
        }
    }

    static disactivateButtons() {
        let menuButtons = document.getElementsByClassName('menu-button');

        if (menuButtons) {
            [].forEach.call(menuButtons, (item) => {
                item.classList.remove("menu-button_selected");
            });
        }
    }
}

export default MenuContent;