const backend = 'https://stormy-fjord-97392.herokuapp.com/';
// const backend = "http://127.0.0.1:8090/";

/**
 * Запросы на бекенд
 */
class Request {
	static image(name) {
		return [backend, 'icon/', name || 'default_img'].join('')
	}

	static postForm(path, data) {
		const request = {
			mode: 'cors',
			method: 'POST',
			body: data,
			credentials: 'include'
		};

		const url = [backend, path].join('');

		return fetch(url, request)
	}

	static post(path, data) {
		const request = {
			mode: 'cors',
			method: 'POST',
			body: JSON.stringify(data),
			credentials: 'include'
		};

		const url = [backend, path].join('');

		return fetch(url, request)
	}

	static get(path) {
		const request = {
			mode: 'cors',
			method: 'GET',
			credentials: 'include'
		};

		const url = [backend, path].join('');

		return fetch(url, request)
	}

	static put(path, data) {
		const request = {
			mode: 'cors',
			method: 'PUT',
			body: JSON.stringify(data),
			credentials: 'include'
		};

		const url = [backend, path].join('');

		return fetch(url, request)

	}

	static delete() {
		const request = {
			mode: 'cors',
			method: 'DELETE',
			credentials: 'include'
		};

		const url = [backend, 'auth'].join('');

		return fetch(url, request)
	}
}

export default Request;