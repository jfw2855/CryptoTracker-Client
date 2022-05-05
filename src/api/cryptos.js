import axios from 'axios'
import env from 'react-dotenv'

// GET top xxx cryptos
export const getCryptos = () => {
  const searchUrl =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
  const config = {
    method: 'get',
    url: searchUrl,
  }
  return axios(config)
}

// SHOW a single crypto
export const showCrypto = (coin) => {
  const searchUrl = `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=true`
  const config = {
    method: 'get',
    url: searchUrl,
  }
  return axios(config)

}
// GET price history for a coin
export const getHistory = (coin) => {
  const searchUrl = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=365`
  const config = {
    method: 'get',
    url: searchUrl
  }
  return axios(config)
}

// Query string of coins
export const getSeveral = (coins) => {
  const searchUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coins}&order=market_cap_desc&page=1&sparkline=false`
  const config = {
    method: 'get',
    url: searchUrl
  }
  return axios(config)
}

// GET trending cryptos
export const getTrending = () => {
  const searchUrl =
    'https://api.coingecko.com/api/v3/search/trending'
  const config = {
    method: 'get',
    url: searchUrl,
  }
  return axios(config)
}
// GET total market data cryptos
export const getEntireMarket = () => {
  const searchUrl =
    'https://api.coingecko.com/api/v3/global'
  const config = {
    method: 'get',
    url: searchUrl,
  }
  return axios(config)
}

// GET crypto news 
export const getCryptoNews = () => {
  const searchUrl = 'https://crypto-news-live3.p.rapidapi.com/news'
  const host = "crypto-news-live3.p.rapidapi.com"
  const apiKey = env.REACT_APP_API_KEY
  const config = {
    method: 'get',
    url: searchUrl,
    headers: {
      'X-RapidAPI-Host': `${host}`,
      'X-RapidAPI-Key': `${apiKey}`
    }
  }
  return axios(config)
}