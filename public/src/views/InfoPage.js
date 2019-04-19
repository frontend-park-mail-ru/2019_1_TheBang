import InfoContent from 'src/components/InfoContent/InfoContent';
import ContentMixin from 'src/views/mixins/ContentMixin';

import Reveal from 'css/reveal.js-3.8.0/js/reveal.js';

class InfoPage extends ContentMixin {
    constructor() {
      super(InfoContent);
    }
    
    afterRender() {
        window.location.replace('#/presentation');
        Reveal.initialize();
        console.log(Reveal);
    }
}

export default InfoPage;