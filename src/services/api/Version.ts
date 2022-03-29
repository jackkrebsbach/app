import axios from 'axios'
import { API_URL } from '../../utils/apiRoute'

export const getVersion = async () => {
    const url = API_URL + '/api/version'
    try {
        const response = await axios(url, {
            method: 'GET',
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        //console.log(JSON.stringify(error))
        throw error
    }
}

