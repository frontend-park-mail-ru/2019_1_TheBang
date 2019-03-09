import HomeContent from "../components/HomeContent";
import IndexController from "./section/IndexController";


class HomePage extends IndexController{
    constructor() {
        super(HomeContent);
    }
}

export default HomePage;