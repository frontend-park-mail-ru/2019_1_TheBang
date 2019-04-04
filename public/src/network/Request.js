const backend = 'https://stormy-fjord-97392.herokuapp.com/';
// const backend = 'http://127.0.0.1:8090/';

/**
 * Запросы на бекенд
 */
class Request {
	static request(path, method, data) {
		const request = {
			mode: 'cors',
			method: method,
			body: data,
			credentials: 'include'
		};

		const url = [backend, path].join('');

		return fetch(url, request).then((res) => {
			if (res && res.status > 299) {
				throw res.status;
			}
			return res.json()
		})
	}


	static image(name) {
		return [backend, 'icon/', name || 'default_img'].join('')
	}
}

export default Request;