import title from "../../blocks/title/title";
import formItem from "../../blocks/form-item/form-item";
import button from "../../blocks/button/button";
import link from "../../blocks/link/link";
import '../../blocks/form/form.scss';
import '../../blocks/form-container/form-container.scss';

class SignUpContent {
    constructor () {
        this.title = title;
        this.login = formItem;
        this.nickname = formItem;
        this.password = formItem;
        this.repeatPassword = formItem;
        this.button = button;
        this.link = link;
    }

    render() {
        return `
            <div class="form-container">
                ${this.title('Регистрация')}
                <form class="form" autocomplete="off">
                    ${this.login('Логин', 'text')}
                    ${this.nickname('Никнейм', 'text')}
                    ${this.password('Пароль', 'password')}
                    ${this.repeatPassword('Повторите пароль', 'password-repeat')}
                    ${this.button('Зарегистрироваться')}
                </form>
                ${this.link('Войти', 'auth')} 
            </div>
        `
    }
}

export default SignUpContent;