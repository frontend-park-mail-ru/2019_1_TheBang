import EventBus from 'src/events/EventBus';
import PageEvents from 'src/events/PageEvents';
import Request from 'src/network/Request';


/**
 * Связь запросов на бекенд и событий на фронте
 */
class Network {
	static onGetUser() {
		Request.request('user', 'GET')
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				EventBus.emit(PageEvents.UPDATE_STORE, data);
				EventBus.emit(PageEvents.LOAD_PAGE);
			})
			.catch(() => {
				EventBus.emit(PageEvents.LOAD_PAGE);
			});
	}

	static onSignUpUser(data) {
		Request.request('user', 'POST', JSON.stringify(data))
			.then(() => {
				EventBus.emit(PageEvents.SIGNUP_SUCCESS);
			})
			.catch((err) => {
				EventBus.emit(PageEvents.SIGNUP_ERROR, err)
			});
	}

	static onUpdateUser(data) {
		if (data.formData) {
			Network.updateUserPhoto(data.formData)
				.then(() => {
					data.formData = undefined;
					return Request.request('user', 'PUT', JSON.stringify(data));
				})
				.then((res) => {
					return res.json()
				})
				.then((data) => {
					EventBus.emit(PageEvents.UPDATE_STORE, data);
					EventBus.emit(PageEvents.UPDATE_PROFILE_SUCCESS, data);
				})
				.catch((err) => {
					EventBus.emit(PageEvents.UPDATE_PROFILE_ERROR, err);
				});
			return
		}

		Request.request('user', 'PUT', JSON.stringify(data))
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				EventBus.emit(PageEvents.UPDATE_STORE, data);
				EventBus.emit(PageEvents.UPDATE_PROFILE_SUCCESS, data);
			})
			.catch((err) => {
				EventBus.emit(PageEvents.UPDATE_PROFILE_ERROR, err);
			})
	}

	static updateUserPhoto(data) {
		return Request.request('user/avatar', 'POST', data)
	}

	static onLoginUser(data) {
		Request.request('auth', 'POST', JSON.stringify(data))
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				EventBus.emit(PageEvents.UPDATE_STORE, data);
				EventBus.emit(PageEvents.LOGIN_SUCCESS, data);
				EventBus.emit(PageEvents.BASE_COMPONENTS_RENDER)
			})
			.catch((err) => {
				EventBus.emit(PageEvents.LOGIN_ERROR, err);
			})
	}

	static onLogoutUser() {
		Request.request('auth', 'DELETE')
			.then(() => {
				EventBus.emit(PageEvents.UPDATE_STORE);
				EventBus.emit(PageEvents.LOGOUT_SUCCESS);
				EventBus.emit(PageEvents.BASE_COMPONENTS_RENDER);
			})
	}

	/**
	 *
	 * @param pageNumber - номер страницы
	 */
	static onGetLeaderboard(pageNumber) {
		Request.request('leaderbord/' + pageNumber, 'GET')
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				const result = {
					data: data,
					pageNumber: pageNumber
				};

				EventBus.emit(PageEvents.GET_LEADERBOARD_SUCCESS, result)
			})
			.catch(() => {
				EventBus.emit(PageEvents.GET_LEADERBOARD_ERROR, pageNumber)
			})
	}

	static onCheckPageLeaderboard(pageNumber) {
		Request.request('leaderbord/' + pageNumber, 'GET')
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				const result = {
					data: data,
					pageNumber: pageNumber
				};

				EventBus.emit(PageEvents.CHECK_LEADERBOARD_EXISTS, result)
			})
			.catch(() => {
				EventBus.emit(PageEvents.CHECK_LEADERBOARD_NOT_EXISTS, pageNumber)
			})
	}
}

export default Network;