import ErrorContent from 'src/components/ErrorContent/ErrorContent';
import ContentMixin from 'src/views/mixins/ContentMixin';

class UnAuthorizedPage extends ContentMixin{
	constructor() {
		super(ErrorContent, '401 UnAuthorized')
	}
}

export default UnAuthorizedPage;