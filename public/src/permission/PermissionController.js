import Permission from 'src/permission/Permission';
import Store from 'src/Store';


/**
 * Разруливаем доступ пользователей к страницам
 */
class PermissionController {
	static checkConstraint(controller) {
		const auth = Store.isAuth();

		switch (controller.constraint) {
		case Permission.LOGIN_REQUIRED:
			if (!auth) {
				document.location.replace('#/unauthorized');
				return false;
			}
			break;
		case Permission.ANONYMOUS:
			if (auth) {
				document.location.replace('#/not_found');
				return false;
			}
			break;
		}
		return true;
	}
}

export default PermissionController;