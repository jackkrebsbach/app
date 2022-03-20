import AsyncStorage from '@react-native-async-storage/async-storage'
import { JWT, User, Profile, NFT } from './types'
import { Platform } from 'react-native'
export let userData: User | undefined
export let userProfile: Profile | undefined
export let jwt: JWT | undefined
export let nft: NFT | undefined

const deviceStorage = {
  async saveItem(key: string, value: string) {
    try {
      console.log('saving:', key, value)
      await AsyncStorage.setItem(key, value)
    } catch (error) {
      console.log('AsyncStorage Error: ' + error)
    }
  },

  async loadNFT() {
    try {
      let data = await AsyncStorage.getItem('nft')
      nft = data ? JSON.parse(data) : undefined
      console.log('nft', nft)
    } catch (error) {
      console.log('Something went wrong', error)
    }
  },

  async loadJWT() {
    try {
      let data = await AsyncStorage.getItem('user_auth')
      jwt = data ? JSON.parse(data) : undefined
      console.log('jwt', jwt)
    } catch (error) {
      console.log('Something went wrong', error)
    }
  },

  async loadUser() {
    try {
      let data = await AsyncStorage.getItem('user_data')
      userData = data ? JSON.parse(data) : undefined
      console.log('userData', userData)
    } catch (error) {
      console.log('Something went wrong', error)
    }
  },

  async deleteUser() {
    try {
      await AsyncStorage.removeItem('user_auth').then(() => {
        userData = undefined
      })
    } catch (error) {
      console.log('AsyncStorage Error: ' + error)
    }
  },

  async loadProfile() {
    try {
      let data = await AsyncStorage.getItem('user_profile')
      userProfile = data ? JSON.parse(data) : undefined
    } catch (error) {
      console.log('Something went wrong', error)
    }
  },

  async mergeProfile(data: any) {
    try {
      let result = await AsyncStorage.mergeItem('user_profile', data)
      console.log('userProfile', result)
    } catch (error) {
      console.log('Something went wrong', error)
    }
  },
  async deleteProfile() {
    try {
      await AsyncStorage.removeItem('user_profile').then(() => {
        userProfile = undefined
      })
    } catch (error) {
      console.log('AsyncStorage Error: ' + error)
    }
  },

  async deleterJWT() {
    try {
      await AsyncStorage.removeItem('user_auth').then(() => {
        jwt = undefined
      })
    } catch (error) {
      console.log('AsyncStorage Error: ' + error)
    }
  },

  async deleteNft() {
    try {
      await AsyncStorage.removeItem('nft').then(() => {
        nft = undefined
      })
    } catch (error) {
      console.log('AsyncStorage Error: ' + error)
    }
  },

  async logout() {
    const asyncStorageKeys = await AsyncStorage.getAllKeys()
    if (asyncStorageKeys.length > 0) {
      if (Platform.OS === 'android') {
        await AsyncStorage.clear()
      }
      if (Platform.OS === 'ios') {
        await AsyncStorage.multiRemove(asyncStorageKeys)
      }
    }
  },
}

export default deviceStorage
