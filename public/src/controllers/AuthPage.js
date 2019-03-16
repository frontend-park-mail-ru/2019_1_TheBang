import AuthContent from "../components/AuthContent/AuthContent";
import HomeFormController from "./section/HomeFormController";
import app from "../app";


class AuthPage extends HomeFormController {
    constructor() {
        super(AuthContent);
    }

    SubmitRequest() {
        let data = {
            nickname: this.form[0].value,
            passwd: this.form[1].value
        };

        let request = {
            mode: 'cors',
            method: "POST",
            body: JSON.stringify(data),
            credentials: 'include'
        };

        let url = [app.constant.backend, 'auth'].join("");

        fetch(url, request)
            .then( (res) => {
                if (res.status > 299) {
                    throw res.status;
                }
                return res.json()
            })
            .then((data) => {
                app.isFirstLoad = true; // что бы перерендерить меню и получить данные
                window.location.replace("#/profile");
            })
            .catch( (err) => {
                switch (err) {
                    case 401:
                        this.createMsg("Не верный логин/пароль", this.errorMessageClass);
                        break;
                    default:
                        this.createMsg(`Произошла ошибка, попробуйте позже`, this.errorMessageClass);
                }
            })
    }
}

export default AuthPage;