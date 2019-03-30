import title from "../../blocks/title/title";
import leaderboard from "../../blocks/leaderboard/leaderboard";
import './leader.scss';
import button from "../../blocks/button/button";


class LeaderContent {
    constructor () {
        this.title = title;
        this.leaderboard = leaderboard;
        this.button = button;
    }

    //TODO когда бекенд переедет на БД переделаем, сейчас хардкод :(
    // TODO нужно переверстать таблицу
    render() {
        return `
                <div class="leader">
                    ${this.title('Таблица лидеров')}
                    ${this.leaderboard()}                    
                    <div class="paginator" style="display: flex">
                    <div style="margin-right: 5px">${this.button('1')}</div><div>${this.button('2')}</div>
                    </div>
                </div>
        `
    }
}

export default LeaderContent;