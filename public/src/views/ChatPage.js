import ChatContent from 'src/components/ChatContent/ChatContent';
import ContentMixin from 'src/views/mixins/ContentMixin';
import Store from 'src/Store';
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

		const url = [BackendResource.CHAT_WSS, 'ws'].join('');
		const connection = new WebSocket(url);
		const user = Store.getUser();
		const author = user.nickname;

		const btn = document.querySelector('.chat__button');
		const input = document.querySelector('.chat__input');

		function sendMsg() {
			const messageDOM = document.getElementsByName('chat-message')[0];
			const message = messageDOM.value;

			if (!message) {
				return
			}

			const data = {
				author: author,
				message: message
			};

			connection.send(JSON.stringify(data));

			messageDOM.value = '';
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
			const msg = ChatContent.createMsg(JSON.parse(e.data));
			ChatContent.appendBottom(msg);
		};

		const chatBox = document.querySelector('.chat');

		const infinityScroll = () => {
			console.log(chatBox.scrollTop, chatBox.clientHeight, chatBox.scrollHeight);
			if (chatBox.scrollTop + chatBox.clientHeight >= chatBox.scrollHeight) {
				EventBus.emit(NetworkEvents.GET_MESSAGES, TIMESTAMP_ANCHOR);
			}
		};

		chatBox.addEventListener('scroll', infinityScroll);
	}



	static onCreateMessages(data) {
		if (!data) {
			const content = document.querySelector('.content');
			const btnLast = content.querySelector('button');
			btnLast.remove();
		}

		TIMESTAMP_ANCHOR = data[data.length - 1];

		data.forEach((item) => {
			const msg = ChatContent.createMsg(item);
			ChatContent.appendTop(msg);
		});

		const chatBox = document.querySelector('.chat');

		if (chatBox.scrollHeight <= chatBox.clientHeight) {
			EventBus.emit(NetworkEvents.GET_MESSAGES, TIMESTAMP_ANCHOR);
		}
	}
}

export default ChatPage;