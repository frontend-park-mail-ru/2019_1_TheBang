import HomeContent from "../components/HomeContent";
import MenuContent from "../components/MenuContent";

class HomePageController {
    constructor() {
        this.name = null;
        this.targetRender = document.getElementById('root');
        this.menu = new MenuContent();
        this.content = new HomeContent();
    }

    render()  {
        return `
                <main class="container">
                <div class="menu">
                ${this.menu.render()}
                </div>
                <div class="content">
                ${this.content.render()}
                </div>
                </main>
            `
    }

    afterRender() {
        MenuContent.activateButton(this.name);
    }
}

export default HomePageController;