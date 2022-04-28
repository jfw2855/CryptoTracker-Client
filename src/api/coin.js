import apiUrl from '../apiConfig'
import axios from 'axios'

// POST -> creates a coin
export const createCoin = (user,created) => {
  console.log('this is api resp for created Coin', created)
  const config = {
    method: 'post',
    url: `${apiUrl}/coin`,
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: {coin: created}
  }
  return axios(config)
}

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