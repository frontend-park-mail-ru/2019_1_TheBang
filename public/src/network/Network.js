import EventBus from "../events/EventBus";
import PageEvents from "../events/PageEvents";
import Request from "./Request";


/**
 * Связь запросов на бекенд и событий на фронте
 */
class Network {
    static getUser() {
        let response = Request.get('user');

        response.then((res) => {
            if (res.status > 299) {
                throw res.status;
            }
            return res.json()
        })
            .then((data) => {
                EventBus.emit(PageEvents.UpdateStore, data);
                EventBus.emit(PageEvents.LoadPage);
            })
            .catch(() => {
                EventBus.emit(PageEvents.LoadPage);
            });
    }

    static signUpUser(data) {
        let response = Request.post('user', data);
        response.then((res) => {
            if (res.status > 299) {
                throw res.status;
            }
            EventBus.emit(PageEvents.SignUpUserSuccess);
        })
            .catch((err) => {
                EventBus.emit(PageEvents.SignUpUserError, err)
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
                    EventBus.emit(PageEvents.UpdateStore, data);
                    EventBus.emit(PageEvents.UpdateUserSuccess, data);
                })
                .catch((err) => {
                    EventBus.emit(PageEvents.UpdateUserError, err);
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
                    EventBus.emit(PageEvents.UpdateStore, data);
                    EventBus.emit(PageEvents.UpdateUserSuccess, data);
                })
                .catch((err) => {
                    EventBus.emit(PageEvents.UpdateUserError, err);
                })
        }

    }

    static updateUserPhoto(data) {
        return Request.postForm('user/avatar', data)
    }

    static loginUser(data) {
        let response = Request.post('auth', data);

        response.then((res) => {
            if (res.status > 299) {
                throw res.status;
            }
            return res.json()
        })
            .then((data) => {
                EventBus.emit(PageEvents.UpdateStore, data);
                EventBus.emit(PageEvents.LoginUserSuccess, data);
                EventBus.emit(PageEvents.BaseRender)
            })
            .catch((err) => {
                EventBus.emit(PageEvents.LoginUserError, err);
            })
    }

    static logoutUser(data) {
        let response = Request.delete('auth', data);

        response.then((res) => {
            if (res.status > 299) {
                throw res.status;
            }
            EventBus.emit(PageEvents.UpdateStore);
            EventBus.emit(PageEvents.LogoutUserSuccess);
            EventBus.emit(PageEvents.BaseRender);
        })
    }

    static getLeaderboard(pageNumber) {
        let response = Request.get(`leaderbord/${pageNumber}`);

        response.then((res) => {
            if (res.status > 299) {
                throw res.status;
            }
            return res.json()
        })
            .then((data) => {
                EventBus.emit(PageEvents.GetLeaderboardSuccess, data)
            })
            .catch(() => {
                EventBus.emit(PageEvents.GetLeaderboardError)
            })
    }
}

export default Network;