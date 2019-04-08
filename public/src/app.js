import 'css/style.scss';

import * as View from 'src/views';

import Router from 'src/Router';
import Store from 'src/Store';

import EventBus from 'src/events/EventBus';
import NetworkEvents from 'src/events/NetworkEvents';
import Network from 'src/network/Network';
import PageEvents from 'src/events/PageEvents';
import PermissionController from 'src/permission/PermissionController';
import Permission from 'src/permission/Permission';


EventBus.on(PageEvents.UPDATE_STORE, Store.onUpdateUser.bind(Store));
EventBus.on(PageEvents.BASE_COMPONENTS_RENDER, View.BasePage.onRender);

EventBus.on(NetworkEvents.GET_USER, Network.onGetUser);
EventBus.on(PageEvents.LOAD_PAGE, onPageLoad);

EventBus.on(NetworkEvents.SIGNUP, Network.onSignUpUser);
EventBus.on(PageEvents.SIGNUP_SUCCESS, View.SignUpPage.onSuccess);
EventBus.on(PageEvents.SIGNUP_ERROR, View.SignUpPage.onError);

EventBus.on(NetworkEvents.LOGIN, Network.onLoginUser);
EventBus.on(PageEvents.LOGIN_SUCCESS, View.LoginPage.onSuccess);
EventBus.on(PageEvents.LOGIN_ERROR, View.LoginPage.onError);

EventBus.on(NetworkEvents.UPDATE_PROFILE, Network.onUpdateUser);
EventBus.on(PageEvents.UPDATE_PROFILE_SUCCESS, View.ProfilePage.onSuccess);
EventBus.on(PageEvents.UPDATE_PROFILE_ERROR, View.ProfilePage.onError);

EventBus.on(NetworkEvents.LOGOUT, Network.onLogoutUser);
EventBus.on(PageEvents.LOGOUT_SUCCESS, View.HomePage.onSuccess);

EventBus.on(NetworkEvents.GET_LEADERBOARD, Network.onGetLeaderboard);
EventBus.on(PageEvents.GET_LEADERBOARD_SUCCESS, View.LeadersPage.onSuccess);
EventBus.on(PageEvents.GET_LEADERBOARD_ERROR, View.LeadersPage.onError);


const router = new Router();

router.addUrl('/', View.HomePage, 'index');
router.addUrl('/profile', View.ProfilePage, 'profile', Permission.LOGIN_REQUIRED);
router.addUrl('/auth', View.LoginPage, 'auth', Permission.ANONYMOUS);
router.addUrl('/signup', View.SignUpPage, 'signup', Permission.ANONYMOUS);
router.addUrl('/authors', View.AuthorsPage, 'authors');
router.addUrl('/game', View.GamePage, 'game', Permission.LOGIN_REQUIRED);
router.addUrl('/leaders', View.LeadersPage, 'leaders', Permission.LOGIN_REQUIRED);
router.addUrl('/chat', View.ChatPage, 'chat', Permission.LOGIN_REQUIRED);

router.addUrl('/not_found', View.NotFoundPage, 'not_found');
router.addUrl('/unauthorized', View.UnAuthorizedPage, 'unauthorized');

/**
 * Подгрузка view для каждой страницы при переходе по url
 */
function onPageLoad() {
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

	controller.afterRender()
}

/**
 * Первичная загрузка страницы, получаение данных о пользователе
 */
function firstLoad() {
	EventBus.emit(NetworkEvents.GET_USER);
}


window.addEventListener('hashchange', onPageLoad);
window.addEventListener('DOMContentLoaded', firstLoad);

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/service-worker.js')
	});
}