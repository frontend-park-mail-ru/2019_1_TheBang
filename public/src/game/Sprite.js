class Sprite {
    constructor(width, height, src) {
        this.img = new Image(width, height);
        this.width = width;
        this.height = height;
        // this.img.src = src;
    }
}

export default Sprite;