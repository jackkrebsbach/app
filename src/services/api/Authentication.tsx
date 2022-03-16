import axios from 'axios';
import Intercom from '@intercom/intercom-react-native';
import deviceStorage from '../storage/deviceStorage';
import { API_URL } from '../../utils/apiRoute';
import { getUser } from './UserApi';


export const getCode = (email) => {
    const url = API_URL + 'api/auth/generate-code';
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
    const url = API_URL + 'api/auth/sign-in-app';
    return axios(url, {
        method: "POST",
        data: { email: email, activation_code: activationCode },
        
    }) .then(response => {
        console.log('login', response.data);
        const userData = response.data
        const token = response.data.access_token;
        const refresh  = response.data.refresh_token;
        console.log("login", token)

        getUser(token).then(
            res => {
                console.log('responseUser', res.data)
                let userAuth = {email: userData['email'] ,userId:userData['id'], token: token, refresh:refresh };
                deviceStorage.saveItem("user_auth", JSON.stringify(userAuth));
             //   deviceStorage.saveItem("user_data", JSON.stringify(userAuth));

                Intercom.registerIdentifiedUser({email: userAuth.email ,userId: userAuth.userId})
                return res.data;
            }
        )

       
    })
    .catch(error => {
            console.log(error);
            throw error;
    });
}

export const refresh = () => {
    const url = API_URL + 'api/auth/refresh';
    return axios (url, {
        method: "GET",
        headers: {'Authorization': 'Bearer ' + userData['refresh_token']},
    }).then(response => {
        console.log('test', response.data )
    })
}