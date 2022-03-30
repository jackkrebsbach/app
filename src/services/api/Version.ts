import axios from 'axios'
import { API_URL } from '../../utils/apiRoute'
import DeviceInfo from 'react-native-device-info';
import { Alert, Platform } from 'react-native';

export const getVersion = async () => {
    const url = API_URL + '/api/version'
    try {
        const response = await axios(url, {
            method: 'GET',
        })
        if (Platform.OS == 'ios') {
            const code = response.data.ios_version_code
            const build = DeviceInfo.getBuildNumber()

            if (code < build) {
                Alert.alert("A new version of the app is available please update your app for new features")

            }
        } else {
            const code = response.data.android_version_code
            const build = DeviceInfo.getBuildNumber()

            if (code < build) {
                Alert.alert("A new version of the app is available please update your app for new features")

            }
        }

        return response.data
    } catch (error) {
        //console.log(JSON.stringify(error))
        throw error
    }
}

