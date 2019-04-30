import Request from 'src/network/Request';
import EventBus from 'src/events/EventBus';
import GamePageEvents from 'src/events/GamePageEvents';

class GameNetwork {
	static onGetRooms() {
		console.log('get rooms');
		Request.gameRequest('room', 'GET')
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				EventBus.emit(GamePageEvents.GET_ROOMS_SUCCESS, data);
			})
	}

	static onCreateRoom() {
		Request.gameRequest('room', 'POST')
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				EventBus.emit(GamePageEvents.CREATE_ROOM_SUCCESS, [data]);
			})
	}
}

export default GameNetwork;