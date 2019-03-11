import LeaderContent from "../components/LeaderContent/LeaderContent";
import IndexController from "./section/IndexController";


class LeadersPage extends IndexController {
    constructor() {
        super(LeaderContent);
    }

    // async afterRender() {
    //     MenuContent.disactivateButtons();
    // }

}

export default LeadersPage;