import title from "../../blocks/title/title";
import leaderboard from "../../blocks/leaderboard/leaderboard";
import './leader.scss';
import button from "../../blocks/button/button";
import app from "../../app";

class LeaderContent {
    constructor () {
        this.title = title;
        this.leaderboard = leaderboard;
        LeaderContent.getDefaultData(1);
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

    static getDefaultData(pageNumber) {

        let request = {
            mode: 'cors',
            method: "GET",
            credentials: 'include'
        };

        let url = [app.constant.backend, `leaderbord/${pageNumber}`].join("");

        return fetch(url, request)
            .then( (res) => {
                if (res.status > 299) {
                    throw res.status;
                }
                return res.json()
            })
            .then((data) => {
                let table = document.querySelector('table tbody');
                table.innerHTML = "";

                [].forEach.call(data, (item) => {
                    let tr = document.createElement('tr');
                    let tdPos = document.createElement('td');
                    let tdNickname = document.createElement('td');
                    let tdScore = document.createElement('td');
                    tdPos.innerText = item.posintion;
                    tr.appendChild(tdPos);
                    tdNickname.innerText = item.nickname;
                    tr.appendChild(tdNickname);
                    tdScore.innerText = item.score;
                    tr.appendChild(tdScore);

                    table.appendChild(tr);
                })
            })
            .catch( (err) => {

            })
    }
}

export default LeaderContent;