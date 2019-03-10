import AuthContent from "../components/AuthContent";
import FormController from "./section/FormController";

class AuthPage extends FormController {
    constructor() {
        super(AuthContent);
    }
}

export default AuthPage;