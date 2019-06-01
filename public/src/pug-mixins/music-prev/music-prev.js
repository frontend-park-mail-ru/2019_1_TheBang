import 'src/pug-mixins/music-prev/music-prev.scss';

const musicPrevController = () => {
	const buttons = document.querySelectorAll('.music-prev');
	buttons.forEach((button) => {
		button.addEventListener('click', () => {
			const audio = document.querySelector('audio');
			console.log(audio);
			audio.pause();
			audio.remove();
			const currentSong = document.querySelector('.song.play');
			let prevSong = currentSong.previousElementSibling;
			if (!prevSong) {
				prevSong = currentSong.parentElement.lastElementChild;
				console.log(prevSong);
			}

			currentSong.classList.remove('play');
			prevSong.classList.add('play');
            
			const newAudio = new Audio(prevSong.getAttribute('src-audio'));
			newAudio.setAttribute('loop', '');
			newAudio.setAttribute('autoplay', 'true')
			newAudio.setAttribute('muted', 'muted');
            
			const buttons = document.querySelectorAll('.music__button-off');
			if (buttons) {
				buttons.forEach((button) => {
					button.classList.remove('music__button-off');
					button.classList.add('music__button-on');
				});
			}

			const target = document.querySelector('body');
			target.appendChild(newAudio);
		});
	});
};

export default musicPrevController;