/**
 * Шина событий, реализована паттерном "Медиатор"
 */

class EventBus {
    constructor() {
        this.listeners = {}
    }

    /** Подписка на событие **/
    on(event, callback) {
        if (!this.listeners.hasOwnProperty(event)) {
            this.listeners[event] = []
        }

        this.listeners[event].push(callback)
    }

    /** Отписка от события **/
    off(event, callback) {
        this.listeners[event] = this.listeners[event]
            .filter(function (listener) { return listener !== callback; })
    }

    /** Производим событие **/
    emit(event, data) {
        this.listeners[event].forEach(function (listener) {
            listener(data)
        })
    }
}

export default new EventBus();

