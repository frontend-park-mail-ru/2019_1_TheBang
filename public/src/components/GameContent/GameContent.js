import gameComponent from "./game.pug"

class GameContent {
    render() {
        return gameComponent.call({}, {})
    }
}

export default GameContent;