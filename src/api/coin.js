import apiUrl from '../apiConfig'
import axios from 'axios'

// POST -> adds or updates coin in assets
export const addCoinAsset = (user,coin) => {

    const config = {
      method: 'post',
      url: `${apiUrl}/coin`,
      headers: {
        Authorization: `Token token=${user.token}`
      },
      data: {coin: coin}
    }
    return axios(config)
  }