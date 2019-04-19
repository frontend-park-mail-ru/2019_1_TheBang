import ProfileContent from 'src/components/ProfileContent/ProfileContent';
import FormMixin from 'src/views/mixins/FormMixin';
import 'src/pug-mixins/button/button.scss';

import NetworkEvents from 'src/events/NetworkEvents';
import EventBus from 'src/events/EventBus';
import Store from 'src/Store';


class ProfilePage extends FormMixin {
	constructor() {
		super(ProfileContent, Store.getUser());
	}

	SubmitRequest(form) {
		const file = form[1].files[0];
		const name = form[2].value;

		if (name === Store.name && !file) {
			return
		}

		const data = {
			'name': name
		};

		if (file) {
			const formData = new FormData();
			formData.append('photo', file);
			data.formData = formData
		}

		EventBus.emit(NetworkEvents.UPDATE_PROFILE, data);
	}

	static onSuccess() {
		FormMixin.SuccessMessage('Изменения успешны!');
	}

	static onError() {
		FormMixin.ErrorMessage('Произошла ошибка, попробуйте позже');
	}

	afterRender() {
		super.afterRender();
		const uploadInput = document.querySelector('.button-upload');

		const uploadHandler = (event) => {
			const avatar = document.querySelector('.profile__avatar');
			avatar.src = window.URL.createObjectURL(event.target.files[0]);
		};

		uploadInput.addEventListener('change', uploadHandler);

		const change = () => {
			window.removeEventListener('hashchange', change);
			uploadInput.removeEventListener('change', uploadHandler);
		};

		window.addEventListener('hashchange', change);
	}

}

export default ProfilePage;