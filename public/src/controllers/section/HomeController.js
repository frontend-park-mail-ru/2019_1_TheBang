import app from "../../app";
import '../../blocks/content/content.scss';
import '../../blocks/mobile-burger/mobile-burger.scss';
import '../../blocks/mobile-input/mobile-input.scss';
import MenuContent from "../../components/MenuContent/MenuContent";
import AuthController from "./AuthController";
import EventBus from "../../events/EventBus";
import NetworkEvents from "../../events/NetworkEvents";

// отрисовка домашней страницы с меню
class HomeController extends AuthController{
    constructor(content, ...args) {
        super();
        this.targetRender = HomeController.getTargetRender();
        this.content = new content(args);
    }

    render()  {
        return `
            ${this.content.render()}
            `
    }

    static getTargetRender() {
        let target = document.getElementsByClassName('content')[0];

        if (!target) {
            HomeController.baseRender()
        }

        return document.getElementsByClassName('content')[0]
    }

    static baseRender() {
        let menu = new MenuContent();
        let target = app.baseContainer;
        target.innerHTML = `
                <input type="checkbox" class="mobile-input">
                <i class="mobile-burger fa fa-bars fa-2x"></i>
                <div class="menu">
                ${menu.render()}
                </div>
                <div class="content">
                </div>
        `;
        HomeController.addEventHandlers()
    }

    afterRender() {
        MenuContent.activateButton(this.pageName);
    }

    static addEventHandlers() {
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

export default HomeController;