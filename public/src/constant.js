class Constant {
    constructor() {
        this.backend = "https://backend-for-anton.herokuapp.com/";

        // Ограничение доступа к страницам
        this.unauthUser = "Anonymous";
        this.authUser = "LoginRequired";
        this.anyUser = "All";
    }
}

export default Constant;
