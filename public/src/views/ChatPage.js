import ChatContent from 'src/components/ChatContent/ChatContent';
import ContentMixin from 'src/views/mixins/ContentMixin';
import Store from 'src/Store';
import BackendResource from 'src/network/BackendResource';

class ChatPage extends ContentMixin {
	constructor() {
		super(ChatContent);
	}

	afterRender() {
		super.afterRender();
		const url = [BackendResource.CHAT_WSS, 'ws'].join('');
		const connection = new WebSocket(url);
		const user = Store.getUser();
		const author = user.nickname;

		const btn = document.querySelector('.button');

		btn.addEventListener('click', () => {
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
		});


		connection.onmessage = e => {
			ChatContent.createMsg(JSON.parse(e.data))
		};



	}
}

export default ChatPage;