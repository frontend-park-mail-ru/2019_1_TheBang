import 'src/components/ErrorContent/style.scss';
import errorComponent from 'src/components/ErrorContent/template.pug';


class ErrorContent {
	constructor (message) {
		this.message = message
	}

	render() {
		const renderData = {
			message: this.message,
		};
		return errorComponent.call({}, renderData)
	}
}

export default ErrorContent;