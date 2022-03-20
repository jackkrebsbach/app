import deviceStorage, { jwt } from '../storage/deviceStorage'
import fetcher from './fetcher'

export const getUser = async () => {
  return fetcher('/api/user/get-user', {
    method: 'get',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + jwt['access_token'],
    },
  })
    .then((response) => {
      const userData = response.data
      deviceStorage.saveItem('user_data', JSON.stringify(userData))
      return response.data
    })
    .catch((error) => {
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
  return fetcher('/api/profile/get-profile', {
    method: 'GET',
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
  city: string,
  story: string,
  shortDescription: string,
  profilePicture: any
) => {
  console.log('CreateProfile- files', profilePicture.toString())
  let formData = new FormData()

  profilePicture.forEach((image: any) => {
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
        name: image,
        type: 'image/jpeg',
      }
      formData.append('profile', file)
    }
  })

  formData.append('city', city)
  formData.append('short_description', shortDescription)
  formData.append('description', story)

  return await fetcher('api/profile/create-profile', {
    method: 'POST',
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
  profilePicture: any,
  city: string,
  story: string,
  shortDescription: string
) => {
  console.log('updateProfile', profilePicture)

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

  formData.append('city', city)
  formData.append('short_description', shortDescription)
  formData.append('description', story)

  return await fetcher('api/profile/update-profile', {
    method: 'POST',
    data: formData,
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log('error', JSON.stringify(error))
    })
}
