import HomeErrorController from "./section/HomeErrorController";
import ErrorContent from "../components/ErrorContent/ErrorContent";


class NotFoundPage extends HomeErrorController{
    constructor() {
        super(ErrorContent, '404 Not Found');
    }
}

export default NotFoundPage;