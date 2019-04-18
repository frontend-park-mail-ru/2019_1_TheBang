import InfoContent from 'src/components/InfoContent/InfoContent';
import ContentMixin from 'src/views/mixins/ContentMixin';

import Reveal from 'css/reveal.js-3.8.0/js/reveal.js';

class InfoPage extends ContentMixin {
    constructor() {
      super(InfoContent);
    }
    
    afterRender() {
      Reveal.initialize();
    }

    static onSuccess() {
		window.location.replace('#/info');
	}
}

export default InfoPage;