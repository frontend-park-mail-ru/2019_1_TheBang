import '../css/style.scss';

import AuthPage from "./controllers/AuthPage";
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

// Порядок инициализации приложения важен!
// Потому что все растягивают константы :((
// JSDoc нужен тут
const app = {
    page: document.getElementById('root'),
    constant: new Constant(),
};

app['store'] = new Store();

let router = new Router();

router.addUrl('/', HomePage, 'index');
router.addUrl('/profile', ProfilePage, 'profile', app.constant.authUser);
router.addUrl('/auth', AuthPage, 'auth', app.constant.unauthUser);
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

    let element = controller.targetRender || app.page;

    element.innerHTML = controller.render();

    // Дорисовываем активацию кнопочек, разные eventListener на формы, logout
    if (controller.afterRender) {
        controller.afterRender()
    }
}

function pageHandler (e) {
    if (e.type === "load") {
        app.store.getUser().finally( () => {
            pageLoader();
        });
    } else {
        pageLoader()
    }
}

window.addEventListener('hashchange', pageHandler);
window.addEventListener('load', pageHandler);

export default app;