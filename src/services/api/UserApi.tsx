import axios from 'axios';
import deviceStorage, {userData} from '../storage/deviceStorage';
import { API_URL } from '../../utils/apiRoute';
import { token  } from './Authentication';



export const getProfile = (userId) => {
    const url = API_URL + "user/getProfile";
    console.log("test", userData['accessToken']);
    console.log("test", userId);

     return axios(url, {
        method: 'post',
        headers: {
            'content-type': 'application/json; charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        },
        data: {user_id: userId}
    })
        .then(response => {
        console.log("dans la boucle");
        console.log(response.data);
        const userProfile = response.data
        deviceStorage.saveItem("user_profile", JSON.stringify(userProfile));

        return response.data;
        })
        .catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(" done");
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(" not done");

              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
};