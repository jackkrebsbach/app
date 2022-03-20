import axios from 'axios'
import deviceStorage, { userData, jwt } from '../storage/deviceStorage'
import { API_URL } from '../../utils/apiRoute'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { refresh } from './Authentication'

export const generateInviteCode = async () => {
  const url = API_URL + 'api/invite/generate-invite'

  const decode = jwt_decode(jwt['access_token'])
  const isExpired = dayjs.unix(decode.exp).diff(dayjs()) < 1

  console.log('test', isExpired)
  if (isExpired) {
    await refresh()
    await deviceStorage.loadJWT()
  }

  return axios(url, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + jwt['access_token'] },
  })
    .then((response) => {
      console.log(response.data)
      return response.data
    })
    .catch((error) => {
      console.log(JSON.stringify(error))
      throw error
    })
}
