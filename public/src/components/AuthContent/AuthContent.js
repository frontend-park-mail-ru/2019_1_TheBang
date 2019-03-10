import title from "../../blocks/title/title";
import formItem from "../../blocks/form-item/form-item";
import password from "../../blocks/password/password";
import button from "../../blocks/button/button";
import link from "../../blocks/link/link";

class AuthContent {
    constructor () {
        this.title = title;
        this.login = formItem;
        this.password = formItem;
        this.passwordBlock = new password();
        this.button = button;
        this.link = link;
    }

    render() {
        return `
            <div class="form-container">
                ${this.title('Вход')}
                <form class="form">
                    ${this.login('Логин', 'text')}
                    ${this.password('Пароль', 'password')}
                    ${this.passwordBlock.render()}
                    ${this.button('Войти')}
                </form>
                ${this.link('Зарегистрироваться', 'signup')}
            </div>
        `
    }
}

export default AuthContent;