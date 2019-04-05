import 'src/components/ProfileContent/style.scss'
import profileComponent from 'src/components/ProfileContent/template.pug';

class ProfileContent {
	constructor (data) {
		this.nickname = data[0].nickname;
		this.name = data[0].name;
		this.score = data[0].score;
		this.avatar = data[0].photo;
	}

	render() {
		const renderData = {
			title: 'Профиль',
			nickname: this.nickname,
			name: this.name,
			score: this.score,
			avatar: this.avatar
		};
		return profileComponent.call({}, renderData)
	}
}

export default ProfileContent;