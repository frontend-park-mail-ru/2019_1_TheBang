import LeaderContent from "../components/LeaderContent/LeaderContent";
import HomeController from "./section/HomeController";

import EventBus from "../events/EventBus";
import NetworkEvents from "../events/NetworkEvents";


class LeadersPage extends HomeController {
    constructor() {
        super(LeaderContent);
    }

    afterRender() {
        super.afterRender();
        EventBus.emit(NetworkEvents.GetLeaderboard, 1);

        let pages = document.getElementsByClassName('paginator')[0].children;

        [].forEach.call(pages, (page) => {
            page.addEventListener('click', () => {
                let pageNumber = page.innerText;
                EventBus.emit(NetworkEvents.GetLeaderboard, pageNumber);
            })


        })

    }

    static Success(data) {
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
    }

    static Error() {
        let table = document.querySelector('table tbody');
        table.innerHTML = "";
        let tr = document.createElement('tr');
        tr.innerText = 'Не удалось загрузить данные, попробуйте позже'
    }
}

export default LeadersPage;