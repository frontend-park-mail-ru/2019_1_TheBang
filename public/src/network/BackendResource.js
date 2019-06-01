// const PORT_BASE = process.env.PORT_BASE || 8001;
// const PORT_GAME = process.env.PORT_GAME || 8002;
// const PORT_CHAT = process.env.PORT_CHAT || 8003;

// const HTTP = 'http://';
// const WS = 'ws://';
// const BACKEND_PREFIX = 'localhost:';
// const LOCAL_PREFIX = '127.0.0.1:';
// const END_SLASH = '/';
// let CURRENT_MODE = BACKEND_PREFIX;

// if (process.env.NODE_ENV === 'local') {
// 	CURRENT_MODE = LOCAL_PREFIX
// }

// const BackendResource = {
// 	BASE_HTTPS: HTTP + CURRENT_MODE + PORT_BASE + END_SLASH,
// 	CHAT_WSS: WS + CURRENT_MODE + PORT_CHAT + END_SLASH,
// 	GAME_WSS: WS + CURRENT_MODE + PORT_GAME + END_SLASH,
// 	GAME_HTTPS: HTTP + CURRENT_MODE + PORT_GAME + END_SLASH,
// 	CHAT_HTTPS: HTTP + CURRENT_MODE + PORT_CHAT + END_SLASH,
// };

const BackendResource = {
	BASE_HTTPS: '/api/auth/',
	CHAT_WSS: '/api/chatws/',
	GAME_WSS: '/api/gamews/',
	GAME_HTTPS:'/api/game/',
	CHAT_HTTPS: '/api/chat/',
};

export default BackendResource;