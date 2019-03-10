import AuthContent from "../components/AuthContent";
import FormController from "./section/FormController";

class AuthPage extends FormController {
    constructor() {
        super(AuthContent);
    }

    makeRequest() {
        let data = {
            nickname: this.form[0].value,
            passwd: this.form[1].value
        };

        let request = this.getRequest(data);

        fetch('http://127.0.0.1:8080/login', request)
            .then( (res) => {
                if (res.status > 299) {
                    throw res.status;
                }
                return res.json()
            })
            .then(() => {
                window.location.replace("#/profile");
            })
            .catch( (err) => {
                switch (err) {
                    case 401:
                        this.createError("Не верный логин/пароль");
                        break;
                    default:
                        this.createError("Произошла ошибка");
                }
            })
    }
}

export default AuthPage;