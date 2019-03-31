import '../css/style.scss';

import LoginPage from "./views/LoginPage";
import ProfilePage from "./views/ProfilePage";
import HomePage from "./views/HomePage";
import NotFoundPage from "./views/NotFoundPage";
import UnAuthorizedPage from "./views/UnAuthorizedPage";
import SignUpPage from "./views/SignUpPage";
import AuthorsPage from "./views/AuthorsPage";
import GamePage from "./views/GamePage";
import LeadersPage from "./views/LeadersPage";

import Router from "./Router";
import Store from "./Store";

import EventBus from "./events/EventBus";
import NetworkEvents from "./events/NetworkEvents";
import Network from "./network/Network";
import PageEvents from "./events/PageEvents";
import PermissionController from "./permission/PermissionController";
import Permission from "./permission/Permission";
import BasePage from "./views/BasePage";

EventBus.on(PageEvents.UpdateStore, Store.updateUser.bind(Store));
EventBus.on(PageEvents.BaseRender, BasePage.render);

EventBus.on(NetworkEvents.GetUser, Network.getUser);
EventBus.on(PageEvents.LoadPage, pageLoader);

EventBus.on(NetworkEvents.SignUpUser, Network.signUpUser);
EventBus.on(PageEvents.SignUpUserSuccess, SignUpPage.Success);
EventBus.on(PageEvents.SignUpUserError, SignUpPage.Error);

EventBus.on(NetworkEvents.LoginUser, Network.loginUser);
EventBus.on(PageEvents.LoginUserSuccess, LoginPage.Success);
EventBus.on(PageEvents.LoginUserError, LoginPage.Error);

EventBus.on(NetworkEvents.UpdateUser, Network.updateUser);
EventBus.on(PageEvents.UpdateUserSuccess, ProfilePage.Success);
EventBus.on(PageEvents.UpdateUserError, ProfilePage.Error);

EventBus.on(NetworkEvents.LogoutUser, Network.logoutUser);
EventBus.on(PageEvents.LogoutUserSuccess, HomePage.Success);

EventBus.on(NetworkEvents.GetLeaderboard, Network.getLeaderboard);
EventBus.on(PageEvents.GetLeaderboardSuccess, LeadersPage.Success);
EventBus.on(PageEvents.GetLeaderboardError, LeadersPage.Error);


let router = new Router();

router.addUrl('/', HomePage, 'index');
router.addUrl('/profile', ProfilePage, 'profile', Permission.LoginRequired);
router.addUrl('/auth', LoginPage, 'auth', Permission.Anonymous);
router.addUrl('/signup', SignUpPage, 'signup', Permission.Anonymous);
router.addUrl('/authors', AuthorsPage, 'authors');
router.addUrl('/game', GamePage, 'game', Permission.LoginRequired);
router.addUrl('/leaders', LeadersPage, 'leaders', Permission.LoginRequired);

router.addUrl('/not_found', NotFoundPage, 'not_found');
router.addUrl('/unauthorized', UnAuthorizedPage, 'unauthorized');


function pageLoader() {
    let url = location.hash.slice(1) || '/';
    let controller = router.getController(url);

    controller = new controller();

    if (!PermissionController.checkConstraint(controller)) {
        return
    }

    if (!controller.getTargetRender()) {
        EventBus.emit(PageEvents.BaseRender);
    }

    let element = controller.getTargetRender();

    element.innerHTML = controller.render();

    // Дорисовываем активацию кнопочек, разные eventListener на формы, logout
    controller.afterRender()
}


function firstLoad() {
    EventBus.emit(NetworkEvents.GetUser);
}


window.addEventListener('hashchange', pageLoader);
window.addEventListener('load', firstLoad);
