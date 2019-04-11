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
		const table = document.querySelector('.leaderboard');
		table.innerHTML = '';

		[].forEach.call(data, (item) => {
			// const tr = document.createElement('tr');
			// tr.classList.add('leaderboard', 'leaderboard__cell');
			// const tdPos = document.createElement('td');
			// const tdNickname = document.createElement('td');
			// const tdScore = document.createElement('td');
			// tdPos.innerText = item.posintion;
			// tr.appendChild(tdPos);
			// tdNickname.innerText = item.nickname;
			// tr.appendChild(tdNickname);
			// tdScore.innerText = item.score;
			// tr.appendChild(tdScore);

			// table.appendChild(tr);
			const row = document.createElement('div');
			row.classList.add('leaderboard__row', 'leaderboard__cell');

			const position = document.createElement('div');
			position.innerText = item.position;

			const nickname = document.createElement('div');
			nickname.innerText = item.nickname;

			const score = document.createElement('div');
			score.innerText = item.score;

			row.appendChild(position);
			row.appendChild(nickname);
			row.appendChild(score);

			table.appendChild(row);
		})
	}

	static onError() {
		const table = document.querySelector('.leaderboard');
		const paginator = document.querySelector('.paginator');
		table.innerHTML = '';
		paginator.innerHTML = '';
		const error = document.createElement('div');
		error.innerText = 'Не удалось загрузить данные, попробуйте позже';
		table.appendChild(error);
	}
}

export default LeadersPage;