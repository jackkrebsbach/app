import { userProfile } from '../storage/deviceStorage'
import fetcher from './fetcher'

export const deletePicture = async (pictureId: string) => {
  return fetcher
    .delete('/api/profile/delete-photo', {
      data: { photo_id: pictureId },
    })
    .then((response) => {
      console.log(response.data)
      return response.data
    })
    .catch((error) => {
      console.log('error:', error.response)
      throw error
    })
}

export const uploadPicture = async (pictures: any[]) => {
  let dataForm = new FormData()

  pictures.forEach((image) => {
    const file = {
      uri: image.uri,
      name: Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
      type: 'image/jpeg',
    }
    dataForm.append('gallery', file)
  })

  dataForm.append('profile_id', userProfile['id'])

  return fetcher('/api/profile/upload-photos', {
    method: 'POST',
    data: dataForm,
  })
    .then((response) => {
      console.log('Upload response', response.data)
      return response.data
    })
    .catch((error) => {
      console.log(JSON.stringify(error))
      throw error
    })
}