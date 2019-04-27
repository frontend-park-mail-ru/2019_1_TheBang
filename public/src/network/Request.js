import BackendResource from 'src/network/BackendResource';

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
	static request(path, method, data, url = [BackendResource.BASE_HTTPS, path].join('')) {
		const request = {
			mode: 'cors',
			method: method,
			body: data,
			credentials: 'include'
		};

		return fetchWithTimeout(url, request).then(res => {
			if (res && res.status > 299) {
				throw res.status;
			}
			return res;
		});
	}

	static gameRequest(path, method, data) {
		const url = [BackendResource.GAME_HTTPS, path].join('');

		return Request.request(path, method, data, url)
	}

	static chatRequest(path, method, data) {
		const url = [BackendResource.CHAT_HTTPS, path].join('');

		return Request.request(path, method, data, url)
	}

	static image(name) {
		return [BackendResource.BASE_HTTPS, 'icon/', name || 'default_img'].join('');
	}
}

export default Request;
