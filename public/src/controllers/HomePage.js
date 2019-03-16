import HomeContent from "../components/HomeContent/HomeContent";
import HomeController from "./section/HomeController";


class HomePage extends HomeController{
    constructor() {
        super(HomeContent);
    }
}

export default HomePage;