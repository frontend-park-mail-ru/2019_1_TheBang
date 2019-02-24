import MenuContent from "../components/MenuContent";
import SignUpContent from "../components/SignUpContent";


class SignUpPageController {
    constructor() {
        this.name = 'signup';
        this.targetRender = document.getElementsByClassName('content')[0];
        this.content = new SignUpContent();
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

export default SignUpPageController;