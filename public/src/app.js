import 'css/style.scss';

import Router from 'src/Router';
import 'src/Events';
import EventBus from 'src/events/EventBus';
import NetworkEvents from 'src/events/NetworkEvents';
import PageEvents from 'src/events/PageEvents';
import PermissionController from 'src/permission/PermissionController';


EventBus.on(PageEvents.LOAD_PAGE, onPageLoad);

/**
 * Подгрузка view для каждой страницы при переходе по url
 */
function onPageLoad(event, ControllerRender, ...ControllerArgs) {
	const url = location.hash.slice(1) || '/';
	let controller = ControllerRender || Router.getController(url);

	controller = new controller(...ControllerArgs);

	if (!PermissionController.checkConstraint(controller)) {
		return
	}

	if (!controller.getTargetRender()) {
		EventBus.emit(PageEvents.BASE_COMPONENTS_RENDER);
	}

	const element = controller.getTargetRender();

	element.innerHTML = controller.render();
	console.log(controller.afterRender);
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

export default onPageLoad;