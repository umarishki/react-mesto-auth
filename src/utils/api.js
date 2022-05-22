class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._authorization = options.headers.authorization;
        this._contentType = options.headers['Content-Type'];
    }

    _request(methodApi, urlApi, dataObj) {
        return fetch(`${this._baseUrl}${urlApi}`, {
            method: methodApi,
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: dataObj ? JSON.stringify(dataObj) : undefined
        })
            .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
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
}

const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/cohort-39/',
    headers: {
        authorization: 'a7defb5f-ab84-4cfb-b754-de71ce92f20a',
        'Content-Type': 'application/json'
    }
});

export default api;