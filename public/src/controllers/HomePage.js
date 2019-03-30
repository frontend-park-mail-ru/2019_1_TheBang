import HomeContent from "../components/HomeContent/HomeContent";
import HomeController from "./section/HomeController";


class HomePage extends HomeController{
    constructor() {
        super(HomeContent);
    }

    static Success() {
        window.location.replace("#/");
    }
}

export default HomePage;