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

	static vkRequest(path, method, data) {
		const url = [BackendResource.VK_CHAT, path].join('');

		return Request.request(path, method, data, url)
	}

	// будем отдавать с диска как статику
	static image(name) {
		return ['/api/auth/icon/', name || 'default_img'].join('');
	}
}

export default Request;
