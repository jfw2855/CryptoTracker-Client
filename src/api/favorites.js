import apiUrl from '../apiConfig'
import axios from 'axios'

// POST -> create favorite
export const createFavorite = (user, coin) => {
    return axios({
      url: `${apiUrl}/favorites/${coin}`,
      method: 'POST',
      headers: {
        Authorization: `Token token=${user.token}`,
      },
    })
}
  
// INDEX -> get all favorites
export const getAllFavorites = (user, coin) => {
    console.log('api coin', coin)
    return axios({
        url: `${apiUrl}/favorites/${coin}`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        },
    })
}

