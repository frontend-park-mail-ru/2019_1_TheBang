import GameScene from 'src/game/GameScene';
import EventBus from 'src/events/EventBus';
import GameEvents from 'src/events/GameEvents';
import GameState from 'src/game/GameState';

class Game {
    constructor(gameMode) {
        this.gameMode = new gameMode;
        this.canvas = null;
        this.scene = null;
        this.state = null;
    }

    onInit(canvas) {
        this.canvas = canvas;
        this.scene = new GameScene(this.canvas);
        this.state = new GameState(this.scene.ctx);
        this.scene.state = this.state;

        EventBus.on(GameEvents.OPEN_GAME_VIEW, this.onOpenGameView);
        EventBus.on(GameEvents.START_GAME, this.onStartGame.bind(this));
        EventBus.emit(GameEvents.INIT_GAME_STRATEGY);
        EventBus.emit(GameEvents.OPEN_GAME_VIEW);
    }

    onOpenGameView() {
        // добавляем привественное окно итд
        EventBus.emit(GameEvents.START_GAME);
    }

    onStartGame() {
        this.startGameLoop();
    }

    startGameLoop() {
        // игровой цикл отображения
        console.log(this);
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop() {
        this.scene.state = this.state;
        this.scene.render();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}

export default Game;