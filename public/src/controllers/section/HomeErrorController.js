import HomeController from "./HomeController";

// отрисовка ошибок
class HomeErrorController extends HomeController{
    constructor(content, ...args) {
        super(content, args);
    }
}

export default HomeErrorController;