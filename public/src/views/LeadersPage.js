import LeaderContent from 'src/components/LeaderContent/LeaderContent';
import ContentMixin from 'src/views/mixins/ContentMixin';
import 'src/pug-mixins/hidden/hidden.scss';

import EventBus from 'src/events/EventBus';
import NetworkEvents from 'src/events/NetworkEvents';

const PAGE_COUNT_ITEMS = 6;
// const CACHE_PAGE = [];
let CURRENT_PAGE = 1;


class LeadersPage extends ContentMixin {
	constructor() {
		super(LeaderContent);
	}

	afterRender() {
		super.afterRender();
		LeadersPage.setPageData();

		const prevPage = document.querySelector('.paginator__left');
		const nextPage = document.querySelector('.paginator__right');

		nextPage.addEventListener('click', () => {
			CURRENT_PAGE++;
			LeadersPage.setPageData();
		});

		prevPage.addEventListener('click', () => {
			CURRENT_PAGE--;
			LeadersPage.setPageData();
		});
	}

	static setPageData() {
		LeadersPage.checkPageExist();

		// if (CACHE_PAGE[CURRENT_PAGE]) {
		// 	LeadersPage.createRows(CACHE_PAGE[CURRENT_PAGE]);
		// 	return
		// }

		EventBus.emit(NetworkEvents.GET_LEADERBOARD, CURRENT_PAGE);
	}

	static checkPageExist() {
		const prev = CURRENT_PAGE - 1;
		const next = CURRENT_PAGE + 1;
		// const prevPage = document.querySelector('.paginator__left');
		// const nextPage = document.querySelector('.paginator__right');

		// if (CACHE_PAGE[prev]) {
		// 	prevPage.classList.remove('hidden');
		// } else if (CACHE_PAGE[prev] === null) {
		// 	prevPage.classList.add('hidden');
		// } else {
		EventBus.emit(NetworkEvents.CHECK_LEADERBOARD, prev);
		// }

		// if (CACHE_PAGE[next]) {
		// 	nextPage.classList.remove('hidden');
		// } else if (CACHE_PAGE[next] === null) {
		// 	nextPage.classList.add('hidden');
		// } else {
		EventBus.emit(NetworkEvents.CHECK_LEADERBOARD, next);
		// }
	}

	static createRows(data) {
		const table = document.querySelector('.leaderboard-js');
		table.innerHTML = '';
		const startPosition = (CURRENT_PAGE - 1) * PAGE_COUNT_ITEMS + 1;

		[].forEach.call(data, (item, idx) => {
			const row = document.createElement('div');
			row.classList.add('leaderboard__row', 'leaderboard__cell');

			const position = document.createElement('div');

			position.innerText = startPosition + idx;

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

	static onSuccess(result) {
		const data = result.data;
		const pageNumber = Number(result.pageNumber);

		// CACHE_PAGE[pageNumber] = data;
		LeadersPage.createRows(data, pageNumber);
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

	static onExistPage(result) {
		const pageNumber = result.pageNumber;
		// const data = result.data;
		const prev = CURRENT_PAGE - 1;
		// const next = CURRENT_PAGE + 1;
		const prevPage = document.querySelector('.paginator__left');
		const nextPage = document.querySelector('.paginator__right');

		if (pageNumber === prev) {
			prevPage.classList.remove('hidden');
			// CACHE_PAGE[prev] = data;
		} else {
			nextPage.classList.remove('hidden');
			// CACHE_PAGE[next] = data;
		}
	}

	static onNotExistPage(pageNumber) {
		const prev = CURRENT_PAGE - 1;
		// const next = CURRENT_PAGE + 1;
		const prevPage = document.querySelector('.paginator__left');
		const nextPage = document.querySelector('.paginator__right');

		if (pageNumber === prev) {
			prevPage.classList.add('hidden');
			// CACHE_PAGE[prev] = null;
		} else {
			nextPage.classList.add('hidden');
			// CACHE_PAGE[next] = null;
		}
	}
}

export default LeadersPage;