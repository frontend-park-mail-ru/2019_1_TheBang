import GameContent from "../components/GameContent";



class GamePageController {
    constructor() {
        this.name = 'game';
        this.targetRender = document.getElementById('root');
        this.content = new GameContent();
    }

    render()  {
        return `
            ${this.content.render()}
        `
    }

    afterRender() {
    }

}

export default GamePageController;