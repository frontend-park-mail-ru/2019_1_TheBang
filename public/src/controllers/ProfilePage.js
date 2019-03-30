import ProfileContent from "../components/ProfileContent/ProfileContent";
import FormController from "./section/FormController";

import NetworkEvents from "../events/NetworkEvents";
import EventBus from "../events/EventBus";


class ProfilePage extends FormController {
    constructor() {
        super(ProfileContent);
    }

    SubmitRequest(form) {
        let file = form[3].files[0];

        let data = {
            "name": form[2].value
        };

        if (file) {
            let formData = new FormData();
            formData.append('photo', file);
            data.formData = formData
        }

        EventBus.emit(NetworkEvents.UpdateUser, data);
    }

    static Success() {
        FormController.SuccessMessage("Изменения успешны!");
    }

    static Error() {
        FormController.ErrorMessage(`Произошла ошибка, попробуйте позже`);
    }

    afterRender() {
        super.afterRender();
        let uploadInput = document.querySelector('form')[3];

        uploadInput.addEventListener('change', (e) => {
            let avatar = document.querySelector('form img');
            avatar.src = window.URL.createObjectURL(e.target.files[0]);
        })
    }

}

export default ProfilePage;