import { Api } from '../utils/api';

export const apiAuth = new Api({
    baseUrl: 'https://auth.nomoreparties.co',
    headers: {
        "Content-Type": "application/json"
    }
});

export const createApiAuthCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return new Api({
            baseUrl: 'https://auth.nomoreparties.co',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
    }
}