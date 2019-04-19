import * as View from 'src/views';
import Permission from 'src/permission/Permission';

class Router {
	constructor() {
		this.routes = {};
	}

	addUrl(url, controller, name, constraint) {
		this.routes[url] = {controller: controller};
		controller.prototype.pageName = name;
		controller.prototype.constraint = constraint;
	}

	getController(path) {
		const route = this.routes[path];
		return route ? route.controller : this.routes['/not_found'].controller
	}
}

const router = new Router();

router.addUrl('/', View.HomePage, 'index');
router.addUrl('/profile', View.ProfilePage, 'profile', Permission.LOGIN_REQUIRED);
router.addUrl('/auth', View.LoginPage, 'auth', Permission.ANONYMOUS);
router.addUrl('/signup', View.SignUpPage, 'signup', Permission.ANONYMOUS);
router.addUrl('/authors', View.AuthorsPage, 'authors');
router.addUrl('/game', View.GamePage, 'game');
router.addUrl('/leaders', View.LeadersPage, 'leaders', Permission.LOGIN_REQUIRED);
router.addUrl('/chat', View.ChatPage, 'chat', Permission.LOGIN_REQUIRED);

router.addUrl('/lobby', View.GameLobbyPage, 'lobby', Permission.LOGIN_REQUIRED);

router.addUrl('/presentation', View.InfoPage, 'presentation', Permission.ANONYMOUS);

router.addUrl('/not_found', View.NotFoundPage, 'not_found');
router.addUrl('/unauthorized', View.UnAuthorizedPage, 'unauthorized');


export default router;