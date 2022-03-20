import axios from 'axios'
import Intercom from '@intercom/intercom-react-native'
import deviceStorage, { jwt } from '../storage/deviceStorage'
import { API_URL } from '../../utils/apiRoute'
import jwt_decode, { JwtPayload } from 'jwt-decode'
import dayjs from 'dayjs'

export const getCode = (email: string) => {
  const url = API_URL + 'api/auth/generate-code'
  return axios(url, {
    method: 'POST',
    data: { email: email },
  })
    .then((response) => {
      console.log(response.status)
      return response.data
    })
    .catch((error) => {
      console.log(JSON.stringify(error))
      throw error
    })
}

export const login = (email: string, activationCode: string) => {
  const url = API_URL + 'api/auth/sign-in-app'
  return axios(url, {
    method: 'POST',
    data: { email: email, activation_code: activationCode },
  })
    .then((response) => {
      console.log('login', response.data)
      const userData = response.data
      const userId = response.data.id
      const access_token = response.data.access_token
      const refresh_token = response.data.refresh_token
      let userAuth = {
        email: userData['email'],
        userId: userId,
        access_token: access_token,
        refresh_token: refresh_token,
      }
      deviceStorage.saveItem('user_auth', JSON.stringify(userAuth))
      Intercom.registerIdentifiedUser({
        email: userAuth.email,
        userId: userAuth.userId,
      })
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

export const refresh = async () => {
  const url = API_URL + 'api/auth/refresh-app'
  const decoded = jwt_decode<JwtPayload>(jwt['refresh_token'])
  const isExpired = dayjs.unix(decoded.exp || -1).diff(dayjs()) < 1
  console.log('RefreshisExpired', isExpired)
  if (isExpired) {
    await refresh()
    await deviceStorage.loadJWT()
  }

  return axios(url, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + jwt['refresh_token'] },
  }).then((response) => {
    console.log('new token', response.data)
    deviceStorage.saveItem('user_auth', JSON.stringify(response.data))
  })
}
