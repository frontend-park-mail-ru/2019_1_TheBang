import './form-item.scss';

const formItem = (name, itemType) => {
    switch (itemType) { 
        case 'text':
            return (
                `
                    <div class="form-item">
                        <input type="text" class="form-item__input" placeholder=${name}>
                        <i class="fas fa-user form-item__icon"></i>
                    </div>
                `
            );
        case 'password':
            return (
                `
                    <div class="form-item">
                        <input type="password" class="form-item__input form-item__input_pass" placeholder="Пароль">
                        <i class="fas fa-unlock form-item__icon"></i>
                        <div class="form-item__eye">
                            <i class="fa fa-eye form-item__eye-icon"></i>
                        </div>
                    </div>
                `
            );
        case 'password-repeat':
            return (
                `
                    <div class="form-item">
                        <input type="password" class="form-item__input form-item__input_pass_repeat" placeholder="Повторите пароль">
                        <i class="fas fa-unlock form-item__icon"></i>
                        <div class="form-item__eye">
                            <i class="fa fa-eye form-item__eye-icon"></i>
                        </div>
                    </div>
                `
            )
    }
};

export default formItem;