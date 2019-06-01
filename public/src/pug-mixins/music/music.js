import 'src/pug-mixins/music/music.scss';

const volumeController = () => {
	const inputs = document.querySelectorAll('.music__input');
	inputs.forEach((input) => {
		const audio = document.querySelector('audio');
		const buttons = document.querySelectorAll('.music__button');
		if (audio.paused) {
			buttons.forEach((button) => {
				button.classList.remove('music__button-on');
				button.classList.add('music__button-off');
			});
		} else {
			buttons.forEach((button) => {
				button.classList.add('music__button-on');
				button.classList.remove('music__button-off');
			});
		}

		input.addEventListener('change', () => {
			const audio = document.querySelector('audio');
			const buttons = document.querySelectorAll('.music__button');
			if (audio.paused) {
				audio.play();
				buttons.forEach((button) => {
					button.classList.add('music__button-on');
					button.classList.remove('music__button-off');
				});
			} else {
				audio.pause();
				buttons.forEach((button) => {
					button.classList.remove('music__button-on');
					button.classList.add('music__button-off');
				});
			}
		});
	});
}

export default volumeController;