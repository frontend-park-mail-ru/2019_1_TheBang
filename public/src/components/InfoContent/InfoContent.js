import infoComponent from 'src/components/InfoContent/template.pug';
import 'css/reveal.js-3.8.0/css/reveal.scss';
import 'css/reveal.js-3.8.0/css/theme/source/blood.scss';

class InfoContent {
    render() {
        return infoComponent.call()
    }
}

export default InfoContent;