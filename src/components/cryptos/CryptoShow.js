import React, { useState, useEffect } from 'react'
import { showCrypto, getHistory } from '../../api/cryptos'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Spinner, Row, Col, Accordion, Button } from 'react-bootstrap'
import Plot from 'react-plotly.js'
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
  // console.log('id', id)
  const [crypto, setCrypto] = useState(null)
  const [history, setHistory] = useState(null)
  const [updated, setUpdated] = useState(false)
  const [fav, setFav] = useState(false)

  // const { state } = useLocation()
  useEffect(() => {
    const fetchData = async () => {
      const checkFav = await getAFavorite(user, id)
      // console.log('check fav data', checkFav.data.favorites)
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
    // getAllFavorites(user, crypto.id)
    //   // .then(() => setUpdated(true))
    //   .then((res) => console.log('response from create favorite button', res))
    //   .catch((err) => console.log(err))
  }

  // data to be graphed
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
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading</span>
      </Spinner>
    )
  }
  console.log('show page data', crypto)
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
          {/* <h5 style={{marginLeft: '70px', display: 'inline-block'}}>Rank #{crypto.market_cap_rank}</h5> */}
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
            {crypto.market_data.current_price.usd.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
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
            <div className="graph">
              <CryptoGraph history={history} crypto={crypto} />
            </div>
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
