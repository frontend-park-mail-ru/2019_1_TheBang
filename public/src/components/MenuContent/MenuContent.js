import btn from "../../blocks/menu-button/menu-button";
import './menu.scss';
import app from "../../app";


class MenuContent {
    constructor () {
        this.btn = btn;

        this.authPack = [
            this.btn('Профиль', '/profile'),
            this.btn('Авторы', '/authors'),
            this.btn('Играть', '/game'),
            this.btn('Таблица лидеров', '/leaders'),
            this.btn('Выход', '/logout'),
        ];
        this.anonPack = [
            this.btn('Авторизация', '/auth'),
            this.btn('Регистрация', '/signup'),
            this.btn('Авторы', '/authors')
        ];
        this.currentPack = app.store.isAuth() ? this.authPack : this.anonPack
    }

    render() {
        let buttons = this.currentPack.join("");
        return `
            <a href="#" class="menu__header">
                    <div class="menu__logo">
                    </div><h1>TheBang!</h1>
            </a>

            <nav class="menu__nav">
                    ${buttons}
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