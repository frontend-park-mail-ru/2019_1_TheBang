import SignUpContent from "../components/SignUpContent";
import IndexController from "./section/IndexController";


class SignUpPage extends IndexController {
    constructor() {
        super(SignUpContent);
    }
}

export default SignUpPage;