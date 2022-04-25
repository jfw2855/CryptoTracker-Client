import apiUrl from '../apiConfig'
import axios from 'axios'

// POST -> create favorite
export const createFavorite = (user, newFavorite) => {
    console.log('newFavorite', newFavorite)
    return axios({
      url: `${apiUrl}/favorites`,
      method: 'POST',
      headers: {
        Authorization: `Token token=${user.token}`,
      },
      data: { favorite: newFavorite },
    })
}
  
