export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _request(methodApi, urlApi, dataObj) {
        return fetch(`${this._baseUrl}${urlApi}`, {
            method: methodApi,
            headers: this._headers,
            body: dataObj ? JSON.stringify(dataObj) : undefined
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}: ${res.statusText}`))
    }

    getInitialCards() {
        return this._request(
            'GET',
            'cards',
            undefined
        )
    }

    getProfileInfo() {
        return this._request(
            'GET',
            'users/me',
            undefined
        )
    }

    postNewCard(data) {
        return this._request(
            'POST',
            'cards',
            data
        );
    }

    deleteCard(cardID) {
        return this._request(
            'DELETE',
            `cards/${cardID}`,
            undefined
        );
    }

    patchProfileInfo(data) {
        const { name, about } = data;
        return this._request(
            'PATCH',
            'users/me',
            {
                name: name,
                about: about
            }
        );
    }

    patchProfileAvatar({ avatar }) {
        return this._request(
            'PATCH',
            'users/me/avatar',
            {
                avatar: avatar,
            }
        );
    }

    deleteLike(cardId) {
        return this._request(
            'DELETE',
            `cards/${cardId}/likes`,
            undefined
        );
    }

    putLike(cardId) {
        return this._request(
            'PUT',
            `cards/${cardId}/likes`,
            undefined
        );
    }

    changeLikeCardStatus(cardId, isLiked) {
        return isLiked ? this.deleteLike(cardId) : this.putLike(cardId);
    }

    postUser({ password, email }) {
        return this._request(
            'POST',
            '/signup',
            {
                password: password,
                email: email 
            }
        );
    }

    postUserAuth({ password, email }) {
        return this._request(
            'POST',
            '/signin',
            {
                password: password,
                email: email 
            }
        );
    }

    getUserCheck() {
        return this._request(
            'GET',
            '/users/me',
            undefined
        );
    }
}

export const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/cohort-39/',
    headers: {
        authorization: 'a7defb5f-ab84-4cfb-b754-de71ce92f20a',
        'Content-Type': 'application/json'
    }
});

