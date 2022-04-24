import apiUrl from '../apiConfig'
import axios from 'axios'
// import env from 'react-dotenv'

// GET top xxx cryptos
export const getCryptos = () => {
  const searchUrl =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false'
  const config = {
    method: 'get',
    url: `${searchUrl}`,
  }
  return axios(config)
}

// SHOW a single crypto
export const showCrypto = (coin) => {
  const searchUrl = `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=true`
  const config = {
    method: 'get',
    url: `${searchUrl}`,
  }
  return axios(config)

}


// https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=true