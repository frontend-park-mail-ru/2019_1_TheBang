import 'css/style.scss';

import * as View from 'src/views/index';

import Router from 'src/Router';
import Store from 'src/Store';

import EventBus from 'src/events/EventBus';
import NetworkEvents from 'src/events/NetworkEvents';
import Network from 'src/network/Network';
import PageEvents from 'src/events/PageEvents';
import PermissionController from 'src/permission/PermissionController';
import Permission from 'src/permission/Permission';


EventBus.on(PageEvents.UPDATE_STORE, Store.updateUser.bind(Store));
EventBus.on(PageEvents.BASE_COMPONENTS_RENDER, View.BasePage.render);

EventBus.on(NetworkEvents.GET_USER, Network.getUser);
EventBus.on(PageEvents.LOAD_PAGE, pageLoader);

EventBus.on(NetworkEvents.SIGNUP, Network.signUpUser);
EventBus.on(PageEvents.SIGNUP_SUCCESS, View.SignUpPage.Success);
EventBus.on(PageEvents.SIGNUP_ERROR, View.SignUpPage.Error);

EventBus.on(NetworkEvents.LOGIN, Network.loginUser);
EventBus.on(PageEvents.LOGIN_SUCCESS, View.LoginPage.Success);
EventBus.on(PageEvents.LOGIN_ERROR, View.LoginPage.Error);

EventBus.on(NetworkEvents.UPDATE_PROFILE, Network.updateUser);
EventBus.on(PageEvents.UPDATE_PROFILE_SUCCESS, View.ProfilePage.Success);
EventBus.on(PageEvents.UPDATE_PROFILE_ERROR, View.ProfilePage.Error);

EventBus.on(NetworkEvents.LOGOUT, Network.logoutUser);
EventBus.on(PageEvents.LOGOUT_SUCCESS, View.HomePage.Success);

EventBus.on(NetworkEvents.GET_LEADERBOARD, Network.getLeaderboard);
EventBus.on(PageEvents.GET_LEADERBOARD_SUCCESS, View.LeadersPage.Success);
EventBus.on(PageEvents.GET_LEADERBOARD_ERROR, View.LeadersPage.Error);


const router = new Router();

router.addUrl('/', View.HomePage, 'index');
router.addUrl('/profile', View.ProfilePage, 'profile', Permission.LOGIN_REQUIRED);
router.addUrl('/auth', View.LoginPage, 'auth', Permission.ANONYMOUS);
router.addUrl('/signup', View.SignUpPage, 'signup', Permission.ANONYMOUS);
router.addUrl('/authors', View.AuthorsPage, 'authors');
router.addUrl('/game', View.GamePage, 'game', Permission.LOGIN_REQUIRED);
router.addUrl('/leaders', View.LeadersPage, 'leaders', Permission.LOGIN_REQUIRED);

router.addUrl('/not_found', View.NotFoundPage, 'not_found');
router.addUrl('/unauthorized', View.UnAuthorizedPage, 'unauthorized');

/**
 * Подгрузка view для каждой страницы при переходе по url
 */
function pageLoader() {
	const url = location.hash.slice(1) || '/';
	let controller = router.getController(url);

	controller = new controller();

	if (!PermissionController.checkConstraint(controller)) {
		return
	}

	if (!controller.getTargetRender()) {
		EventBus.emit(PageEvents.BASE_COMPONENTS_RENDER);
	}

	const element = controller.getTargetRender();

	element.innerHTML = controller.render();

	// Дорисовываем активацию кнопочек, разные eventListener на формы, logout
	controller.afterRender()
}

/**
 * Первичная загрузка страницы, получаение данных о пользователе
 */
function firstLoad() {
	EventBus.emit(NetworkEvents.GET_USER);
}


window.addEventListener('hashchange', pageLoader);
window.addEventListener('load', firstLoad);
