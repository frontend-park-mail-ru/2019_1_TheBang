class Router {
    constructor() {
        this.routes = {};
    }

    addUrl(url, controller, name) {
        this.routes[url] = {controller: controller};
        controller.prototype.pageName = name;
    }

    getController(path) {
        let route = this.routes[path];
        return route ? route.controller : this.routes['404'].controller
    }
}

export default Router;