import ProfileContent from "../components/ProfileContent/ProfileContent";
import FormSection from "./section/FormSection";

import NetworkEvents from "../events/NetworkEvents";
import EventBus from "../events/EventBus";
import Store from "../Store";


class ProfilePage extends FormSection {
    constructor() {
        super(ProfileContent, Store.getUser());
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
        FormSection.SuccessMessage("Изменения успешны!");
    }

    static Error() {
        FormSection.ErrorMessage(`Произошла ошибка, попробуйте позже`);
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