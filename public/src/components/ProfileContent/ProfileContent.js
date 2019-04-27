import 'src/components/ProfileContent/style.scss';
import 'src/pug-mixins/score/score.scss';
import profileComponent from 'src/components/ProfileContent/template.pug';

class ProfileContent {
	constructor (data) {
		this.nickname = data.nickname;
		this.name = data.name;
		this.score = data.score;
		// this.score = 123;
		this.avatar = data.photo;
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