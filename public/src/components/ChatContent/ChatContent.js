import 'src/components/ChatContent/style.scss';
import 'src/pug-mixins/hidden/hidden.scss';
import chatComponent from 'src/components/ChatContent/template.pug';
import Store from 'src/Store.js';
import { userInfo } from 'os';

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
		avatar.src = "https://avatars.mds.yandex.net/get-banana/49904/x25bsJOa_1i00wtlAJpQFJSM_banana_20161021_409-220-RUB-1x402x.png/optimize";
		// data.photo_url;

		const sendTime = document.createElement('div');
		sendTime.classList.add('chat__time');
		const time = new Date();
		// time.setTime(data.timestamp);
		time.setTime(1497094200000);
		sendTime.innerText = time.toDateString();
		// data.timestamp

		authorBlock.append(avatar, author);
		header.append(authorBlock, sendTime);
		// block.append(author, message, avatar);

		const container = document.querySelector('.chat__messages');
		// container.append(block);

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
		})

		block.append(header, message, checkbox);

		// block.addEventListener('click', () => {
		// 	const hack = () => {
		// 		block.removeEventListener('click', hack)
		// 		const menu = document.querySelector('.chat__menu');
		// 		menu.classList.add('hidden');
		// 		block.classList.remove('chat__block-select');
		// 	}

		// 	block.addEventListener('click', hack);

		// 	const menu = document.querySelector('.chat__menu');
		// 	menu.classList.remove('hidden');
		// 	block.classList.add('chat__block-select');
		// });

		container.append(block);
	}

	render() {
		const user = Store.getUser();
		const renderData = {
			nickname: user.nickname
		}

		return chatComponent.call({}, renderData);
	}

}

export default ChatContent;