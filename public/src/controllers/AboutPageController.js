import MenuContent from "../components/MenuContent";
import AboutContent from "../components/AboutContent";


class AboutPageController {
    constructor() {
        this.name = 'about';
        this.targetRender = document.getElementsByClassName('content')[0];
        this.content = new AboutContent();
    }

    render()  {
        return `
            ${this.content.render()}
        `
    }

    afterRender() {
        MenuContent.disactivateButtons();
    }

}

export default AboutPageController;