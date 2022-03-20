import AsyncStorage from '@react-native-async-storage/async-storage'

type JWT = {
  access_token?: string
  refresh_token?: string
}

type User = {
  email?: string
  id?: number
}

export let userData = {}
export let userProfile = {}
export let jwt: JWT = {}
export let nft = {}

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
      nft = data ? JSON.parse(data) : {}
      console.log('nft', nft)
    } catch (error) {
      console.log('Something went wrong', error)
    }
  },

  async loadJWT() {
    try {
      let data = await AsyncStorage.getItem('user_auth')
      jwt = data ? JSON.parse(data) : {}
      console.log('jwt', jwt)
    } catch (error) {
      console.log('Something went wrong', error)
    }
  },

  async loadUser() {
    try {
      let data = await AsyncStorage.getItem('user_data')
      userData = data ? JSON.parse(data) : {}
      console.log('userdata', userData)
    } catch (error) {
      console.log('Something went wrong', error)
    }
  },

  async deleteUser() {
    try {
      await AsyncStorage.removeItem('user_auth').then(() => {
        userData = {}
      })
    } catch (error) {
      console.log('AsyncStorage Error: ' + error)
    }
  },

  async loadProfile() {
    try {
      let data = await AsyncStorage.getItem('user_profile')
      userProfile = data ? JSON.parse(data) : {}
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
        userProfile = {}
      })
    } catch (error) {
      console.log('AsyncStorage Error: ' + error)
    }
  },

  async deleterJWT() {
    try {
      await AsyncStorage.removeItem('user_auth').then(() => {
        userData = {}
      })
    } catch (error) {
      console.log('AsyncStorage Error: ' + error)
    }
  },

  async deleteNft() {
    try {
      await AsyncStorage.removeItem('nft').then(() => {
        userData = {}
      })
    } catch (error) {
      console.log('AsyncStorage Error: ' + error)
    }
  },
}

export default deviceStorage
