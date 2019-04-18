import 'src/components/LeaderContent/style.scss';
import leaderComponent from 'src/components/LeaderContent/template.pug';


class LeaderContent {

	render() {
		const renderData = {
			title: 'Таблица лидеров',
		};
		return leaderComponent.call({}, renderData)
	}
}

export default LeaderContent;