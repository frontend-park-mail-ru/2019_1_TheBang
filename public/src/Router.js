class Router {
    constructor() {
        this.routes = {};
    }

    addUrl(url, controller, name, constraint) {
        this.routes[url] = {controller: controller};
        controller.prototype.pageName = name;
        controller.prototype.constraint = constraint;
    }

    getController(path) {
        let route = this.routes[path];

        return route ? route.controller : this.routes['/not_found'].controller
    }
}

export default Router;