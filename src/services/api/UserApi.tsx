import axios from 'axios'
import deviceStorage, { jwt } from '../storage/deviceStorage'
import { API_URL } from '../../utils/apiRoute'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { refresh } from './Authentication'

export const getUser = async () => {
  const url = API_URL + 'api/user/get-user'

  const decode = jwt_decode(jwt['access_token'])
  const isExpired = dayjs.unix(decode.exp).diff(dayjs()) < 1

  console.log('is expired', isExpired)

  if (isExpired) {
    console.log('is expired')
    await refresh()
  }

  return axios(url, {
    method: 'get',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + jwt['access_token'],
    },
  })
    .then((response) => {
      const userData = response.data
      deviceStorage.saveItem('user_data', JSON.stringify(userData))
      return response.data
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(' done')
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(' not done')

        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
      }
      console.log(error.config)
    })
}

export const getProfile = async () => {
  const url = API_URL + 'api/profile/get-profile'

  const decode = jwt_decode(jwt['access_token'])
  const isExpired = dayjs.unix(decode.exp).diff(dayjs()) < 1

  console.log('is expired', isExpired)

  if (isExpired) {
    console.log('is expired')
    await refresh()
  }

  return axios(url, {
    method: 'get',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + jwt['access_token'],
    },
  })
    .then((response) => {
      console.log('getProfile', response.data)
      const userProfile = response.data
      deviceStorage.saveItem('user_profile', JSON.stringify(userProfile))
      return response.data
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(' done')
        console.log(error.response.data)
      } else if (error.request) {
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
      }
      console.log(error.config)
    })
}

export const CreateProfile = async (
  city,
  story,
  shortDescription,
  profilePicture
) => {
  const url = API_URL + 'api/profile/create-profile'

  const decode = jwt_decode(jwt['access_token'])
  const isExpired = dayjs.unix(decode.exp).diff(dayjs()) < 1

  if (isExpired) {
    await refresh()
    await deviceStorage.loadJWT()
  }

  console.log('CreateProfile- files', profilePicture.toString())
  let formData = new FormData()

  profilePicture.forEach((image) => {
    console.log('profile_picture', image.toString())
    if (image.uri != null) {
      console.log('image not null', image.uri)
      const file = {
        uri: image.uri,
        name: Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
        type: 'image/jpeg',
      }
      formData.append('profile', file)
    } else {
      console.log('image  null', image)
      const file = {
        uri: API_URL + image,
        name: image,
        type: 'image/jpeg',
      }
      formData.append('profile', file)
    }
  })

  formData.append('city', city)
  formData.append('short_description', shortDescription)
  formData.append('description', story)

  return await axios(url, {
    method: 'post',
    headers: {
      'content-type': 'multipart/form-data; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + jwt['access_token'],
    },
    data: formData,
  })
    .then((response) => {
      console.log('Created !')
      return response.data
    })
    .catch((error) => {
      console.log('error', JSON.stringify(error))
    })
}

export const UpdateProfile = async (
  profileId,
  profilePicture,
  city,
  story,
  shortDescription
) => {
  console.log('updateProfile', profilePicture)
  const url = API_URL + 'api/profile/update-profile'

  const decode = jwt_decode(jwt['access_token'])
  const isExpired = dayjs.unix(decode.exp).diff(dayjs()) < 1

  console.log('isExpired', isExpired)
  if (isExpired) {
    await refresh()
    await deviceStorage.loadJWT()
  }

  let formData = new FormData()
  //check if picture is new
  // if not send don't repupload

  if (profilePicture != '') {
    console.log('image not null', profilePicture)
    const file = {
      uri: profilePicture,
      name: Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
      type: 'image/jpeg',
    }
    formData.append('profile', file)
  }

  formData.append('profile_id', profileId)
  formData.append('city', city)
  formData.append('short_description', shortDescription)
  formData.append('description', story)

  return await axios(url, {
    method: 'post',
    headers: {
      'content-type': 'multipart/form-data; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + jwt['access_token'],
    },
    data: formData,
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log('error', JSON.stringify(error))
    })
}
