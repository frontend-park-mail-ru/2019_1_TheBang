import LeaderContent from 'src/components/LeaderContent/LeaderContent';
import ContentMixin from 'src/views/mixins/ContentMixin';

import EventBus from 'src/events/EventBus';
import NetworkEvents from 'src/events/NetworkEvents';


class LeadersPage extends ContentMixin {
	constructor() {
		super(LeaderContent);
	}

	afterRender() {
		super.afterRender();
		EventBus.emit(NetworkEvents.GET_LEADERBOARD, 1);

		const pages = document.getElementsByClassName('paginator')[0].children;

		[].forEach.call(pages, (page) => {
			page.addEventListener('click', () => {
				const pageNumber = page.innerText;
				EventBus.emit(NetworkEvents.GET_LEADERBOARD, pageNumber);
			})


		})

	}

	static onSuccess(data) {
		const table = document.querySelector('table tbody');
		table.innerHTML = '';

		[].forEach.call(data, (item) => {
			const tr = document.createElement('tr');
			const tdPos = document.createElement('td');
			const tdNickname = document.createElement('td');
			const tdScore = document.createElement('td');
			tdPos.innerText = item.posintion;
			tr.appendChild(tdPos);
			tdNickname.innerText = item.nickname;
			tr.appendChild(tdNickname);
			tdScore.innerText = item.score;
			tr.appendChild(tdScore);

			table.appendChild(tr);
		})
	}

	static onError() {
		const table = document.querySelector('table tbody');
		table.innerHTML = '';
		const tr = document.createElement('tr');
		tr.innerText = 'Не удалось загрузить данные, попробуйте позже'
	}
}

export default LeadersPage;