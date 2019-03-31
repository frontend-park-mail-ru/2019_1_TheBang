import GameContent from "../components/GameContent/GameContent";

class GamePage{
    constructor() {
        this.content = new GameContent();
    }

    render()  {
        return `
            ${this.content.render()}
        `
    }

    getTargetRender() {
        return document.getElementById('root')
    }

    afterRender() {
    }
}

export default GamePage;