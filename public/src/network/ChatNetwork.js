import Request from 'src/network/Request';
import EventBus from 'src/events/EventBus';
import PageEvents from 'src/events/PageEvents';

const lastMessage = [
	{
		author: 'Vasya',
		timestamp: 1556357760600,
		message: 'i here third at top',
		photo_url: 'https://avatars.mds.yandex.net/get-banana/49904/x25bsJOa_1i00wtlAJpQFJSM_banana_20161021_409-220-RUB-1x402x.png/optimize'
	},
	{
		author: 'Vasya',
		timestamp: 1556357760400,
		message: 'i here second at top',
		photo_url: 'https://avatars.mds.yandex.net/get-banana/49904/x25bsJOa_1i00wtlAJpQFJSM_banana_20161021_409-220-RUB-1x402x.png/optimize'
	},
	{ // early_message
		author: 'Vasya',
		timestamp: 1556357760100,
		message: 'i here first at top',
		photo_url: 'https://avatars.mds.yandex.net/get-banana/49904/x25bsJOa_1i00wtlAJpQFJSM_banana_20161021_409-220-RUB-1x402x.png/optimize'
	},
];

class ChatNetwork {
	static onGetMessages(timestap) {

		EventBus.emit(PageEvents.CREATE_CHAT_MESSAGES, lastMessage)
		// Request.chatRequest('messages?timestamp=' + timestap, 'GET')
		// 	.then((res) => {
		// 		return res.json()
		// 	})
		// 	.then((data) => {
		// 		EventBus.emit(PageEvents.CREATE_CHAT_MESSAGES, data)
		// 	})
	}
}

export default ChatNetwork;