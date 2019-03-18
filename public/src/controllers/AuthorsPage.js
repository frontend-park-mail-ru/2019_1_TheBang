import AuthorsContent from "../components/AuthorsContent/AuthorsContent";
import HomeController from "./section/HomeController";



class AuthorsPage extends HomeController{
    constructor() {
        super(AuthorsContent);
    }
}

export default AuthorsPage;