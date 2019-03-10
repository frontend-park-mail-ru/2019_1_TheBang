import IndexController from "./IndexController";

class FormController extends IndexController{
    constructor(content) {
        super(content);

    }

    afterRender() {
        super.afterRender();

        let form = document.querySelector('form');

        let passInput = [].filter.call(form.elements, (item) => {
            return item.placeholder && (Boolean(~item.placeholder.indexOf("Пароль")));
        })[0];

        let showPassw = document.getElementsByClassName('form-item__eye')[0];

        showPassw.addEventListener('click', () => {
            if (passInput.type === 'text') {
                passInput.type = 'password';
            } else {
                passInput.type = 'text';
            }
        });


        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let formInputs = form.getElementsByClassName("form-item__input");
            let error = false;


            cancelError();

            let originalPassowrd = checkEqualPassword();

            [].forEach.call(formInputs, (input) => {
                // cancelError(input);
                if (checkRequired(input)) {
                    error = true
                }
            });

            if (error || originalPassowrd) {
                return
            }

            // тут будет запрос к апи

        })
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


function checkEqualPassword() {
    let passOne = document.getElementsByClassName("form-item__input_pass_repeat")[0];
    let passTwo = document.getElementsByClassName("form-item__input_pass")[0];

    if (passTwo === undefined || passOne === undefined) {
        return false
    }

    if (!(passOne.value === passTwo.value)) {
        passTwo.classList.remove("form-item__input_success");
        passTwo.classList.add("form-item__input_error");
        let error = document.createElement("span");

        error.innerText = "Пароли не совпадают!";
        error.className = "form-item__error-message";

        let parentDiv = passTwo.parentNode;

        insertAfter(error, parentDiv);
        return true

    } else {
        passTwo.classList.remove("form-item__input_error");
        passTwo.classList.add("form-item__input_success");
        return false
    }
}


function checkRequired(field) {
    if (!field.value) {
        field.classList.remove("form-item__input_success");
        field.classList.add("form-item__input_error");
        let error = document.createElement("span");

        error.innerText = "Это поле обязательно!";
        error.className = "form-item__error-message";

        let parentDiv = field.parentNode;

        insertAfter(error, parentDiv);
        return true
    } else {
        field.classList.remove("form-item__input_error");
        field.classList.add("form-item__input_success");
        return false
    }
}


export default FormController;