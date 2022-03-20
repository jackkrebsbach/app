import axios from 'axios'
import deviceStorage, { jwt } from '../storage/deviceStorage'
import { API_URL } from '../../utils/apiRoute'

// header token
export const trasnferNft = async (metamaskId) => {
  // Post
  const url = API_URL + 'api/nft/create-nft'
  return axios(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + jwt['access_token'],
    },
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
  // GET
  const url = API_URL + 'api/nft'

  return axios(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + jwt['access_token'],
    },
  })
    .then((response) => {
      const nft = response.data
      console.log('getNft', nft)
      deviceStorage.saveItem('nft', JSON.stringify(nft))
      return response.data
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
