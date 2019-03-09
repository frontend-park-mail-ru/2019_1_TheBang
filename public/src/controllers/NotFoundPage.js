import app from "../app";

class NotFoundPage {
    constructor() {
        this.targetRender = app;
    }

    getTargetRender() {
        return this.targetRender;
    }

    render()  {
        return '<h1>Ничего не нашли</h1>' +
            '<a href="#">home</a>'
    }
}

export default NotFoundPage;