class GameScene {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.state = null;
    }

    render() {
        Object.keys(this.state).forEach(entity => {
            this.state[entity].render();
        })
    }
}

export default GameScene;