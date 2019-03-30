import HomeController from "./HomeController";

class ErrorController extends HomeController{
    constructor(content, ...args) {
        super(content, args);
    }
}

export default ErrorController;