import SignUpContent from "../components/SignUpContent/SignUpContent";
import HomeFormController from "./section/HomeFormController";
import app from "../app";


class SignUpPage extends HomeFormController{
    constructor() {
        super(SignUpContent);
    }

    SubmitRequest() {
        let data = {
            name: this.form[0].value,
            nickname: this.form[1].value,
            passwd: this.form[1].value
        };

        let request = {
            mode: 'cors',
            method: "POST",
            body: JSON.stringify(data),
            credentials: 'include'
        };

        let url = [app.constant.backend, 'user'].join("");

        fetch(url, request)
            .then( (res) => {
                if (res.status > 299) {
                    throw res.status;
                }
                this.createMsg("Вы зарегистрированы!", this.successMessageClass);
            })
            .catch( (err) => {
                switch (err) {
                    case 409:
                        this.createMsg("Такой пользователь уже существует", this.errorMessageClass);
                        break;
                    default:
                        this.createMsg(`Произошла ошибка, попробуйте позже`, this.errorMessageClass);
                }
            })
    }

}

export default SignUpPage;