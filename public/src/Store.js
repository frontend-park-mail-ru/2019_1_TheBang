import app from "./app";

class Store {
    constructor() {
        this.nickname = "anonymous";
        this.name = "anonymous";
        this.photo = "";
        this.score = 0;
        this.photoUrl = "";
    }

    isAuth() {
        return this.nickname !== "anonymous";
    }

    async getUser() {
        console.log("i get user");

        await this.requestUser();
        await this.getAvatar();
        return
    }


    async requestUser() {
        let request = {
            mode: 'cors',
            method: "GET",
            credentials: 'include'
        };

        let url = [app.constant.backend, 'user'].join("");

        return await fetch(url, request).then( (res) => {
            if (res.status > 299) {
                throw res.status;
            }
            return res.json()
        })
            .then((data) => {
                this.nickname = data.nickname;
                this.name = data.name;
                this.score = data.score;
                this.photo = data.photo;
            })
            .catch( (err) => {
                this.nickname = "anonymous";
                this.name = "anonymous";
                this.photo = "";
                this.score = 0;
                this.photoUrl = "";
                console.log(err)
            });
    }

    async getAvatar() {
        let request = {
            mode: 'cors',
            method: "GET",
            credentials: 'include'
        };

        let url = [app.constant.backend, 'icon/', this.photo || "default_img"].join("");

        return await fetch(url, request)
            .then( (res) => {
                if (res.status > 299) {
                    throw res.status;
                }
                this.photoUrl = res.url;
                return res
            })
            .catch( (err) => {
                console.log(err)
            });
    }

}

export default Store;