import 'src/components/ChatContent/style.scss';
import 'src/pug-mixins/hidden/hidden.scss';
import chatComponent from 'src/components/ChatContent/template.pug';
import Store from 'src/Store';

class ChatContent {

	static createMsg(data) {

		const block = document.createElement('div');
		block.classList.add('chat__block');

		const header = document.createElement('div');
		header.classList.add('chat__block-header');

		const authorBlock = document.createElement('div');
		authorBlock.classList.add('chat__author-block');

		const author = document.createElement('div');
		author.classList.add('chat__author');
		author.innerText = data.author;

		const message = document.createElement('div');
		message.classList.add('chat__message');
		message.innerText = data.message;

		const avatar = document.createElement('img');
		avatar.classList.add('chat__avatar');
		avatar.src = data.photo_url;
		// data.photo_url;

		const sendTime = document.createElement('div');
		sendTime.classList.add('chat__time');
		const time = new Date();
		// time.setTime(data.timestamp);
		time.setTime(data.timestamp);
		sendTime.innerText = time.getHours() + ':' + time.getMinutes() + ' ' + time.toDateString();
		// data.timestamp

		authorBlock.append(avatar, author);
		header.append(authorBlock, sendTime);
		// block.append(author, message, avatar);

		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.classList.add('chat__checkbox');

		checkbox.addEventListener('click', () => {
			const menu = document.querySelector('.chat__menu');
			if (checkbox.checked) {
				if (menu.classList.contains('hidden')) {
					menu.classList.remove('hidden');
					block.classList.add('chat__block-select');
				} else {
					checkbox.checked = false;
				}
			} else {
				menu.classList.add('hidden');
				block.classList.remove('chat__block-select');
			}
		});

		block.append(header, message, checkbox);

		return block;
	}

	static appendTop(block) {
		const container = document.querySelector('.chat__messages');
		container.prepend(block);
	}

	static appendBottom(block) {
		const container = document.querySelector('.chat__messages');
		container.append(block);
	}

	render() {
		const user = Store.getUser();
		let nickname = user.nickname;

		if (!user.nickname) {
			nickname = 'undef';
		}

		const renderData = {
			nickname: nickname
		};

		return chatComponent.call({}, renderData);
	}

}

export default ChatContent;