import Request from 'src/network/Request';
import EventBus from 'src/events/EventBus';
import GamePageEvents from 'src/events/GamePageEvents';

class GameNetwork {
	static onGetRooms() {
		Request.gameRequest('room', 'GET')
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				EventBus.emit(GamePageEvents.GET_ROOMS_SUCCESS, data);
			})
	}
}

export default GameNetwork;