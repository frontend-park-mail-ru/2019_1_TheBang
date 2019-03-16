import LeaderContent from "../components/LeaderContent/LeaderContent";
import HomeController from "./section/HomeController";


class LeadersPage extends HomeController {
    constructor() {
        super(LeaderContent);
    }

    afterRender() {
        super.afterRender();

        let pages = document.getElementsByClassName('paginator')[0].children;

        [].forEach.call(pages, (page) => {
            page.addEventListener('click', () => {
                let pageNumber = page.innerText;
                LeaderContent.getDefaultData(pageNumber)
            })


        })

    }
}

export default LeadersPage;