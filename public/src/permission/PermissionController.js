import Permission from "./Permission";
import Store from "../Store";

class PermissionController {
    static checkConstraint(controller) {
        let auth = Store.isAuth();

        switch (controller.constraint) {
            case Permission.LoginRequired:
                if (!auth) {
                    document.location.replace("#/unauthorized");
                    return false;
                }
                break;
            case Permission.Anonymous:
                if (auth) {
                    document.location.replace("#/not_found");
                    return false;
                }
                break;
        }
        return true;
    }
}

export default PermissionController;