import apiUrl from '../apiConfig'
import axios from 'axios'


// DELETE -> removes a coin from assets
export const deleteCoin = (user, coin) => {
    console.log('coin to delete', coin)
    return axios({
        url: `${apiUrl}/coin/${coin}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        },
    })
}

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

