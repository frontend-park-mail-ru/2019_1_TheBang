import HomeErrorController from "./section/HomeErrorController";
import ErrorContent from "../components/ErrorContent/ErrorContent";

class UnAuthorizedPage extends HomeErrorController{
    constructor() {
        super(ErrorContent, '401 UnAuthorized')
    }
}

export default UnAuthorizedPage;