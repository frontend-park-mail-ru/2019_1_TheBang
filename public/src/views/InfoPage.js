import InfoContent from 'src/components/InfoContent/InfoContent';
import ContentMixin from 'src/views/mixins/ContentMixin';
import Store from 'src/Store';

import Reveal from 'css/reveal.js-3.8.0/js/reveal.js';

class InfoPage extends ContentMixin {
    constructor() {
      super(InfoContent, Store.isAuth());
    }
    
    afterRender() {
        window.location.replace('#/presentation');
        Reveal.initialize("overview", "true");
        console.log(Reveal);
    }
}

export default InfoPage;