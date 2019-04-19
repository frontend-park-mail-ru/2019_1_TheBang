import HomeContent from 'src/components/HomeContent/HomeContent';
import ContentMixin from 'src/views/mixins/ContentMixin';
import Store from 'src/Store';


class HomePage extends ContentMixin{
	constructor() {
		super(HomeContent, Store.isAuth());
	}

	static onSuccess() {
		window.location.replace('#/');
	}
}

export default HomePage;