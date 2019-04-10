const backend = 'https://stormy-fjord-97392.herokuapp.com/';
// const backend = 'http://127.0.0.1:8090/';

const game_backend = 'https://the-bang-game-server.herokuapp.com/';
// const game_backend = 'http://127.0.0.1:8081/';
/**
 * Запросы на бекенд
 */

function fetchWithTimeout(url, request, timeout = 3000) {
	return Promise.race([
		fetch(url, request),
		new Promise((_, reject) =>
			setTimeout(() => reject(new Error('timeout')), timeout)
		)
	]);
}

class Request {
	static request(path, method, data) {
		const request = {
			mode: 'cors',
			method: method,
			body: data,
			credentials: 'include'
		};

		const url = [backend, path].join('');

		return fetchWithTimeout(url, request).then((res) => {
			if (res && res.status > 299) {
				throw res.status;
			}
			return res
		})
	}

	static gameRequest(path, method, data) {
		const request = {
			mode: 'cors',
			method: method,
			body: data,
			credentials: 'include'
		};

		const url = [game_backend, path].join('');

		return fetchWithTimeout(url, request).then((res) => {
			if (res && res.status > 299) {
				throw res.status;
			}
			return res
		})
	}


	static image(name) {
		return [backend, 'icon/', name || 'default_img'].join('')
	}
}

export default Request;