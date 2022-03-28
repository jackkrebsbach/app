import deviceStorage from '../storage/deviceStorage'
import fetcher from './fetcher'

// header token
export const trasnferNft = async (metamaskId: string, nft_id: number) => {
  return fetcher('/api/nft/update-nft', {
    method: 'POST',
    data: {
      meta_mask_id: metamaskId,
      nft_id: nft_id,
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

export const getNft = async () => {
  return fetcher('/api/nft', {
    method: 'GET',
  })
    .then((response) => {
      const nft = response.data

      if (nft.length) {
        deviceStorage.saveItem('nft', JSON.stringify(nft[0])).then(() => {
          deviceStorage.loadNFT().then(() => {
            return response.data
          })
        })
      } else {
        deviceStorage.deleteNft()
      }

      return
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
