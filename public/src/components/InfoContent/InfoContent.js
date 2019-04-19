import infoComponent from 'src/components/InfoContent/template.pug';
import 'css/reveal.js-3.8.0/css/reveal.scss';
import 'css/reveal.js-3.8.0/css/theme/source/blood.scss';
import 'src/pug-mixins/animation/rotate.scss';
import 'src/pug-mixins/slides/slide1/slide1.scss';
import 'src/pug-mixins/slides/slide2/slide2.scss';
import 'src/pug-mixins/slides/slide4/slide4.scss';
import 'src/pug-mixins/slides/slide6/slide6.scss';
import 'src/pug-mixins/slides/slide7/slide7.scss';
import 'src/components/HomeContent/style.scss';

class InfoContent {
    render() {
        return infoComponent.call()
    }
}

//- команда
//- что мы делаем
//- фичи
//- архитектура интересные мрменты
//- виды дизайна 1 и 2 + играбельность на мобилке 
//- как играть сингл + мульти (демо)

export default InfoContent;