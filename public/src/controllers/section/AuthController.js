import app from "../../app";

class AuthController {
    constructor() {
        this.authUser = app.store.isAuth();
        this.err = this.checkConstraint();
    }

    checkConstraint() {
        switch (this.constraint) {
            case app.constant.authUser:
                if (!this.authUser) {
                    document.location.replace("#/unauthorized"); // моментально, ждет конца загрузки
                    return true;
                }
                break;
            case app.constant.unauthUser:
                if (this.authUser) {
                    document.location.replace("#/not_found");
                    return true;
                }
                break;
        }
        return false;
    }
}

export default AuthController;