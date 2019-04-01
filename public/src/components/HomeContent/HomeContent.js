import "../../pug-mixins/title/title.scss";
import './home.scss'
import homeComponent from './home.pug'


class HomeContent {
    constructor () {
    }

    render() {
        let title = 'Название игры';
        return homeComponent.call({}, {title});
    }
}

export default HomeContent;