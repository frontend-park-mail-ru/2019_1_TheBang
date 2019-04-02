import Request from 'src/network/Request';


class Store {
	isAuth() {
		return this.nickname;
	}

	updateUser(data) {
		this.nickname = data && data.nickname;
		this.name = data && data.name;
		this.score = data && data.score;
		this.photo = data && Request.image(data.photo)
	}

	getUser() {
		return {
			nickname: this.nickname,
			name: this.name,
			score: this.score,
			photo: this.photo,
		}
	}

}

export default new Store();