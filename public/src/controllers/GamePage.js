import GameContent from "../components/GameContent/GameContent";
import AuthController from "./section/AuthController";

class GamePage extends AuthController{
    constructor() {
        super();
        this.content = new GameContent();
    }

    render()  {
        return `
            ${this.content.render()}
        `
    }
}

export default GamePage;