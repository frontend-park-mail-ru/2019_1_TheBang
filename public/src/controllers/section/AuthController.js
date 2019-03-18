import app from "../../app";

class AuthController {
    constructor() {
        this.err = this.checkConstraint();
    }

    checkConstraint() {
        let auth = app.store.isAuth();

        switch (this.constraint) {
            case app.constant.authUser:
                if (!auth) {
                    document.location.replace("#/unauthorized"); // моментально, ждет конца загрузки
                    return true;
                }
                break;
            case app.constant.unauthUser:
                if (auth) {
                    document.location.replace("#/not_found");
                    return true;
                }
                break;
        }
        return false;
    }
}

export default AuthController;