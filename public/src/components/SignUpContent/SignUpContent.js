import "../../pug-mixins/title/title.scss";
import "../../pug-mixins/form-item/form-item.scss";
import "../../pug-mixins/button/button.scss";
import "../../pug-mixins/link/link.scss";
import '../../pug-mixins/form/form.scss';
import '../../pug-mixins/form-container/form-container.scss';
import signupComponent from "./signup.pug";

class SignUpContent {
    constructor () {
    }

    render() {
        let title = 'Регистрация';
        return signupComponent.call({}, {title});
    }
}

export default SignUpContent;