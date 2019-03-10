import btn from "./menu/btn";
import header from "./menu/header";


class MenuContent { // контроллер
    constructor () {
        this.header = header;
        this.btn = btn;
    }

    render() {
        return `
         ${this.header()}

        <nav class="menu__nav">
            ${this.btn("Авторизация", "/auth")}
            
            ${this.btn("Регистрация", "/signup")}

            ${this.btn("Авторы", "/authors")}

            ${this.btn("Играть", "/game")}

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