const backend = "http://127.0.0.1:8090/";
//this.backend = "https://stormy-fjord-97392.herokuapp.com/";

class Request {
    static image(name) {
        return [backend, 'icon/', name || "default_img"].join("")
    }

    static postForm(path, data) {
        let request = {
            mode: 'cors',
            method: "POST",
            body: data,
            credentials: 'include'
        };

        let url = [backend, path].join("");

        return fetch(url, request)
    }

    static post(path, data) {
        let request = {
            mode: 'cors',
            method: "POST",
            body: JSON.stringify(data),
            credentials: 'include'
        };

        let url = [backend, path].join("");

        return fetch(url, request)
    }

    static get(path) {
        let request = {
            mode: 'cors',
            method: "GET",
            credentials: 'include'
        };

        let url = [backend, path].join("");

        return fetch(url, request)
    }

    static put(path, data) {
        let request = {
            mode: 'cors',
            method: "PUT",
            body: JSON.stringify(data),
            credentials: 'include'
        };

        let url = [backend, path].join("");

        return fetch(url, request)

    }

    static delete() {
        let request = {
            mode: 'cors',
            method: "DELETE",
            credentials: 'include'
        };

        let url = [backend, 'auth'].join("");

        return fetch(url, request)
    }
}

export default Request;