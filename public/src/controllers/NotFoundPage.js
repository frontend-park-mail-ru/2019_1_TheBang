import ErrorController from "./section/ErrorController";
import ErrorContent from "../components/ErrorContent/ErrorContent";


class NotFoundPage extends ErrorController{
    constructor() {
        super(ErrorContent, '404 Not Found');
    }
}

export default NotFoundPage;