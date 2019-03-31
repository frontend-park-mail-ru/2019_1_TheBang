import ErrorContent from "../components/ErrorContent/ErrorContent";
import ContentSection from "./section/ContentSection";


class NotFoundPage extends ContentSection{
    constructor() {
        super(ErrorContent, '404 Not Found');
    }
}

export default NotFoundPage;