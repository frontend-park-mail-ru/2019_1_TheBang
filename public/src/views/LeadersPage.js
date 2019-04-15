import LeaderContent from 'src/components/LeaderContent/LeaderContent';
import ContentMixin from 'src/views/mixins/ContentMixin';
import 'src/pug-mixins/hidden/hidden.scss';

import EventBus from 'src/events/EventBus';
import NetworkEvents from 'src/events/NetworkEvents';


class LeadersPage extends ContentMixin {
	constructor() {
		super(LeaderContent);
	}

	afterRender() {
		super.afterRender();
		EventBus.emit(NetworkEvents.GET_LEADERBOARD, 1);

		const baseURL = window.location.href;
		const newURL = baseURL + '/1';
		history.pushState(null, null, newURL);

		// const pages = document.getElementsByClassName('paginator')[0].children;

		// [].forEach.call(pages, (page) => {
		// 	page.addEventListener('click', () => {
		// 		const pageNumber = page.innerText;
		// 		EventBus.emit(NetworkEvents.GET_LEADERBOARD, pageNumber);
		// 	})


		// })

		const prevPage = document.querySelector('.paginator__left');
		prevPage.classList.add('hidden');
		const nextPage = document.querySelector('.paginator__right');

		function urlChange(pageNumber) {
			const hash = window.location.hash.split('/').slice(0, 2).join('/');
			const baseURL = window.location.protocol + '//' + window.location.host + hash;
			const newURL = baseURL + '/' + pageNumber;
			history.pushState(null, null, newURL);
			EventBus.emit(NetworkEvents.GET_LEADERBOARD, pageNumber);
		}

		prevPage.addEventListener('click', () => {
			const pageNumber = +window.location.hash.split('/')[2] - 1;
			if (pageNumber == 1) {
				prevPage.classList.add('hidden');
			}
			urlChange(pageNumber);
		})

		nextPage.addEventListener('click', () => {
			const pageNumber = +window.location.hash.split('/')[2] + 1;
			if (pageNumber == 2) {
				prevPage.classList.remove('hidden');
			}
			urlChange(pageNumber);
		})
	}

	static onSuccess(data) {
		const table = document.querySelector('.leaderboard-js');
		table.innerHTML = '';

		[].forEach.call(data, (item) => {
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