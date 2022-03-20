import axios, { AxiosRequestConfig } from 'axios'
import jwt_decode, { JwtPayload } from 'jwt-decode'
import dayjs from 'dayjs'
import { API_URL as baseURL } from '../../utils/apiRoute'
import deviceStorage from '../storage/deviceStorage'
import { jwt, userData } from '../storage/deviceStorage'

const fetcher = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${jwt['access_token']}` },
})

fetcher.interceptors.request.use(async (config: AxiosRequestConfig) => {
  deviceStorage.loadJWT()
  const user = jwt_decode<JwtPayload>(jwt.access_token || '')
  const isExpired = dayjs.unix(user?.exp || 0).diff(dayjs()) < 1

  if (!isExpired) return config

  const response = await axios.post(`${baseURL}api/auth/refresh-app`, {
    headers: { Authorization: `Bearer ${jwt.refresh_token}` },
  })
  let updated = {
    email: userData['email'],
    userId: userData['id'],
    token: response.data.access_token,
    refresh: response.data.refresh_token,
  }
  deviceStorage.saveItem('user_auth', JSON.stringify(updated))

  config.headers = { Authorization: `Bearer ${response.data.access_token}` }
  return config
})

export default fetcher
