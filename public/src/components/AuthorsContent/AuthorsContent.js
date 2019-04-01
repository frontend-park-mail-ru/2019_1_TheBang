import "../../pug-mixins/title/title.scss";
import "../../pug-mixins/author/author.scss";
import authorComponent from "./authors.pug";

class AuthorsContent {
    constructor () {
    }

    render() {
        let title = "Авторы";
        return authorComponent.call({}, {title})
    }
}

export default AuthorsContent;