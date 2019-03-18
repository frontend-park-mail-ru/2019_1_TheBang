class Constant {
    constructor() {
        // this.backend = "http://127.0.0.1:8090/";
        this.backend = "https://stormy-fjord-97392.herokuapp.com/";

        // Ограничение доступа к страницам
        this.unauthUser = "Anonymous";
        this.authUser = "LoginRequired";
        this.anyUser = "All";
    }
}

export default Constant;
