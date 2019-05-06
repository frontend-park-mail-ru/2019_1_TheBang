import 'src/components/HomeContent/style.scss'
import 'src/pug-mixins/animation/rotate.scss'
import homeComponent from 'src/components/HomeContent/template.pug'


class HomeContent {
	constructor (isAuth) {
		this.isAuth = Boolean(isAuth);
	}

	render() {
		const renderData = {
			title: 'TheBang!',
			is_auth: this.isAuth,
		};
		return homeComponent.call({}, renderData);
	}
}

export default HomeContent;