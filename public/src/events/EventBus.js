/**
 * Шина событий, реализована паттерном "Медиатор"
 */
class EventBus {
	constructor() {
		this.listeners = {}
	}

	/**
	 *
	 * @param event - событие на которое сработает обработчик
	 * @param callback - обработчик
	 */
	on(event, callback) {
		if (!this.listeners.hasOwnProperty(event)) {
			this.listeners[event] = []
		}

		this.listeners[event].push(callback)
	}

	/**
	 *
	 * @param event
	 * @param callback
	 */
	off(event, callback) {
		this.listeners[event] = this.listeners[event]
			.filter(function (listener) { return listener !== callback; })
	}

	/**
	 *
	 * @param event
	 * @param data - параметры которые пробросятся в аргументы обработчику
	 */
	emit(event, data) {
		this.listeners[event].forEach(function (listener) {
			listener(data)
		})
	}
}

export default new EventBus();

