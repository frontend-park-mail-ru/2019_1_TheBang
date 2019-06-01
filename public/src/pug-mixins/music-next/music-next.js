import 'src/pug-mixins/music-next/music-next.scss';

const musicNextController = () => {
    const buttons = document.querySelectorAll('.music-next');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const audio = document.querySelector('audio');
            console.log(audio);
            audio.pause();
            audio.remove();
            const currentSong = document.querySelector('.song.play');
            let nextSong = currentSong.nextElementSibling;
            if (!nextSong) {
                nextSong = currentSong.parentElement.firstElementChild;
                console.log(nextSong);
            };

            currentSong.classList.remove('play');
            nextSong.classList.add('play');
            
            const newAudio = new Audio(nextSong.getAttribute('src-audio'));
            newAudio.setAttribute('loop', '');
            newAudio.setAttribute('autoplay', 'true')
            newAudio.setAttribute('muted', 'muted');
            
            const buttons = document.querySelectorAll('.music__button-off');
            if (buttons) {
                buttons.forEach((button) => {
                    button.classList.remove('music__button-off');
                    button.classList.add('music__button-on');
                });
            };

            const target = document.querySelector('body');
            target.appendChild(newAudio);
        });
    });   
};

export default musicNextController;