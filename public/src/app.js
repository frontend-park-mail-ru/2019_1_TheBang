import '../css/style.scss';

import LoginPage from "./controllers/LoginPage";
import ProfilePage from "./controllers/ProfilePage";
import HomePage from "./controllers/HomePage";
import NotFoundPage from "./controllers/NotFoundPage";
import UnAuthorizedPage from "./controllers/UnAuthorizedPage";
import SignUpPage from "./controllers/SignUpPage";
import AuthorsPage from "./controllers/AuthorsPage";
import GamePage from "./controllers/GamePage";
import LeadersPage from "./controllers/LeadersPage";

import Router from "./Router";
import Store from "./Store";
import Constant from "./constant";
import EventBus from "./events/EventBus";
import NetworkEvents from "./events/NetworkEvents";
import Network from "./network/Network";
import PageEvents from "./events/PageEvents";
import HomeController from "./controllers/section/HomeController";


// JSDoc нужен тут
const app = {
    baseContainer: document.getElementById('root'),
    constant: new Constant(),
    store: Store
};

EventBus.on(NetworkEvents.GetUser, Network.getUser);
EventBus.on(PageEvents.GetUser, app.store.updateUser.bind(app.store));
EventBus.on(PageEvents.GetUser, pageLoader);

EventBus.on(NetworkEvents.SignUpUser, Network.signUpUser);
EventBus.on(PageEvents.SignUpUserSuccess, SignUpPage.Success);
EventBus.on(PageEvents.SignUpUserError, SignUpPage.Error);

EventBus.on(NetworkEvents.LoginUser, Network.loginUser);
EventBus.on(PageEvents.LoginUserSuccess, app.store.updateUser.bind(app.store));
EventBus.on(PageEvents.LoginUserSuccess, HomeController.baseRender);
EventBus.on(PageEvents.LoginUserSuccess, LoginPage.Success);
EventBus.on(PageEvents.LoginUserError, LoginPage.Error);

EventBus.on(NetworkEvents.UpdateUser, Network.updateUser);
EventBus.on(PageEvents.UpdateUserSuccess, app.store.updateUser.bind(app.store));
EventBus.on(PageEvents.UpdateUserSuccess, ProfilePage.Success);
EventBus.on(PageEvents.UpdateUserError, ProfilePage.Error);

EventBus.on(NetworkEvents.LogoutUser, Network.logoutUser);
EventBus.on(PageEvents.LogoutUserSuccess, app.store.updateUser.bind(app.store));
EventBus.on(PageEvents.LogoutUserSuccess, HomeController.baseRender);
EventBus.on(PageEvents.LogoutUserSuccess, HomePage.Success);

EventBus.on(NetworkEvents.GetLeaderboard, Network.getLeaderboard);
EventBus.on(PageEvents.GetLeaderboardSuccess, LeadersPage.Success);
EventBus.on(PageEvents.GetLeaderboardError, LeadersPage.Error);

let router = new Router();

router.addUrl('/', HomePage, 'index');
router.addUrl('/profile', ProfilePage, 'profile', app.constant.authUser);
router.addUrl('/auth', LoginPage, 'auth', app.constant.unauthUser);
router.addUrl('/signup', SignUpPage, 'signup', app.constant.unauthUser);
router.addUrl('/authors', AuthorsPage, 'authors');
router.addUrl('/game', GamePage, 'game', app.constant.authUser);
router.addUrl('/leaders', LeadersPage, 'leaders', app.constant.authUser);

router.addUrl('/not_found', NotFoundPage, 'not_found');
router.addUrl('/unauthorized', UnAuthorizedPage, 'unauthorized');

function pageLoader() {
    let url = location.hash.slice(1) || '/';
    let controller = router.getController(url);

    controller = new controller();

    if (controller.err) {
        return
    }

    let element = controller.targetRender || app.baseContainer;

    element.innerHTML = controller.render();

    // Дорисовываем активацию кнопочек, разные eventListener на формы, logout
    if (controller.afterRender) {
        controller.afterRender()
    }
}

function firstLoad() {
    EventBus.emit(NetworkEvents.GetUser);
}

window.addEventListener('hashchange', pageLoader);
window.addEventListener('load', firstLoad);

export default app;