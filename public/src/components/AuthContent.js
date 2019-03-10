class AuthContent {
    render() {
        return `
                    <div class="form-container">
                <h1 class="title">Вход</h1>
                <form class="form">
                
                    <div class="form-item">
                        <input type="text" class="form-item__input" placeholder="Логин">
                        <i class="fas fa-user form-item__icon"></i>
                    </div>
                    
                    <div class="form-item">
                        <input type="password" class="form-item__input" placeholder="Пароль">
                        <i class="fas fa-unlock form-item__icon"></i>
                        <div class="form-item__eye">
                            <i class="fa fa-eye form-item__eye-icon"></i>
                        </div>
                    </div>
                    
                    <div class="password">
                        <label class="checkbox">
                            <input class="checkbox__input" type="checkbox">
                            <span class="checkbox__custom"></span>
                            <span>Запомнить</span>
                        </label>
                        <a class="password__link" href="#">Забыли пароль?</a>
                    </div>
                    
                    <button class="button">Войти</button>
                </form>
                <a class="link" href="#/signup">Зарегистрироваться</a> 
            </div>
        `
    }
}

export default AuthContent;