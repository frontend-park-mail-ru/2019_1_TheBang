import IndexController from "./IndexController";

class FormController extends IndexController{
    constructor(content) {
        super(content);
        this.form = ""
    }

    afterRender() {
        super.afterRender();
        this.form = document.querySelector('form');

        let passInput = [].filter.call(this.form.elements, (item) => {
            return item.type && (Boolean(~item.type.indexOf("password")))
        });

        let showPassw = Array.from(document.getElementsByClassName('form-item__eye'));
        let showPasswLength = showPassw.length;

        for (let i = 0; i < showPasswLength; i++) {
            showPassw[i].addEventListener('click', () => {
                if (passInput[i].type === 'text') {
                    passInput[i].type = 'password';
                } else {
                    passInput[i].type = 'text';
                }
            })
        }

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            let formInputs = this.form.getElementsByClassName("form-item__input");
            let error = false;


            cancelError();

            let originalPassowrd = hasEqualPassword();

            [].forEach.call(formInputs, (input) => {
                if (hasUnRequired(input)) {
                    error = true
                }
            });

            if (error || originalPassowrd) {
                return
            }

            if (this.makeRequest) {
                this.makeRequest()
            }

        })
    }

    createError(msg) {
        let err = document.createElement("span");
        err.innerText = msg;
        err.className = "form-item__error-message";
        this.form.append(err);
    }

    createSuccess(msg) {
        let ok = document.createElement("span");
        ok.innerText = msg;
        ok.className = "form-item__success-message";
        this.form.append(ok);
    }

    getRequest(data) {
        return {
            mode: 'cors',
            method: "POST",
            body: JSON.stringify(data),
            credentials: 'include'
        }
    }


}

function cancelError() {
    let errorMessage = document.getElementsByClassName('form-item__error-message');

    while(errorMessage.length > 0){
        errorMessage[0].parentNode.removeChild(errorMessage[0]);
    }
}

function insertAfter(elem, refElem) {
    let parent = refElem.parentNode;
    let next = refElem.nextSibling;
    if (next) {
        return parent.insertBefore(elem, next);
    } else {
        return parent.appendChild(elem);
    }
}


function hasEqualPassword() {
    let passOne = document.getElementsByClassName("form-item__input_pass_repeat")[0];
    let passTwo = document.getElementsByClassName("form-item__input_pass")[0];

    if (passTwo === undefined || passOne === undefined) {
        return false
    }

    if (!(passOne.value === passTwo.value)) {
        createErrorMessage(passTwo, "Пароли не совпадают!");
        return true

    } else {
        passTwo.classList.remove("form-item__input_error");
        passTwo.classList.add("form-item__input_success");
        return false
    }
}


function hasUnRequired(field) {
    if (!field.value) {
        createErrorMessage(field, "Это поле обязательно!");
        return true
    } else {
        field.classList.remove("form-item__input_error");
        field.classList.add("form-item__input_success");
        return false
    }
}


function createErrorMessage(field, msg) {
    field.classList.remove("form-item__input_success");
    field.classList.add("form-item__input_error");

    let error = document.createElement("span");

    error.innerText = msg;
    error.className = "form-item__error-message";

    insertAfter(error, field.parentNode);
}


export default FormController;