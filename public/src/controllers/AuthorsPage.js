import AuthorsContent from "../components/AuthorsContent/AuthorsContent";
import IndexController from "./section/IndexController";



class AuthorsPage extends IndexController{
    constructor() {
        super(AuthorsContent);
    }
}

export default AuthorsPage;