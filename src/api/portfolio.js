import apiUrl from '../apiConfig'
import axios from 'axios'

// SHOW -> shows user's portfolio
export const viewPortfolio = (user) => {
    
    const config = {
      method: 'get',
      url: `${apiUrl}/portfolio`,
      headers: {
          Authorization: `Token token=${user.token}`
      }
    }
    return axios(config)
  }

