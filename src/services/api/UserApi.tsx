import axios from 'axios';
import deviceStorage from '../storage/deviceStorage';
import { API_URL } from '../../utils/apiRoute';
import { token  } from './Authentication';



export const getProfile = async (userId) => {
    const url = API_URL + "api/user/getProfile";
     return axios(url, {
        method: 'post',
        headers: {
            'content-type': 'application/json; charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        },
        data: {user_id: userId}
    })
        .then(response => {
        console.log('getProfile', response.data);
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


export  const CreateProfile = async (userId, city, story, shortDescription , files, profilePicture ) => {
  const url = API_URL + "api/user/CreateProfile";
  
  console.log("CreateProfile- files",profilePicture.toString());
  let formData = new FormData();  

  profilePicture.forEach((image) => {
    console.log("profile_picture", image.toString())
    if (image.uri != null) {
      console.log("image not null", image.uri)
    const file = {
      uri: image.uri,
      name: Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
      type: 'image/jpeg'
    };
  formData.append('profile_picture', file)

  }else {
    console.log("image  null", image)
    const file = {
      uri: API_URL + image,
      name: image,
      type: 'image/jpeg'
    };
    formData.append('profile_picture', file)
  }
  });

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

  return await axios(url, {
    method: 'post',
    headers: {
      'content-type': 'multipart/form-data; charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  },    data:formData
}) .then(response => {
  console.log("Update !");
  return response.data;
  }).catch(error => {
    console.log('error', JSON.stringify(error));
  });
}


export  const UpdateProfile = async (userId, profilePicture, city, story, shortDescription,files ) => {
  // console.log('i am here');
  const url = API_URL + "api/user/UpdateProfile";
  let formData = new FormData();  

  profilePicture.forEach((image) => {
    console.log("profile_picture", image.toString())
    if (image.uri != null) {
      console.log("image not null", image.uri)
    const file = {
      uri: image.uri,
      name: Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
      type: 'image/jpeg'
    };
    formData.append('profile_picture', file)

  }else {
    console.log("image  null", image)
    const file = {
      uri: API_URL + image,
      name: image,
      type: 'image/jpeg'
    };
    formData.append('profile_picture', file)
  }
  });
  
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
      uri: API_URL +image,
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

  return await axios(url, {
    method: 'post',
    headers: {
      'content-type': 'multipart/form-data; charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  },    data:formData
}) .then(response => {
  return response.data;
  }).catch(error => {
    console.log('error', JSON.stringify(error));
  });
}