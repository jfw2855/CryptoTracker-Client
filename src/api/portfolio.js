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

// GET -> gets current market data for user's portfolio
// PData == portfolio data
export const getPData = (coins) => {
    
    const searchUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coins}&order=market_cap_desc&page=1&sparkline=false`
    const config = {
        method: 'get',
        url: `${searchUrl}`
    }
    return axios(config)
}

