import "../../pug-mixins/title/title.scss";
import './notfound.scss';
import errorComponent from "./error.pug";

class ErrorContent {
    constructor (message) {
        this.message = message
    }

    render() {
        let message = this.message;
        return errorComponent.call({}, {message})
    }
}

export default ErrorContent;