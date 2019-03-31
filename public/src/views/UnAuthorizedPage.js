import ErrorContent from "../components/ErrorContent/ErrorContent";
import ContentSection from "./section/ContentSection";

class UnAuthorizedPage extends ContentSection{
    constructor() {
        super(ErrorContent, '401 UnAuthorized')
    }
}

export default UnAuthorizedPage;