import './title.scss';
import titleComponent from './title.pug';

const title = (title) =>
	titleComponent.call({}, {title});


export default title;