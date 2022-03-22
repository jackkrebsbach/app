import deviceStorage from '../storage/deviceStorage'
import fetcher from './fetcher'

// header token
export const trasnferNft = async (metamaskId: string) => {
  return fetcher('/api/nft/create-nft', {
    method: 'POST',
    data: {
      meta_mask_id: metamaskId,
    },
  })
    .then((response) => {
      console.log('Created !')
      return response.data
    })
    .catch((error) => {
      console.log('error', JSON.stringify(error))
    })
}

// header token
export const getNft = async () => {
  return fetcher('/api/nft', {
    method: 'GET',
  })
    .then((response) => {
      const nft = response.data
      deviceStorage.saveItem('nft', JSON.stringify(nft)).then(() => {
        deviceStorage.loadNFT().then(() => {
          return response.data
        })
      })
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response)
      } else if (error.request) {
        console.log(' not done')
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
      }
      console.log(error.config)
    })
}
