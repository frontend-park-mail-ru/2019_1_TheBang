class SignUpContent {
    render() {
        return `
                   <div class="form-container">
                <h1 class="title">Регистрация</h1>
                <form class="form">
                    <div class="form-item">
                        <input type="input" class="form-item__input" placeholder="Логин">
                        <i class="fas fa-user form-item__icon"></i>
                    </div>
                    <div class="form-item">
                            <input type="input" class="form-item__input" placeholder="Никнейм">
                            <i class="fab fa-suse form-item__icon"></i>
                        </div>
                    <div class="form-item">
                        <input type="password" class="form-item__input form-item__input_pass" placeholder="Пароль">
                        <i class="fas fa-unlock form-item__icon"></i>
                        <div class="form-item__eye">
                            <!--<i class="fa fa-eye form-item__eye-icon"></i>-->
                        </div>
                    </div>
                    <div class="form-item">
                        <input type="password" class="form-item__input form-item__input_pass_repeat" placeholder="Повторите пароль">
                        <i class="fas fa-unlock form-item__icon"></i>
                        <div class="form-item__eye">
                            <!--<i class="fa fa-eye form-item__eye-icon"></i>-->
                        </div>
                    </div>
                    <button class="button">Зарегистрироваться</button>
                </form>
                <a class="link" href="#/auth">Войти</a> 
            </div>
        `
    }
}

export default SignUpContent ;