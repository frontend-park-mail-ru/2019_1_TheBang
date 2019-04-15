import AuthorsContent from 'src/components/AuthorsContent/AuthorsContent';
import ContentMixin from 'src/views/mixins/ContentMixin';

class AuthorsPage extends ContentMixin{
	constructor() {
		super(AuthorsContent);
	}
}

export default AuthorsPage;