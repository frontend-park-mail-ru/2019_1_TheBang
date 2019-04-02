import 'src/components/SignUpContent/style.scss';
import signupComponent from 'src/components/SignUpContent/template.pug';


class SignUpContent {
	render() {
		const renderData = {
			title: 'Регистрация',
		};
		return signupComponent.call({}, renderData);
	}
}

export default SignUpContent;