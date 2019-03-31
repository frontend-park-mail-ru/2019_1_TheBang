import title from "../../blocks/title/title";
import avatar from "../../blocks/grid/img/avatar.svg";
import button from "../../blocks/button/button";
import '../../blocks/grid/grid.scss';
import '../../blocks/form-container/form-container.scss';


class ProfileContent {
    constructor (data) {
        this.title = title;
        this.button = button;
        this.nickname = data[0].nickname;
        this.name = data[0].name;
        this.score = data[0].score;
        this.avatar = data[0].photoUrl || `dist/${avatar}`;
    }

    // TODO нужно доверстать профиль :)
    render() {
        return `
            <div class="form-container">
                ${this.title('Профиль')}
                <form class="grid">
                
                    <img src=${this.avatar} alt="Avatar" class="grid__avatar">
                    
                    
                    <div class="form-item grid__login">
                        <input type="input" disabled class="form-item__input" value="${this.nickname}" placeholder="Логин">
                        <i class="fas fa-user form-item__icon"></i>
                    </div>
                    
                    <div class="form-item grid__nickname">
                        <input type="text" disabled class="form-item__input" value="Score: ${this.score}">
                        
                        <div class="form-item__eye">
                            
                        </div>
                    </div>
                    
                    <div class="form-item grid__password">
                        <input type="input" class="form-item__input" value="${this.name}" placeholder="Никнейм">
                        <i class="fab fa-suse form-item__icon"></i>
                    </div>
                    
                   
                    
                    <input type="file" class="grid__upload">
                    <i class="fa fa-upload fa-3x grid__upload-icon" aria-hidden="true"></i>
                    
                    <button class="button grid__button">Сохранить</button>
                    
                </form>
              
            </div>
        `
    }
}

export default ProfileContent;