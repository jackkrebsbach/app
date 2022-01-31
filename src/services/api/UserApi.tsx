import axios from 'axios';
import deviceStorage, {userData} from '../storage/deviceStorage';
import { API_URL } from '../../utils/apiRoute';
import { token  } from './Authentication';



export const getProfile = (userId) => {
    const url = API_URL + "user/getProfile";
    console.log("getProfile", userId);

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


export  const CreateProfile = (userId, city, story, shortDescription , files ) => {
  const url = API_URL + "user/CreateProfile";
  
  console.log("CreateProfile- files",userId, city,story, shortDescription, files.toString());
  let formData = new FormData();  

  files.forEach((image) => {
    const file = {
      uri: image.uri,
      name: Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
      type: 'image/jpeg'
    };
    formData.append('files', file)
  });
  formData.append('city', city);
  formData.append('short_description',shortDescription );
  formData.append('description', story);
  formData.append('user_id', userId);

  return axios(url, {
    method: 'post',
    headers: {
      'content-type': 'multipart/form-data; charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  },    data:formData
}) .then(response => {
  console.log("Update !");
     getProfile(userId);
  return response.data;
  }).catch(error => {
    console.log('error', JSON.stringify(error));
  });
}


export  const UpdadteProfile = (userId, city, story, shortDescription, files ) => {
  const url = API_URL + "user/UpdateProfile";
  console.log("Update- files", files.toString());
  let formData = new FormData();  

  files.forEach((image) => {
    console.log("test", image.toString())
    if (image.uri != null) {
      console.log("image not null", image.uri)
    const file = {
      uri: image.uri,
      name: Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
      type: 'image/jpeg'
    };
    formData.append('files', file)

  }else {
    console.log("image  null", image)
    const file = {
      uri: "http://api.rezafootwear.com:8080/" +image,
      name: image,
      type: 'image/jpeg'
    };
    formData.append('files', file)
  }
  });

  formData.append('city', city);
  formData.append('short_description', shortDescription);
  formData.append('description', story);
  formData.append('user_id', userId);

  console.log("testData", formData)


  return axios(url, {
    method: 'post',
    headers: {
      'content-type': 'multipart/form-data; charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  },    data:formData
}) .then(response => {
  console.log("updatedProfile !");
     getProfile(userId);
  return response.data;
  }).catch(error => {
    console.log('error', JSON.stringify(error));
  });
}