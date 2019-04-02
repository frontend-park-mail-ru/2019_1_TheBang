import ProfileContent from 'src/components/ProfileContent/ProfileContent';
import FormMixin from 'src/views/mixins/FormMixin';

import NetworkEvents from 'src/events/NetworkEvents';
import EventBus from 'src/events/EventBus';
import Store from 'src/Store';


class ProfilePage extends FormMixin {
	constructor() {
		super(ProfileContent, Store.getUser());
	}

	SubmitRequest(form) {
		const file = form[3].files[0];
		const name = form[2].value;

		if (name===Store.name && !file) {
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

	static Success() {
		FormMixin.SuccessMessage('Изменения успешны!');
	}

	static Error() {
		FormMixin.ErrorMessage('Произошла ошибка, попробуйте позже');
	}

	afterRender() {
		super.afterRender();
		const uploadInput = document.querySelector('form')[3];

		uploadInput.addEventListener('change', (e) => {
			const avatar = document.querySelector('form img');
			avatar.src = window.URL.createObjectURL(e.target.files[0]);
		})
	}

}

export default ProfilePage;