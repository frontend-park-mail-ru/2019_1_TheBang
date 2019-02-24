import authIcon from '../../img/sign_in.svg';
import authorsIcon from '../../img/users.svg';
import signupIcon from '../../img/access.svg';
import gameIcon from '../../img/game1.svg';
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
            ${this.btn("Авторизация", "/auth", authIcon)}
            
            ${this.btn("Регистрация", "/signup", signupIcon)}

            ${this.btn("Авторы", "/authors", authorsIcon)}

            ${this.btn("Играть", "/game", gameIcon)}

            <div class="menu__nav__item menu__nav__item__href">
                <a href="#/about">
                    О проекте
                </a>
            </div>
        </nav>
        `
    }

    static activateButton(name) {
        if (!name) {
            return
        }
        let menuButtons = document.getElementsByClassName('menu__nav__item');

        this.disactivateButtons();

        let button = [].filter.call(menuButtons, (item) => {
            return item.hash && ~item.hash.indexOf(name)
        })[0];

        if (button) {
            button.classList.add("menu__nav__item_selected");
        }
    }

    static disactivateButtons() {
        let menuButtons = document.getElementsByClassName('menu__nav__item');

        if (menuButtons) {
            [].forEach.call(menuButtons, (item) => {
                item.classList.remove("menu__nav__item_selected");
            });
        }
    }


}

export default MenuContent;