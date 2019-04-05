import ErrorContent from 'src/components/ErrorContent/ErrorContent';
import ContentMixin from 'src/views/mixins/ContentMixin';


class NotFoundPage extends ContentMixin{
	constructor() {
		super(ErrorContent, '404 Not Found');
	}
}

export default NotFoundPage;