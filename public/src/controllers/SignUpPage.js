import SignUpContent from "../components/SignUpContent/SignUpContent";
import FormController from "./section/FormController";

import EventBus from "../events/EventBus";
import NetworkEvents from "../events/NetworkEvents";


class SignUpPage extends FormController{
    constructor() {
        super(SignUpContent);
    }

    static SubmitRequest(form) {
        let data = {
            name: form[0].value,
            nickname: form[1].value,
            passwd: form[1].value
        };

        EventBus.emit(NetworkEvents.SignUpUser, data);
    }

    static Success() {
        FormController.SuccessMessage("Вы зарегистрированы!");
    }

    static Error(status) {
        switch (status) {
            case 409:
                FormController.ErrorMessage("Такой пользователь уже существует");
                break;
            default:
                FormController.ErrorMessage(`Произошла ошибка, попробуйте позже`);
        }
    }
}

export default SignUpPage;