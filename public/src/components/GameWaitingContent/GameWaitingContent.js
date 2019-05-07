import gameWaitingComponent from 'src/components/GameWaitingContent/template.pug';
import 'src/components/GameWaitingContent/style.scss';
import 'src/pug-mixins/animation/rotate.scss';

class GameWaitingContent {
    constructor(room) {
        this.room = room;
    }

    render() {
        const title = 'Вы в комнате ' + this.room;
        const subTitle = 'Ожидание других игрков...';

        const renderData = {
            title: title,
            subTitle: subTitle
        };

        return gameWaitingComponent.call({}, renderData);
    }
}

export default GameWaitingContent;