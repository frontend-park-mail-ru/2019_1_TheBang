import 'src/components/LoginContent/style.scss';
import loginComponent from 'src/components/LoginContent/template.pug';


class LoginContent {
	render() {
		const renderData = {
			title: 'Вход',
		};
		return loginComponent.call({}, renderData)
	}
}

export default LoginContent;