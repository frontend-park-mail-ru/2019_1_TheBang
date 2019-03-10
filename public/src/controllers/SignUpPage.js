import SignUpContent from "../components/SignUpContent";
import FormController from "./section/FormController";


class SignUpPage extends FormController{
    constructor() {
        super(SignUpContent);
    }

    makeRequest() {
        let data = {
            name: this.form[0].value,
            nickname: this.form[1].value,
            passwd: this.form[1].value
        };

        let request = this.getRequest(data);

        fetch('http://127.0.0.1:8080/signup', request)
            .then( (res) => {
                if (res.status > 299) {
                    throw res.status;
                }
                return res.json()
            })
            .then(() => {
                this.createSuccess("Вы зарегистрированы!");
            })
            .catch( (err) => {
                switch (err) {
                    default:
                        this.createError("Произошла ошибка");
                }
            })
    }

}

export default SignUpPage;