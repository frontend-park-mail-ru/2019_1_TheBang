import ProfileContent from "../components/ProfileContent";
import MenuContent from "../components/MenuContent";


class ProfilePageController {
    constructor() {
        this.name = 'profile';
        this.targetRender = document.getElementsByClassName('content')[0];
        this.content = new ProfileContent();
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

export default ProfilePageController;