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
        this.targetRender = app.isFirstLoad ? app.page : document.getElementsByClassName('content')[0];
        this.content = new content(args);
    }

    render()  {
        if (app.isFirstLoad) {
            this.menu = new MenuContent(this.authUser);
            console.log('i draw rerender menu and conent');
            return `
                <input type="checkbox" class="mobile-input">
                <i class="mobile-burger fa fa-bars fa-2x"></i>
                <div class="menu">
                ${this.menu.render()}
                </div>
                <div class="content">
                ${this.content.render()}
                </div>
        `
        }
        return `
            ${this.content.render()}
            `
    }

    afterRender() {
        MenuContent.activateButton(this.pageName);

        if (app.isFirstLoad) {
            this.menu.addEventHandlers()
        }
    }

}

export default HomeController;