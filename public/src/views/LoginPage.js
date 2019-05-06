import LoginContent from 'src/components/LoginContent/LoginContent';
import FormMixin from 'src/views/mixins/FormMixin';

import EventBus from 'src/events/EventBus';
import NetworkEvents from 'src/events/NetworkEvents';


class LoginPage extends FormMixin {
	constructor() {
		super(LoginContent);
	}

	SubmitRequest(form) {
		const data = {
			nickname: form[0].value,
			passwd: form[1].value
		};

		EventBus.emit(NetworkEvents.LOGIN, data);
	}

	static onSuccess() {
		window.location.replace('#/profile');
	}

	static onError(status) {
		switch (status) {
		case 401:
			FormMixin.ErrorMessage('Не верный логин/пароль');
			break;
		default:
			FormMixin.ErrorMessage('Произошла ошибка, попробуйте позже');
		}
	}

	afterRender() {
		super.afterRender();

		const vkAuth = document.querySelector('.button-vk');
		vkAuth.addEventListener('click', (e) => {
			e.preventDefault();
			EventBus.emit(NetworkEvents.AUTH_VK);
		});
	}

}

export default LoginPage;