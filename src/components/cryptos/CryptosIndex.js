import React, { useState, useEffect } from 'react'
import { getCryptos, getEntireMarket, getTrending, getCryptoNews } from '../../api/cryptos'
import { Link } from 'react-router-dom'
import { Row,Col, ListGroup} from 'react-bootstrap'
import {BsFillStarFill } from "react-icons/bs";
import { getAllFavorites, deleteFavorite, createFavorite } from '../../api/favorites'
import Newsfeed from './Newsfeed';

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const CryptosIndex = (props) => {

  const { user } = props
  const [favorites, setFavorites] = useState([])
  const [updated, setUpdated] = useState(false)
  const [cryptos, setResults] = useState(null)
  const [market, setMarket] = useState(null)
  const [news, setNews] = useState([])
  const [trending, setTrending] = useState([])

  let assetsDisplay = null
  let marketBanner = null

  // fetches cryptocurrency data from external api
  useEffect(() => {
    const fetchData = async () => {
      getCryptos()
        .then((res) => 
        setResults(res.data)
      )
      getTrending()
        .then((res) => {
          setTrending(res.data.coins)
        })
      getCryptoNews()
        .then((res) => {
          setNews(res.data)
        })
        if (user) {      
          getAllFavorites(user)
          .then((res) => {
            setFavorites(res.data.favorites)
            setUpdated(false)
          })
        } else {
          console.log('no user')
        }
      getEntireMarket()
        .then((market) => {
          setMarket(market.data.data)
        })
    }
    fetchData()
  }, [updated])



  // renders loader while waiting for api resp
  if (!cryptos) {
    return <span class="loader"></span>
  }
  
 // handle fav function that adds or removes coin from user's favorites
 const handleFavorite = (e, id) => {
    e.preventDefault()

    if (items.includes(id)) {
      // delete route
      deleteFavorite(user, id)
        .then(() => setUpdated(true))
        .catch((err) => console.log(err))

    } else {
      // add favorite
      createFavorite(user, id)
        .then(() => setUpdated(true))
        .catch((err) => console.log(err))
    }
  }

  
  // sets favorites to a favorites array (item) that will check if id is in array
    //e.g. if coin is in items array, star will appear next to coin's name
  const items = []
   if (favorites.length > 0) {
      for (let i = 0; i < favorites.length; i++){
      items.push(favorites[i].coinGeckId)
    }
  }


  // awaits for market state variable to have data before rendering market banner
  if (market) {

    // creates a market banner of current cryptocurrency global data
      marketBanner =  
        <>
        <ListGroup className='banner'>
          
      <ListGroup.Item  className='banner'>
      <Row style={{ height: '20px' }}>
      <Col>
                Cryptos: {market.active_cryptocurrencies.toLocaleString()}
      </Col>
      <Col>
                Exchanges: {market.markets.toLocaleString()}
      </Col>
      <Col>
                Market Cap: 
                ${market.total_market_cap.usd.toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </Col>
      <Col>
                24h Market Cap %: <span style={market.market_cap_change_percentage_24h_usd > 0 ? { color: 'green'} : {color: 'red'}}> {market.market_cap_change_percentage_24h_usd.toLocaleString(undefined, { maximumFractionDigits: 2 })}%</span>
      </Col>
      <Col>
                Dominance:  
                BTC: {market.market_cap_percentage.btc.toLocaleString(undefined, { maximumFractionDigits: 2 })}%
                ETH: {market.market_cap_percentage.eth.toLocaleString(undefined, { maximumFractionDigits: 2 })}%
      </Col>
      </Row>
      </ListGroup.Item>
    </ListGroup>

      </>
  }
      
      
    
  // awaits for api resp in order to render crypto indexes
  if (cryptos.length > 0) {
    assetsDisplay = cryptos.map((crypto) => {
      return (
            <ListGroup.Item style={{backgroundColor:'transparent', borderTop:'grey 1px solid',zIndex:'5 !important'}} key={crypto._id} >
                <Row style={{ alignItems: 'center', color:'white' }}>
                  <Col>
                  <BsFillStarFill onClick={(e) => handleFavorite(e, crypto.id)} style={ items.includes(crypto.id) ? {color:'orange'} : {color:'white'} }type = "button" fontSize="14px" />
                    <span style={{ marginLeft: 5 }}>{crypto.market_cap_rank}</span>
                  </Col>
                  <Col>
              <Link style={{ textDecoration: 'none', color: 'black' }} to={`/crypto/${crypto.id}`}>
                    <img src={crypto.image} alt={crypto.name} width={25} style={{ backgroundColor: "white", borderRadius:'50%' }} /> <strong style={{color: 'white'}}>{crypto.name}</strong><span style={{color: 'white'}}> {crypto.symbol.toUpperCase()}</span>
              </Link>
                  </Col>
                  <Col>
                    ${crypto.current_price > 1 ? crypto.current_price.toLocaleString('en-US') : crypto.current_price.toPrecision(4)}
                  </Col>
                  <Col>
                    <span className={crypto.price_change_percentage_24h > 0 ? 'green': 'red'}>{crypto.price_change_percentage_24h.toFixed(2)}%</span>
                  </Col>
                  <Col>
                    ${crypto.market_cap.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </Col>
                </Row>
            </ListGroup.Item>
          )
        })
  }

  return (
    <>
      {marketBanner}
      <Newsfeed
        news={news}
        trending={trending}
      />
      <div className='home-list'>

        <ListGroup className='scroll' style={{ width: '90%', zIndex: '5' }}>
        <h1 style={{ color: 'white', marginTop:'10px', zIndex: '5'}}>Top 100 Cryptos by Market Cap</h1>
          <ListGroup.Item variant="dark">
            <Row style={{ fontWeight: 'bold' }}>
              <Col>
                Rank
              </Col>
              <Col>
                Name
              </Col>
              <Col>
                Price
              </Col>
              <Col>
                24h %
              </Col>
              <Col>
                Market Cap
              </Col>
            </Row>
          </ListGroup.Item>
          {assetsDisplay}
          
        </ListGroup>
      </div>
    </>
  )
}

export default CryptosIndex