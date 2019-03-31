import Request from "./network/Request";

class Store {
    isAuth() {
        return this.nickname;
    }

    updateUser(data) {
        if (data) {
            this.setUser(data)
        } else {
            this.setAnonymous();
        }
    }

    setAnonymous() {
        this.nickname = undefined;
        this.name = undefined;
        this.photo = undefined;
        this.score = undefined;
        this.photoUrl = undefined;
    }

    setUser(data) {
        this.nickname = data.nickname;
        this.name = data.name;
        this.score = data.score;
        this.photo = data.photo;
        this.photoUrl = Request.image(this.photo)
    }

    getUser() {
        return {
            nickname: this.nickname,
            name: this.name,
            score: this.score,
            photo: this.photo,
            photoUrl: Request.image(this.photo)
        }
    }

}

export default new Store();