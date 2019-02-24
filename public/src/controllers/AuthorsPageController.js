import MenuContent from "../components/MenuContent";
import AuthorsContent from "../components/AuthorsContent";



class AuthorsPageController {
    constructor() {
        this.name = 'authors';
        this.targetRender = document.getElementsByClassName('content')[0];
        this.content = new AuthorsContent();
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

export default AuthorsPageController;