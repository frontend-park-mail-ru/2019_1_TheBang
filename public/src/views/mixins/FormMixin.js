import ContentMixin from 'src/views/mixins/ContentMixin';
import MessageClass from 'src/views/mixins/MessageClass';


class FormMixin extends ContentMixin{

	afterRender() {
		super.afterRender();
		const form = document.querySelector('form');

		const passInput = [].filter.call(form.elements, (item) => {
			return item.type && (Boolean(~item.type.indexOf('password')))
		});

		const showPassw = Array.from(document.getElementsByClassName('form-item__eye'));
		const showPasswLength = showPassw.length;

		for (let i = 0; i < showPasswLength; i++) {
			showPassw[i].addEventListener('click', () => {
				if (passInput[i].type === 'text') {
					passInput[i].type = 'password';
				} else {
					passInput[i].type = 'text';
				}
			})
		}

		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const formInputs = form.getElementsByClassName('form-item__input');
			let error = false;

			FormMixin.clearMessage();

			const originalPassowrd = hasEqualPassword();

			[].forEach.call(formInputs, (input) => {
				if (!input.disabled && hasUnRequired(input)) {
					error = true
				}
			});

			if (error || originalPassowrd) {
				return
			}

			if (this.SubmitRequest) {
				this.SubmitRequest(form)
			}

		})
	}

	static clearMessage() {
		const successMsg = document.getElementsByClassName(MessageClass.SUCCESS);

		if (successMsg) {
			while(successMsg.length > 0){
				successMsg[0].parentNode.removeChild(successMsg[0]);
			}
		}

		const errorMsg = document.getElementsByClassName(MessageClass.ERROR);

		if (errorMsg) {

			while(errorMsg.length > 0){
				errorMsg[0].parentNode.removeChild(errorMsg[0]);
			}
		}
	}

	static ErrorMessage(message) {
		FormMixin.createMsg(message, MessageClass.ERROR)
	}

	static SuccessMessage(message) {
		FormMixin.createMsg(message, MessageClass.SUCCESS)
	}

	static createMsg(message, className) {
		const msg = document.createElement('span');
		const form = document.querySelector('form');

		msg.innerText = message;
		msg.className = className;
		form.append(msg);
	}
}

function insertAfter(elem, refElem) {
	const parent = refElem.parentNode;
	const next = refElem.nextSibling;
	if (next) {
		return parent.insertBefore(elem, next);
	}
	return parent.appendChild(elem);
}


function hasEqualPassword() {
	const passOne = document.getElementsByClassName('form-item__input_pass_repeat')[0];
	const passTwo = document.getElementsByClassName('form-item__input_pass')[0];

	if (passTwo === undefined || passOne === undefined) {
		return false
	}

	if (passOne.value !== passTwo.value) {
		setErrorInput(passTwo, 'Пароли не совпадают!');
		return true

	}
	setSuccessInput(passTwo);
	return false
}


function hasUnRequired(field) {
	if (!field.value) {
		setErrorInput(field, 'Это поле обязательно!');
		return true
	}
	setSuccessInput(field);
	return false
}


function setErrorInput(field, msg) {
	field.classList.remove(MessageClass.SUCCESS_BORDER);
	field.classList.add(MessageClass.ERROR_BORDER);

	const error = document.createElement('span');

	error.innerText = msg;
	error.className = MessageClass.ERROR;

	insertAfter(error, field.parentNode);
}


function setSuccessInput(field) {
	field.classList.remove(MessageClass.ERROR_BORDER);
	field.classList.add(MessageClass.SUCCESS_BORDER);
}


export default FormMixin;