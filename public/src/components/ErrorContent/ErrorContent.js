import title from "../../blocks/title/title";
import './notfound.scss';

class ErrorContent {
    constructor (message) {
        this.title = title;
        this.message = message
    }

    render() {
        console.log('draw error content');
        return `
            ${this.title('Oooooooooooops')}
            ${this.title(this.message)}
            <div class="notfound"></div>
        `
    }
}

export default ErrorContent;