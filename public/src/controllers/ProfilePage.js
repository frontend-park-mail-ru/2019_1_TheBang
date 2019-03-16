import ProfileContent from "../components/ProfileContent/ProfileContent";
import HomeFormController from "./section/HomeFormController";
import app from "../app";


class ProfilePage extends HomeFormController {
    constructor() {
        super(ProfileContent);
    }

    SubmitRequest() {
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

        fetch(url, request)
            .then( (res) => {
                if (res.status > 299) {
                    throw res.status;
                }

                let file = this.form[3].files[0];
                if (!file) {
                    return
                }

                let formData = new FormData();
                formData.append('photo', file);

                request = {
                    mode: 'cors',
                    method: "POST",
                    body: formData,
                    credentials: 'include'
                };
                url = [app.constant.backend, 'user/avatar'].join("");

                return fetch(url, request)
            })
            .then( (res) => {
                if (res && res.status > 299) {
                    throw res.status;
                }
                app.isFirstLoad = true;
                this.createMsg("Изменения успешны!", this.successMessageClass);
            })
            .catch( (err) => {
                switch (err) {
                    default:
                        this.createMsg(`Произошла ошибка, попробуйте позже ${err}`, this.errorMessageClass);
                }
            });

        // data = {
        //     name: this.form[3].value
        // };
        //
        // request = {
        //     mode: 'cors',
        //     method: "PUT",
        //     body: JSON.stringify(data),
        //     credentials: 'include'
        // };
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