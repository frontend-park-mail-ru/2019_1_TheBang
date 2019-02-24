import AuthContent from "../components/AuthContent";
import MenuContent from "../components/MenuContent";


class AuthPageController {
    constructor() {
        this.name = 'auth';
        this.targetRender = document.getElementsByClassName('content')[0];
        this.content = new AuthContent();
    }

    render()  {
        return `
            ${this.content.render()}
        `
    }

    afterRender() {
        MenuContent.activateButton(this.name);
    }

}

export default AuthPageController;