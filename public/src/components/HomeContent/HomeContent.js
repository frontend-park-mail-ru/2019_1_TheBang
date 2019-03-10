import title from "../../blocks/title/title";

class HomeContent {
    constructor () {
        this.title = title;
    }
    render() {
        return `
            <div class="home">
                ${this.title('Название игры')}
                <div class="home__img"></div>
                <a href="#"><div class="home__button"></div></a>
            </div>
        `
    }
}

export default HomeContent;