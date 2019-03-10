import SignUpContent from "../components/SignUpContent";
import FormController from "./section/FormController";


class SignUpPage extends FormController{
    constructor() {
        super(SignUpContent);
    }
}

export default SignUpPage;