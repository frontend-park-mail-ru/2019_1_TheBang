import btn from "../../blocks/menu-button/menu-button";
import './menu.scss';
import app from "../../app";


class MenuContent {
    constructor (isAuth) {
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
        this.currentPack = isAuth ? this.authPack : this.anonPack
    }

    render() {
        let buttons = this.currentPack.join("");
        console.log('draw menu');
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
        console.log('acivaye button');
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
            console.log('disable buttons');
            [].forEach.call(menuButtons, (item) => {
                item.classList.remove("menu-button_selected");
            });
        }
    }

    addEventHandlers() {
        let menuButtons = document.getElementsByClassName('menu-button');

        let name = "logout";

        let button = [].filter.call(menuButtons, (item) => {
            return item.hash && ~item.hash.indexOf(name)
        })[0];

        if (button) {
            console.log('set logout event');
            button.addEventListener('click', (e) => {
                e.preventDefault();

                let request = {
                    mode: 'cors',
                    method: "DELETE",
                    credentials: 'include'
                };

                let url = [app.constant.backend, 'auth'].join("");

                fetch(url, request)
                    .then( (res) => {
                        if (res.status > 299) {
                            throw res.status;
                        }
                        app.isFirstLoad = true;
                        window.location.replace("#/");
                    })
            })
        }
    }

}

export default MenuContent;