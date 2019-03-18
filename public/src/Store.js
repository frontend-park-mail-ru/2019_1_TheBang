import app from "./app";

class Store {
    constructor() {
        this.setAnonymous()
    }

    isAuth() {
        return this.nickname !== "anonymous";
    }

    getUser() {
        let request = {
            mode: 'cors',
            method: "GET",
            credentials: 'include'
        };

        let url = [app.constant.backend, 'user'].join("");

        return fetch(url, request).then( (res) => {
            if (res.status > 299) {
                throw res.status;
            }
            return res.json()
        })
            .then((data) => {
                this.setUser(data)
            })
            .catch( () => {
                this.setAnonymous();
            });
    }

    setAnonymous() {
        this.nickname = "anonymous";
        this.name = "anonymous";
        this.photo = "";
        this.score = 0;
        this.photoUrl = "";
    }

    setUser(data) {
        this.nickname = data.nickname;
        this.name = data.name;
        this.score = data.score;
        this.photo = data.photo;
        this.photoUrl = [app.constant.backend, 'icon/', this.photo || "default_img"].join("")
    }

}

export default Store;