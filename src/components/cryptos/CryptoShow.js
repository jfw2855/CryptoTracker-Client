import React, { useState, useEffect } from 'react'
import { showCrypto, getHistory } from '../../api/cryptos'
import { useParams } from 'react-router-dom'
import { Row, Col} from 'react-bootstrap'
import CryptoGraph from './CryptoGraph'
import {
  createFavorite,
  getAFavorite,
  deleteFavorite,
} from '../../api/favorites'
import { BsFillStarFill } from 'react-icons/bs'

const CryptoShow = (props) => {
  const { id } = useParams()
  const { user } = props
  const [crypto, setCrypto] = useState(null)
  const [history, setHistory] = useState(null)
  const [updated, setUpdated] = useState(false)
  const [fav, setFav] = useState(false)

  // gets crypto data from external api
  useEffect(() => {
    const fetchData = async () => {
      const checkFav = await getAFavorite(user, id)
      if (checkFav.data.favorites.length > 0) {
        setFav(true)
      } else {
        setFav(false)
      }
      const respShow = await showCrypto(id)
      setCrypto(respShow.data)
      const respHistory = await getHistory(id)
      transformData(respHistory.data.prices)
      setUpdated(false)
    }
    fetchData()
  }, [updated])

  // handle fav function that adds or removes coin from user's favorites
  const handleFavorite = (e) => {
    e.preventDefault()

    // createFavorite(user, crypto)
    if (fav) {
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

  // coin's price history data to be graphed
  const transformData = (temp) => {
    let plot_data = []
    let time = []
    let price = []
    temp.map((each) => {
      time.push(new Date(each[0]))
      price.push(each[1])
    })
    plot_data['time'] = time
    plot_data['price'] = price

    setHistory(plot_data)
  }
  if (!history) {
    return <span class="loader"></span>
  }

  return (
    <div className="container show">
      <Row>
        <Col>
          <div className="pic-div" style={{ margin: 'auto' }}>
            <div
              style={{
                marginRight: '10px',
                display: 'inline-block',
                marginTop: '-20px',
              }}
            >
              <img
                src={crypto.image.small}
                alt={crypto.id}
                style={{ display: 'inline-block', float: 'left' }}
              />
            </div>
            <h1
              className="logo name"
              style={{ display: 'inline-block', marginBottom: '20px' }}
            >
              {crypto.name}
              <BsFillStarFill
                onClick={(e) => handleFavorite(e)}
                style={fav ? { color: 'orange' } : { color: 'white' }}
                type="button"
                fontSize="36px"
              />
            </h1>
            <br />
          </div>
          
          <Row>
            <Col>
              <span>Market Cap Rank </span>
              <br />
              <h1>#{crypto.market_cap_rank}</h1>
            </Col>
            <Col>
              <span>Circulating Supply</span>
              <br />
              <h1>
                {crypto.market_data.circulating_supply.toLocaleString(
                  undefined,
                  { maximumFractionDigits: 0 }
                )}
              </h1>
            </Col>
          </Row>
        </Col>
        <Col style={{ borderBottom: 'grey 1px solid', marginTop: '30px' }}>
          <span>
            {crypto.name} ({crypto.symbol}) price
          </span>{' '}
          <br />
          <h1 className="price" style={{ borderBottom: 'grey 1px solid' }}>
            $
            {crypto.market_data.current_price.usd > 1
              ? crypto.market_data.current_price.usd.toLocaleString('en-US')
              : crypto.market_data.current_price.usd.toPrecision(4)}
          </h1>{' '}
          <br />
          <Row>
            <Col>
              <span>24hr change </span>
              <br />
              <h1
                style={
                  crypto.market_data.price_change_percentage_24h > 0
                    ? { color: 'green' }
                    : { color: 'red' }
                }
              >
                {crypto.market_data.price_change_percentage_24h.toFixed(2)}%
              </h1>
            </Col>
            <Col>
              <span>Market Cap</span>
              <br />
              <h1>${crypto.market_data.market_cap.usd.toLocaleString()}</h1>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <div className="graph-container">
          <Col>
            <CryptoGraph history={history} crypto={crypto} />
          </Col>
          <Col>
            <div className="scroll-show">
              <td dangerouslySetInnerHTML={{ __html: crypto.description.en }} />
            </div>
          </Col>
        </div>
      </Row>
    </div>
  )
}

export default CryptoShow