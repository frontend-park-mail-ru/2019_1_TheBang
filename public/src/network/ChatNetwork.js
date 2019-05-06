import Request from 'src/network/Request';
import EventBus from 'src/events/EventBus';
import PageEvents from 'src/events/PageEvents';


class ChatNetwork {
	static onGetMessages(timestap) {
		Request.chatRequest('messages?timestamp=' + timestap, 'GET')
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				EventBus.emit(PageEvents.CREATE_CHAT_MESSAGES, data)
			})
	}

	static onDeleteMessage(data) {
		Request.chatRequest('message', 'DELETE', JSON.stringify(data))
	}

	static onEditMessage(data) {
		Request.chatRequest('message', 'PUT', JSON.stringify(data))
	}
}

export default ChatNetwork;