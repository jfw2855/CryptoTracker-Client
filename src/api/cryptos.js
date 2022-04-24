import apiUrl from '../apiConfig'
import axios from 'axios'
// import env from 'react-dotenv'

// GET top xxx cryptos
export const getCryptos = () => {
  const searchUrl =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false'
  const config = {
    method: 'get',
    url: `${searchUrl}`,
  }
  //   console.log('this is config', config)
  return axios(config)
}
