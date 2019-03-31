import LoginContent from "../components/LoginContent/LoginContent";
import FormSection from "./section/FormSection";

import EventBus from "../events/EventBus";
import NetworkEvents from "../events/NetworkEvents";


class LoginPage extends FormSection {
    constructor() {
        super(LoginContent);
    }

    SubmitRequest(form) {
        let data = {
            nickname: form[0].value,
            passwd: form[1].value
        };

        EventBus.emit(NetworkEvents.LoginUser, data);
    }

    static Success() {
        window.location.replace("#/profile");
    }

    static Error(status) {
        switch (status) {
            case 401:
                FormSection.ErrorMessage("Не верный логин/пароль");
                break;
            default:
                FormSection.ErrorMessage(`Произошла ошибка, попробуйте позже`);
        }
    }

}

export default LoginPage;