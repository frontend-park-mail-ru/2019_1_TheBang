import 'css/style.scss';

import LoginPage from 'src/views/LoginPage';
import ProfilePage from 'src/views/ProfilePage';
import HomePage from 'src/views/HomePage';
import NotFoundPage from 'src/views/NotFoundPage';
import UnAuthorizedPage from 'src/views/UnAuthorizedPage';
import SignUpPage from 'src/views/SignUpPage';
import AuthorsPage from 'src/views/AuthorsPage';
import GamePage from 'src/views/GamePage';
import LeadersPage from 'src/views/LeadersPage';

import Router from 'src/Router';
import Store from 'src/Store';

import EventBus from 'src/events/EventBus';
import NetworkEvents from 'src/events/NetworkEvents';
import Network from 'src/network/Network';
import PageEvents from 'src/events/PageEvents';
import PermissionController from 'src/permission/PermissionController';
import Permission from 'src/permission/Permission';
import BasePage from 'src/views/BasePage';


EventBus.on(PageEvents.UPDATE_STORE, Store.updateUser.bind(Store));
EventBus.on(PageEvents.BASE_COMPONENTS_RENDER, BasePage.render);

EventBus.on(NetworkEvents.GET_USER, Network.getUser);
EventBus.on(PageEvents.LOAD_PAGE, pageLoader);

EventBus.on(NetworkEvents.SIGNUP, Network.signUpUser);
EventBus.on(PageEvents.SIGNUP_SUCCESS, SignUpPage.Success);
EventBus.on(PageEvents.SIGNUP_ERROR, SignUpPage.Error);

EventBus.on(NetworkEvents.LOGIN, Network.loginUser);
EventBus.on(PageEvents.LOGIN_SUCCESS, LoginPage.Success);
EventBus.on(PageEvents.LOGIN_ERROR, LoginPage.Error);

EventBus.on(NetworkEvents.UPDATE_PROFILE, Network.updateUser);
EventBus.on(PageEvents.UPDATE_PROFILE_SUCCESS, ProfilePage.Success);
EventBus.on(PageEvents.UPDATE_PROFILE_ERROR, ProfilePage.Error);

EventBus.on(NetworkEvents.LOGOUT, Network.logoutUser);
EventBus.on(PageEvents.LOGOUT_SUCCESS, HomePage.Success);

EventBus.on(NetworkEvents.GET_LEADERBOARD, Network.getLeaderboard);
EventBus.on(PageEvents.GET_LEADERBOARD_SUCCESS, LeadersPage.Success);
EventBus.on(PageEvents.GET_LEADERBOARD_ERROR, LeadersPage.Error);


const router = new Router();

router.addUrl('/', HomePage, 'index');
router.addUrl('/profile', ProfilePage, 'profile', Permission.LOGIN_REQUIRED);
router.addUrl('/auth', LoginPage, 'auth', Permission.ANONYMOUS);
router.addUrl('/signup', SignUpPage, 'signup', Permission.ANONYMOUS);
router.addUrl('/authors', AuthorsPage, 'authors');
router.addUrl('/game', GamePage, 'game', Permission.LOGIN_REQUIRED);
router.addUrl('/leaders', LeadersPage, 'leaders', Permission.LOGIN_REQUIRED);

router.addUrl('/not_found', NotFoundPage, 'not_found');
router.addUrl('/unauthorized', UnAuthorizedPage, 'unauthorized');

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
