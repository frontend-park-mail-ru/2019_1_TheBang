import title from "../../blocks/title/title";
import avatar from "../../blocks/grid/img/avatar.svg";
import button from "../../blocks/button/button";

// переделать профиль

class ProfileContent {
    constructor () {
        this.title = title;
        this.button = button;
    }

    render() {
        return `
            <div class="form-container">
                ${this.title('Профиль')}
                <form class="grid">
                
                    <img src=dist/${avatar} alt="Avatar" class="grid__avatar">
                    
                    
                    <div class="form-item grid__login">
                        <input type="input" class="form-item__input" placeholder="Логин">
                        <i class="fas fa-user form-item__icon"></i>
                    </div>
                    
                    
                    <div class="form-item grid__nickname">
                        <input type="input" class="form-item__input" placeholder="Никнейм">
                        <i class="fab fa-suse form-item__icon"></i>
                    </div>
                    
                    
                    <div class="form-item grid__password">
                        <input type="password" class="form-item__input" placeholder="Пароль">
                        <i class="fas fa-unlock form-item__icon"></i>
                        <div class="form-item__eye">
                            <i class="fa fa-eye form-item__eye-icon"></i>
                        </div>
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