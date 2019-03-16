import title from "../../blocks/title/title";
import './home.scss'

class HomeContent {
    constructor () {
        this.title = title;
    }
    render() {
        return `
            <div class="home">
                ${this.title('Название игры')}
                <div class="home__img"></div>
                <a href="#/game"><div class="home__button"></div></a>
            </div>
        `
    }
}

export default HomeContent;