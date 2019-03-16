import app from "../../app";
import '../../blocks/content/content.scss';
import '../../blocks/mobile-burger/mobile-burger.scss';
import '../../blocks/mobile-input/mobile-input.scss';
import MenuContent from "../../components/MenuContent/MenuContent";
import AuthController from "./AuthController";

// отрисовка домашней страницы с меню
class HomeController extends AuthController{
    constructor(content, ...args) {
        super();
        this.targetRender = this.getTargetRender();
        this.content = new content(args);
    }

    render()  {
        return `
            ${this.content.render()}
            `
    }

    getTargetRender() {
        let target = document.getElementsByClassName('content')[0];

        if (!target) {
            this.baseRender()
        }

        return document.getElementsByClassName('content')[0]
    }

    baseRender() {
        this.menu = new MenuContent();
        let target = app.page;
        target.innerHTML = `
                <input type="checkbox" class="mobile-input">
                <i class="mobile-burger fa fa-bars fa-2x"></i>
                <div class="menu">
                ${this.menu.render()}
                </div>
                <div class="content">
                </div>
        `;
        this.addEventHandlers()
    }

    afterRender() {
        MenuContent.activateButton(this.pageName);
    }

    addEventHandlers() {
        let menuButtons = document.getElementsByClassName('menu-button');

        let name = "logout";

        let button = [].filter.call(menuButtons, (item) => {
            return item.hash && ~item.hash.indexOf(name)
        })[0];

        if (button) {
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
                        app.store.setAnonymous();
                        this.baseRender();
                        window.location.replace("#/");
                    })
            })
        }
    }

}

export default HomeController;