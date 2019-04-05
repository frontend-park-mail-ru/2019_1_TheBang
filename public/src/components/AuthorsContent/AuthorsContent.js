import 'src/components/AuthorsContent/style.scss';
import authorComponent from 'src/components/AuthorsContent/template.pug';


class AuthorsContent {
	render() {
		const renderData = {
			title: 'Авторы',
		};
		return authorComponent.call({}, renderData)
	}
}

export default AuthorsContent;