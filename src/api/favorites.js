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
  
// SHOW -> get a single favorites
export const getAFavorite = (user, coin) => {
    console.log('api coin', coin)
    return axios({
        url: `${apiUrl}/favorites/${coin}`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        },
    })
}

export const deleteFavorite = (user, coin) => {
    console.log('coin to delete', coin)
    return axios({
        url: `${apiUrl}/favorites/${coin}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        },
    })
}

// Index -> get all favorites
export const getAllFavorites = (user) => {
    return axios({
        url: `${apiUrl}/favorites`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        },
    })
}