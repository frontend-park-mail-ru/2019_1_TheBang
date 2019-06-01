import 'src/components/ChatContent/style.scss';
import 'src/pug-mixins/hidden/hidden.scss';
import chatComponent from 'src/components/ChatContent/template.pug';
import Store from 'src/Store';
import EventBus from 'src/events/EventBus';
import NetworkEvents from 'src/events/NetworkEvents';

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
		avatar.src = data.photo_url.split('/').pop();
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

		checkbox.dataset.author = data.author;
		checkbox.dataset.timestamp = data.timestamp;

		const change = () => {
			window.removeEventListener('hashchange', change);
			checkbox.removeEventListener('click', selectMsg);
		};

		window.addEventListener('hashchange', change);

		const selectMsg = (event) => {
			const user = Store.getUser();
			if (event.target.dataset.author !== user.nickname) {
				return
			}

			const menu = document.querySelector('.chat__menu');
			const delMsg = document.querySelector('.chat__delete');
			const edtMsg = document.querySelector('.chat__edit');

			const deleteMsg = () => {
				const msg = document.querySelector('.chat__block-select');
				msg.remove();
				menu.classList.add('hidden');
				delMsg.removeEventListener('click', deleteMsg);
				edtMsg.removeEventListener('click', editMsg);
				const data = {
					timestamp: Number(event.target.dataset.timestamp),
					author: event.target.dataset.author,
				};
				EventBus.emit(NetworkEvents.DELETE_CHAT_MESSAGE, data)
			};

			const editMsg = () => {
				const msg = document.querySelector('.chat__block-select');
				const oldMsg = msg.querySelector('.chat__message').innerText;
				const chatInput = document.querySelector('.chat__input');
				chatInput.value = oldMsg;
				chatInput.dataset.timestamp = event.target.dataset.timestamp;
				chatInput.dataset.author = event.target.dataset.author;
				chatInput.dataset.edited = 'true';
			};

			if (checkbox.checked) {
				if (menu.classList.contains('hidden')) {
					// сообщение выбрано
					menu.classList.remove('hidden');
					block.classList.add('chat__block-select');

					delMsg.addEventListener('click', deleteMsg);
					edtMsg.addEventListener('click', editMsg);

				} else {
					// что бы не выбирать больше 1 сообщения
					checkbox.checked = false;
				}
			} else {
				// повторный клик убирает выделение
				menu.classList.add('hidden');
				block.classList.remove('chat__block-select');
				delMsg.removeEventListener('click', deleteMsg);
				edtMsg.removeEventListener('click', editMsg);
			}
		};

		checkbox.addEventListener('click', selectMsg);

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