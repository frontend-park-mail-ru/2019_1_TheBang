import "../../pug-mixins/title/title.scss";
import "../../pug-mixins/leaderboard/leaderboard.scss";
import './leader.scss';
import "../../pug-mixins/button/button.scss";
import leaderComponent from "./leader.pug";

class LeaderContent {
    constructor () {
    }

    // TODO нужно переверстать таблицу
    render() {
        let title = 'Таблица лидеров';
        return leaderComponent.call({}, {title})
    }
}

export default LeaderContent;