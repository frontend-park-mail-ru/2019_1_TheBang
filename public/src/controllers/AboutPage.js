import MenuContent from "../components/MenuContent";
import AboutContent from "../components/AboutContent";
import IndexController from "./section/IndexController";


class AboutPage extends IndexController {
    constructor() {
        super(AboutContent);
    }

    async afterRender() {
        MenuContent.disactivateButtons();
    }

}

export default AboutPage;