import '../../blocks/content/content.scss';
import '../../blocks/mobile-burger/mobile-burger.scss';
import '../../blocks/mobile-input/mobile-input.scss';
import MenuContent from "../../components/MenuContent/MenuContent";


class ContentSection {
    constructor(content, ...args) {
        this.content = content;
        this.args = args;
    }

    render()  {
        let content = new this.content(this.args);
        return `
            ${content.render()}
            `
    }

    getTargetRender() {
        return document.getElementsByClassName('content')[0]
    }

    afterRender() {
        MenuContent.activateButton(this.pageName);
    }

}

export default ContentSection;