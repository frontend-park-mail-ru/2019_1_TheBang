import 'src/components/HomeContent/style.scss'
import homeComponent from 'src/components/HomeContent/template.pug'


class HomeContent {
	render() {
		const renderData = {
			title: 'Название игры',
		};
		return homeComponent.call({}, renderData);
	}
}

export default HomeContent;