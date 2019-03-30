import ErrorController from "./section/ErrorController";
import ErrorContent from "../components/ErrorContent/ErrorContent";

class UnAuthorizedPage extends ErrorController{
    constructor() {
        super(ErrorContent, '401 UnAuthorized')
    }
}

export default UnAuthorizedPage;