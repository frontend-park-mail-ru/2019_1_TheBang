import '../css/index.scss';

import AuthPage from "./controllers/AuthPage";
import ProfilePage from "./controllers/ProfilePage";
import HomePage from "./controllers/HomePage";
import NotFoundPage from "./controllers/NotFoundPage";
import SignUpPage from "./controllers/SignUpPage";
import AuthorsPage from "./controllers/AuthorsPage";
import GamePage from "./controllers/GamePage";
import AboutPage from "./controllers/AboutPage";
import Router from "./Router";


const app = document.getElementById('root');

let router = new Router();

router.addUrl('/', HomePage, 'index');
router.addUrl('/profile', ProfilePage, 'profile');
router.addUrl('/auth', AuthPage, 'auth');
router.addUrl('/signup', SignUpPage, 'signup');
router.addUrl('/authors', AuthorsPage, 'authors');
router.addUrl('/game', GamePage, 'game');
router.addUrl('/about', AboutPage, 'about');

router.addUrl('404', NotFoundPage, 'not_found');

function pageLoader () {
    let url = location.hash.slice(1) || '/';
    let controller = router.getController(url);

    controller = new controller();
    let element = controller.getTargetRender();

    element.innerHTML = controller.render();

    if (controller.afterRender) {
        controller.afterRender()
    }

}

window.addEventListener('hashchange', pageLoader);
window.addEventListener('load', pageLoader);

export default app;