import ProfileContent from "../components/ProfileContent/ProfileContent";
import HomeFormController from "./section/HomeFormController";
import app from "../app";


class ProfilePage extends HomeFormController {
    constructor() {
        super(ProfileContent);
    }

    SubmitRequest() {
        let file = this.form[3].files[0];

        let data = {
            "name": this.form[2].value
        };

        let request = {
            mode: 'cors',
            method: "PUT",
            body: JSON.stringify(data),
            credentials: 'include'
        };

        let url = [app.constant.backend, 'user'].join("");

        if (file) {
            this.updatePhoto(file)
                .then( () => {
                    return fetch(url, request)
                })
                .then( (res) => {
                    if (res.status > 299) {
                        throw res.status;
                    }
                    return res.json()
                })
                .then( (data) => {
                    app.store.setUser(data);
                    this.createMsg("Изменения успешны!", this.successMessageClass);
                })
                .catch( () => {
                    this.createMsg(`Произошла ошибка, попробуйте позже`, this.errorMessageClass);
            });
        } else {

            fetch(url, request)
                .then((res) => {
                    if (res.status > 299) {
                        throw res.status;
                    }
                    return res.json()
                })
                .then((data) => {
                    app.store.setUser(data);
                    this.createMsg("Изменения успешны!", this.successMessageClass);
                })
                .catch(() => {
                    this.createMsg(`Произошла ошибка, попробуйте позже`, this.errorMessageClass);
                });
        }
    }

    updatePhoto(file) {
        let formData = new FormData();
        formData.append('photo', file);

        let request = {
            mode: 'cors',
            method: "POST",
            body: formData,
            credentials: 'include'
        };
        let url = [app.constant.backend, 'user/avatar'].join("");

        return fetch(url, request)
            .then( (res) => {
            if (res && res.status > 299) {
                throw res.status;
            }
        })
    }

    afterRender() {
        super.afterRender();
        let uploadInput = document.querySelector('form')[3];

        uploadInput.addEventListener('change', (e) => {
            let avatar = document.querySelector('form img');
            avatar.src = window.URL.createObjectURL(e.target.files[0]);
        })
    }

}

export default ProfilePage;