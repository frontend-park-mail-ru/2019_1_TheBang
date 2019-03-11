import ProfileContent from "../components/ProfileContent/ProfileContent";
import FormController from "./section/FormController";


class ProfilePage extends FormController {
    constructor() {
        super(ProfileContent);
    }

    makeRequest() {
        // поживем подождем)
    }

}

export default ProfilePage;