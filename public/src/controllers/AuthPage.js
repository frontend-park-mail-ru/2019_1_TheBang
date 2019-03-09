import AuthContent from "../components/AuthContent";
import IndexController from "./section/IndexController";


class AuthPage extends IndexController{
    constructor() {
        super(AuthContent);
    }
}

export default AuthPage;