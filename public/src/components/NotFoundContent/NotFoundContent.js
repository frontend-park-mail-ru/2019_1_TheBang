import title from "../../blocks/title/title";
import './notfound.scss';

class NotFoundContent {
    constructor () {
        this.title = title;
    }

    render() {
        return `
            ${this.title('Oooooooooooops')}
            ${this.title('404 NOT FOUND')}
            <div class="notfound"></div>
        `
    }
}

export default NotFoundContent;