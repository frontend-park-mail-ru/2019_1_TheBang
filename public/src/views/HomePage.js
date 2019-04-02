import HomeContent from 'src/components/HomeContent/HomeContent';
import ContentMixin from 'src/views/mixins/ContentMixin';


class HomePage extends ContentMixin{
	constructor() {
		super(HomeContent);
	}

	static Success() {
		window.location.replace('#/');
	}
}

export default HomePage;