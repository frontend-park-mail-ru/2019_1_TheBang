import ChatContent from 'src/components/ChatContent/ChatContent';
import ContentMixin from 'src/views/mixins/ContentMixin';
import BackendResource from 'src/network/BackendResource';
import EventBus from 'src/events/EventBus';
import NetworkEvents from 'src/events/NetworkEvents';


let TIMESTAMP_ANCHOR;

class ChatPage extends ContentMixin {
	constructor() {
		super(ChatContent);
	}

	afterRender() {
		super.afterRender();
		TIMESTAMP_ANCHOR = Date.now();
		EventBus.emit(NetworkEvents.GET_MESSAGES, TIMESTAMP_ANCHOR);

		let url = [BackendResource.CHAT_WSS, 'chat'].join('');
		url = 'wss://' + document.location.hostname + ':' + document.location.port + url;
		console.log(url);
		// url = 'ws://' + document.location.hostname + ':' + document.location.port + url;
		const connection = new WebSocket(url);

		const btn = document.querySelector('.chat__button');
		const input = document.querySelector('.chat__input');

		function sendMsg() {
			const messageDOM = document.querySelector('.chat__input');
			const message = messageDOM.value;

			if (!message || !message.trim()) {
				return
			}

			messageDOM.value = '';

			if (messageDOM.dataset.edited) {
				const data = {
					timestamp: Number(messageDOM.dataset.timestamp),
					message: message,
					author: messageDOM.dataset.author,
				};
				EventBus.emit(NetworkEvents.EDIT_CHAT_MESSAGE, data);
				messageDOM.removeAttribute('data-timestamp');
				messageDOM.removeAttribute('data-author');
				messageDOM.removeAttribute('data-edited');
				return
			}

			const data = {
				timestamp: Date.now(),
				message: message
			};


			connection.send(JSON.stringify(data));
		}

		btn.addEventListener('click', sendMsg);

		const sendMsgEnter = (event) => {
			if (event.keyCode === 13) {
				sendMsg();
			}
		};

		input.addEventListener('keydown', sendMsgEnter);

		const change = () => {
			window.removeEventListener('hashchange', change);
			btn.removeEventListener('click', sendMsg);
			input.removeEventListener('keydown', sendMsgEnter);
			chatBox.removeEventListener('scroll', infinityScroll);
			connection.close()
		};

		window.addEventListener('hashchange', change);

		connection.onmessage = e => {
			const data = JSON.parse(e.data);

			if (data.deleted) {
				const msgBlock = ChatPage.getMessage(data.author, data.timestamp.toString());
				if (msgBlock) {
					msgBlock.remove();
				}
				return
			}

			if (data.edited) {
				const msgBlock = ChatPage.getMessage(data.author, data.timestamp.toString());
				const msg = msgBlock.querySelector('.chat__message');
				msg.innerText = data.message + ' (edit)';
				return
			}

			const msg = ChatContent.createMsg(data);
			ChatContent.appendBottom(msg);
		};

		const chatBox = document.querySelector('.chat');

		const infinityScroll = () => {
			if ((chatBox.scrollTop + chatBox.clientHeight >= chatBox.scrollHeight) && TIMESTAMP_ANCHOR) {
				EventBus.emit(NetworkEvents.GET_MESSAGES, TIMESTAMP_ANCHOR);
			}
		};

		chatBox.addEventListener('scroll', infinityScroll);
	}

	static getMessage(author, timestamp) {
		const msgBlock = document.querySelector('.chat__messages');
		const authorData = '[data-author="' + author + '"]';
		const timestampData = '[data-timestamp="' + timestamp + '"]';
		const el = msgBlock.querySelector(authorData + timestampData);
		return el.parentNode;
	}

	static onCreateMessages(data) {
		if (!data) {
			const content = document.querySelector('.content');
			const btnLast = content.querySelector('button');
			btnLast.remove();
		}

		const lastMsg = data[data.length - 1];
		TIMESTAMP_ANCHOR = lastMsg && lastMsg.timestamp;

		data.forEach((item) => {
			const msg = ChatContent.createMsg(item);
			ChatContent.appendTop(msg);
		});

		const chatBox = document.querySelector('.chat__chat');

		if ((chatBox.scrollHeight <= chatBox.clientHeight) && TIMESTAMP_ANCHOR) {
			EventBus.emit(NetworkEvents.GET_MESSAGES, TIMESTAMP_ANCHOR);
		}
	}
}

export default ChatPage;