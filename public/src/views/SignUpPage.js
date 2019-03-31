import SignUpContent from "../components/SignUpContent/SignUpContent";
import FormSection from "./section/FormSection";

import EventBus from "../events/EventBus";
import NetworkEvents from "../events/NetworkEvents";


class SignUpPage extends FormSection{
    constructor() {
        super(SignUpContent);
    }

    SubmitRequest(form) {
        let data = {
            name: form[0].value,
            nickname: form[1].value,
            passwd: form[1].value
        };

        EventBus.emit(NetworkEvents.SignUpUser, data);
    }

    static Success() {
        FormSection.SuccessMessage("Вы зарегистрированы!");
    }

    static Error(status) {
        switch (status) {
            case 409:
                FormSection.ErrorMessage("Такой пользователь уже существует");
                break;
            default:
                FormSection.ErrorMessage(`Произошла ошибка, попробуйте позже`);
        }
    }
}

export default SignUpPage;