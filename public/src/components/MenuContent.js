import btn from "./menu/btn";
import header from "./menu/header";


class MenuContent {
    constructor () {
        this.header = header;
        this.btn = btn;
    }

    render() {
        return `
         ${this.header()}

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