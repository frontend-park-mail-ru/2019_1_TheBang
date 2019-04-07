import 'src/components/ChatContent/style.scss';
import chatComponent from 'src/components/ChatContent/template.pug';

class ChatContent {

	static createMsg(data) {
		const block = document.createElement('div');
		block.classList.add('chat__block');

		const author = document.createElement('div');
		author.classList.add('chat__block__author');
		author.innerText = data.author;

		const message = document.createElement('div');
		message.classList.add('chat__block__message');
		message.innerText = data.message;

		block.append(author, message);

		const container = document.querySelector('.chat__messages');
		container.append(block);
	}

	render() {
		return chatComponent.call({}, {});
	}

}

export default ChatContent;