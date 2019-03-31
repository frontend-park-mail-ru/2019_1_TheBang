import HomeContent from "../components/HomeContent/HomeContent";
import ContentSection from "./section/ContentSection";


class HomePage extends ContentSection{
    constructor() {
        super(HomeContent);
    }

    static Success() {
        window.location.replace("#/");
    }
}

export default HomePage;