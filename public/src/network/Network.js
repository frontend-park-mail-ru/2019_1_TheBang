import EventBus from 'src/events/EventBus';
import PageEvents from 'src/events/PageEvents';
import Request from 'src/network/Request';


/**
 * Связь запросов на бекенд и событий на фронте
 */
class Network {
	static getUser() {
		const response = Request.get('user');

		response.then((res) => {
			if (res.status > 299) {
				throw res.status;
			}
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

	static signUpUser(data) {
		const response = Request.post('user', data);
		response.then((res) => {
			if (res.status > 299) {
				throw res.status;
			}
			EventBus.emit(PageEvents.SIGNUP_SUCCESS);
		})
			.catch((err) => {
				EventBus.emit(PageEvents.SIGNUP_ERROR, err)
			});
	}

	static updateUser(data) {
		let response;
		if (data.formData) {
			response = Network.updateUserPhoto(data.formData);
			response.then((res) => {
				if (res && res.status > 299) {
					throw res.status;
				}
				data.formData = undefined;
				return Request.put('user', data);
			}).then((res) => {
				if (res.status > 299) {
					throw res.status;
				}
				return res.json()
			})
				.then((data) => {
					EventBus.emit(PageEvents.UPDATE_STORE, data);
					EventBus.emit(PageEvents.UPDATE_PROFILE_SUCCESS, data);
				})
				.catch((err) => {
					EventBus.emit(PageEvents.UPDATE_PROFILE_ERROR, err);
				});
		} else {
			response = Request.put('user', data);

			response.then((res) => {
				if (res.status > 299) {
					throw res.status;
				}
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

	}

	static updateUserPhoto(data) {
		return Request.postForm('user/avatar', data)
	}

	static loginUser(data) {
		const response = Request.post('auth', data);

		response.then((res) => {
			if (res.status > 299) {
				throw res.status;
			}
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

	static logoutUser(data) {
		const response = Request.delete('auth', data);

		response.then((res) => {
			if (res.status > 299) {
				throw res.status;
			}
			EventBus.emit(PageEvents.UPDATE_STORE);
			EventBus.emit(PageEvents.LOGOUT_SUCCESS);
			EventBus.emit(PageEvents.BASE_COMPONENTS_RENDER);
		})
	}

	/**
	 *
	 * @param pageNumber - номер страницы
	 */
	static getLeaderboard(pageNumber) {
		const response = Request.get(`leaderbord/${pageNumber}`);

		response.then((res) => {
			if (res.status > 299) {
				throw res.status;
			}
			return res.json()
		})
			.then((data) => {
				EventBus.emit(PageEvents.GET_LEADERBOARD_SUCCESS, data)
			})
			.catch(() => {
				EventBus.emit(PageEvents.GET_LEADERBOARD_ERROR)
			})
	}
}

export default Network;