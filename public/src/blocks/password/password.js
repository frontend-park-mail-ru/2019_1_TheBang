import checkbox from "../checkbox/checkbox";

class Password {
    constructor () {
        this.checkbox = checkbox;
    }

    render() {
        return `
            <div class="password">
                ${this.checkbox()} 
                <a class="password__link" href="#">Забыли пароль?</a>
            </div>
        `
    }
}

export default Password;