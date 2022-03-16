import axios from 'axios';
import deviceStorage, {userData} from '../storage/deviceStorage';
import { API_URL } from '../../utils/apiRoute';


const generateInviteCode = () => {
    const url = API_URL + "api/invite/generate-invite";
    return axios(url, {
        method: 'POST',
        headers: {'Authorization': 'Bearer ' + userData['access_token']},

    }).then(response => {
        console.log(response.status);
        deviceStorage.saveItem("user_auth", JSON.stringify(response.data));
        return response.data;
    })
        .catch(error => {
            console.log(JSON.stringify(error))
            throw error;
        });
    
}