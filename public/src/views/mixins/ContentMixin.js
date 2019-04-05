import 'src/pug-mixins/content/content.scss';
import 'src/pug-mixins/mobile-burger/mobile-burger.scss';
import 'src/pug-mixins/mobile-input/mobile-input.scss';
import MenuContent from 'src/components/MenuContent/MenuContent';


class ContentMixin {
	constructor(content, ...args) {
		this.content = content;
		this.args = args;
	}

	render()  {
		const content = new this.content(this.args);
		return `
            ${content.render()}
            `
	}

	getTargetRender() {
		return document.querySelector('.content')
	}

	/**
	 * Дорисовываем активацию кнопочек, разные eventListener на формы, logout
	 */
	afterRender() {
		MenuContent.activateButton(this.pageName);
	}

}

export default ContentMixin;