import AuthContent from "../components/AuthContent/AuthContent";
import IndexController from "./section/IndexController";


class AuthPage extends IndexController{
    constructor() {
        super(AuthContent);
    }

    afterRender() {
        super.afterRender();

        let form = document.querySelector('form');
        let passInput = form[1];
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

            [].forEach.call(formInputs, (input) => {
                // cancelError(input);
                if (checkRequired(input)) {
                    error = true
                }
            });

            if (error) {
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

export default AuthPage;