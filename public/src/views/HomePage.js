import HomeContent from 'src/components/HomeContent/HomeContent';
import ContentMixin from 'src/views/mixins/ContentMixin';


class HomePage extends ContentMixin{
	constructor() {
		super(HomeContent);
	}

	static onSuccess() {
		window.location.replace('#/');
	}
}

export default HomePage;