import 'src/pug-mixins/music/music.scss';

const volumeController = () => {
    const inputs = document.querySelectorAll('.music__input');
    inputs.forEach((input) => {
        input.addEventListener('change', () => {
            const players = document.querySelectorAll('audio');
            const buttons = document.querySelectorAll('.music__button');
            if (input.checked) {
                players.forEach((player) => {
                    player.pause();
                });
                buttons.forEach((button) => {
                    button.classList.remove('music__button-on');
                    button.classList.add('music__button-off');
                });
            } else {
                players.forEach((player) => {
                    player.play();
                });
                buttons.forEach((button) => {
                    button.classList.add('music__button-on');
                    button.classList.remove('music__button-off');
                });
            };
        });
    });
}

export default volumeController;