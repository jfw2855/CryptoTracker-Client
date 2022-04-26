import apiUrl from '../apiConfig'
import axios from 'axios'

// SHOW -> shows all transactions for a specific coin
export const viewTransactions = (user,coin) => {
    
    const config = {
      method: 'get',
      url: `${apiUrl}/transactions/${coin}`,
      headers: {
          Authorization: `Token token=${user.token}`
      }
    }
    return axios(config)
  }
