import 'src/components/LeaderContent/style.scss';
import leaderComponent from 'src/components/LeaderContent/template.pug';


class LeaderContent {

	// TODO нужно переверстать таблицу
	render() {
		const renderData = {
			title: 'Таблица лидеров',
		};
		return leaderComponent.call({}, renderData)
	}
}

export default LeaderContent;