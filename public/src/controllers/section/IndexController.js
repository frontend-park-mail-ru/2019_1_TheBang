import MenuContent from "../../components/MenuContent";
import app from "../../app";

class IndexController {
    constructor(content) {
        this.content = new content();
        this.targetRender = document.getElementsByClassName('content')[0];
    }

    getTargetRender() {
        return this.targetRender || app;
    }

    baseComponent() {
        this.menu = new MenuContent();
    }

    render()  {
        if (this.check()) {
            return `
            ${this.content.render()}
            `
        }

        this.baseComponent();

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

    check() {
        return this.targetRender;
    }

    afterRender() {
        MenuContent.activateButton(this.pageName);
    }


}

export default IndexController;