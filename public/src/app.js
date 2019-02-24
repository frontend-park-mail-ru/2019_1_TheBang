import '../css/index.scss';

import AuthPageController from "./controllers/AuthPageController";
import ProfilePageController from "./controllers/ProfilePageController";
import HomePageController from "./controllers/HomePageController";
import NotFoundPageController from "./controllers/NotFoundPageController";
import SignUpPageController from "./controllers/SignUpPageController";
import AuthorsPageController from "./controllers/AuthorsPageController";
import GamePageController from "./controllers/GamePageController";
import AboutPageController from "./controllers/AboutPageController";

const app = document.getElementById('root');
const routes = {};


function route (path, controller) {
    routes[path] = {controller: controller};
}


function router () {
    let url = location.hash.slice(1) || '/';
    let route = routes[url];

    if (!route) {
        let error = new NotFoundPageController();
        app.innerHTML = error.render();
        return;
    }

    let controller = new route.controller();

    let element = controller.targetRender;

    if (!element) {
        let temp = controller.content;
        let t = controller.name;
        controller = new HomePageController();
        controller.content = temp;
        controller.name = t;
        element = controller.targetRender;
    }

    element.innerHTML = controller.render();
    controller.afterRender();

}


window.addEventListener('hashchange', router);
window.addEventListener('load', router);


route('/', HomePageController);
route('/profile', ProfilePageController);

route('/auth', AuthPageController);

route('/signup', SignUpPageController);
route('/authors', AuthorsPageController);
route('/game', GamePageController);
route('/about', AboutPageController);