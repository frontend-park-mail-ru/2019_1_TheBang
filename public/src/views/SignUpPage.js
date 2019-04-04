import SignUpContent from 'src/components/SignUpContent/SignUpContent';
import FormMixin from 'src/views/mixins/FormMixin';

import EventBus from 'src/events/EventBus';
import NetworkEvents from 'src/events/NetworkEvents';


class SignUpPage extends FormMixin{
	constructor() {
		super(SignUpContent);
	}

	SubmitRequest(form) {
		//TODO here fix
		const data = {
			name: form[0].value,
			nickname: form[1].value,
			passwd: form[1].value
		};

		EventBus.emit(NetworkEvents.SIGNUP, data);
	}

	static onSuccess() {
		FormMixin.SuccessMessage('Вы зарегистрированы!');
	}

	static onError(status) {
		switch (status) {
		case 409:
			FormMixin.ErrorMessage('Такой пользователь уже существует');
			break;
		default:
			FormMixin.ErrorMessage('Произошла ошибка, попробуйте позже');
		}
	}
}

export default SignUpPage;