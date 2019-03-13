import title from "../../blocks/title/title";
import leaderboard from "../../blocks/leaderboard/leaderboard";
import './leader.scss';

class LeaderContent {
    constructor () {
        this.title = title;
        this.leaderboard = leaderboard;
    }

    render() {
        return `
                <div class="leader">
                    ${this.title('Таблица лидеров')}
                    ${this.leaderboard()}
                </div>
        `
    }
}

export default LeaderContent;