import axios from 'axios';
import deviceStorage, { jwt } from '../storage/deviceStorage';
import { API_URL } from '../../utils/apiRoute';
import { userProfile } from '../storage/deviceStorage';
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs';
import { refresh } from './Authentication';

export const deletePicture = async ( pictureId, userId) => {
    // DELETE
    const url = API_URL + "api/profile/delete-photo";
    const decode = jwt_decode(jwt['access_token'])
    const isExpired = dayjs.unix(decode.exp).diff(dayjs()) < 1;

     

    
        if (isExpired) {
        await refresh();
        await deviceStorage.loadJWT();
        }
    

    const data =    {
        photo_id: pictureId,
    }


    return axios.delete(url , {
        headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': "*",
            'Authorization': 'Bearer ' + jwt['access_token']
        },
        data: {"photo_id" : pictureId}
    }).then(response => {
        console.log(response.data);
        return response.data;
    })
        .catch(error => {
            console.log('erreur')
            console.log('response :', error.response)

            throw error;
        });
    

}

export const uploadPicture = async ( pictures ) => {
    // Post
    const url = API_URL + "api/profile/upload-photos";

    const decode = jwt_decode(jwt['access_token'])
    const isExpired = dayjs.unix(decode.exp).diff(dayjs()) < 1;
    
    console.log('test', isExpired)
        if (isExpired) {
        await refresh();
        await deviceStorage.loadJWT();
        }

    let dataForm  = new FormData();


    pictures.forEach((image) => {
        const file = {
          uri: image.uri,
          name: Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
          type: 'image/jpeg'
        };
        dataForm.append('gallery', file)
    });

    dataForm.append('profile_id',userProfile['id'] )

    return axios(url, {
        method: 'POST',
        headers: { 
        'content-type': 'multipart/form-data; charset=UTF-8',
        'Access-Control-Allow-Origin': "*",
        'Authorization': 'Bearer ' + jwt['access_token'],
    },
    data: dataForm

    }).then(response => {
        console.log('Upload response', response.data);
        return response.data;
    })
        .catch(error => {
            console.log(JSON.stringify(error))
            throw error;
        });
}