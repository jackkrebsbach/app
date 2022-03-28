import fetcher from './fetcher'

export const deletePicture = async (pictureId: number) => {
  return fetcher
    .delete('/api/profile/delete-photo', {
      data: { photo_id: pictureId },
    })
    .then((response) => {
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
    //For now ignore the ts error, not sure the best way to stop it
    // @ts-ignore:next-line
    dataForm.append('gallery', file)
  })

  return fetcher('/api/profile/upload-photos', {
    method: 'POST',
    data: dataForm,
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(JSON.stringify(error))
      throw error
    })
}
