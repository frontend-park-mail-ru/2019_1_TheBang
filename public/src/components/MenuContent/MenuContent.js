import "../../pug-mixins/menu-button/menu-button.scss";
import './menu.scss';
import menuComponent from "./menu.pug";


class MenuContent {
    constructor (isAuth) {
        this.isAuth = isAuth;
        // this.btn = btn;
        //
        // this.authPack = [
        //     this.btn('Профиль', '/profile'),
        //     this.btn('Авторы', '/authors'),
        //     this.btn('Играть', '/game'),
        //     this.btn('Таблица лидеров', '/leaders'),
        //     this.btn('Выход', '/logout'),
        // ];
        // this.anonPack = [
        //     this.btn('Авторизация', '/auth'),
        //     this.btn('Регистрация', '/signup'),
        //     this.btn('Авторы', '/authors')
        // ];
        // this.currentPack = isAuth ? this.authPack : this.anonPack
    }

    render() {
        let is_auth = Boolean(this.isAuth);
        // console.log(is_auth);
        return menuComponent.call({}, {is_auth})
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