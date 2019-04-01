import "../../pug-mixins/title/title.scss";
import avatar from "../../pug-mixins/grid/img/avatar.svg";
import "../../pug-mixins/button/button.scss";
import '../../pug-mixins/grid/grid.scss';
import '../../pug-mixins/form-container/form-container.scss';
import profileComponent from "./profile.pug";

class ProfileContent {
    constructor (data) {
        this.nickname = data[0].nickname;
        this.name = data[0].name;
        this.score = data[0].score;
        this.avatar = data[0].photoUrl || `dist/${avatar}`;
    }

    render() {
        let title = 'Профиль';
        let nickname = this.nickname;
        let name = this.name;
        let score = this.score;
        let avatar = this.avatar;
        return profileComponent.call({}, {title, nickname, name, score, avatar})
    }
}

export default ProfileContent;