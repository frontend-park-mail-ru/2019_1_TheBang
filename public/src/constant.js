class Constant {
    constructor() {
        this.backend = "http://127.0.0.1:8090/";

        // Ограничение доступа к страницам
        this.unauthUser = "Anonymous";
        this.authUser = "LoginRequired";
        this.anyUser = "All";
    }
}

export default Constant;
