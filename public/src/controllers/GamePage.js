import GameContent from "../components/GameContent";
import app from "../app";

class GamePage {
    constructor() {
        this.targetRender = app;
        this.content = new GameContent();
    }

    getTargetRender() {
        return this.targetRender;
    }

    render()  {
        return `
            ${this.content.render()}
        `
    }

}

export default GamePage;