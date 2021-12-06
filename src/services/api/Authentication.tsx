import axios from 'axios';
import { API_URL } from '../../utils/apiRoute';
export let token = '';
export let userData = {};
export let profile = {};


export const getCode = (email) => {
    const url = API_URL + 'user/generateCode';
    console.log(url);
    return axios(url, {
        method: 'POST',
        data: { email: email }
    }).then(response => {
        console.log(response.status);
        return response.data;
    })
        .catch(error => {
            console.log(JSON.stringify(error))
            throw error;
        });
}

export const login = (email, activationCode) => {
    const url = API_URL + 'auth/signin';
    return axios(url, {
        method: "POST",
        data: { email: email, activation_code: activationCode }
    }) .then(response => {
        console.log(response.data);
        userData = response.data
        token = response.data.accessToken;
        return response.data;
    })
        .catch(error => {
            console.log(error);
            throw error;
        });
}