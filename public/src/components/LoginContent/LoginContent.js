import "../../pug-mixins/title/title.scss";
import "../../pug-mixins/form-item/form-item.scss";
import "../../pug-mixins/button/button.scss";
import "../../pug-mixins/link/link.scss";
import '../../pug-mixins/form/form.scss';
import '../../pug-mixins/form-container/form-container.scss';
import loginComponent from "./login.pug";

class LoginContent {
    constructor () {
    }

    render() {
        let title = 'Вход';
        return loginComponent.call({}, {title})
    }
}

export default LoginContent;