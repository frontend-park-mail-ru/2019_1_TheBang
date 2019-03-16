import app from "../../app";

class GameContent {
    render() {
        app.isFirstLoad = true;
        console.log('draw game content reload next');
        return `
        <h1 class="title">game</h1>
        <a href="#">home</a>
        `
    }
}

export default GameContent;