import React, { useState, useEffect } from 'react'
import { showCrypto } from '../../api/cryptos'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner, Row, Col, Accordion } from 'react-bootstrap'

const CryptoShow = () => {

  const { id } = useParams()
  console.log('id', id)
  const [crypto, setCrypto] = useState(null)

  // const { state } = useLocation()

  useEffect(() => {
    showCrypto(id)
      .then((res) => {
        setCrypto(res.data)
        console.log('this is res show page', res.data)
      })
      .catch((err) => console.log(err))
  }, [])

    if (!crypto) {
        return<Spinner animation="border" role="status">
        <span className="visually-hidden">Loading</span>
      </Spinner>
    } 

  return (
   
    <div className="container show">
      <Row>
        <Col>
          <h1 className='logo name'>{crypto.name}</h1><h6>{crypto.symbol.toUpperCase()}</h6>
          <img src={crypto.image.small} alt="" /><br />
          <span>Rank #{ crypto.market_cap_rank}</span>
        </Col>
        <Col>
          <span>{ crypto.name } ({crypto.symbol}) price</span> <br/>
          <h1 className='price'>${crypto.market_data.current_price.usd.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h1> <br/>
          <Row>
            <Col>
              <span>24hr change </span><br />
              <h1 //style={{ crypto.market_data.price_change_percentage_24h } > 0 ? { backgroundColor: 'green'} : {backgroundColor: 'red'}}
              >
              {crypto.market_data.price_change_percentage_24h.toFixed(2)}%
              </h1>
            </Col>
            <Col>
              <span>Market Cap</span><br />
              <h1>
              ${crypto.market_data.market_cap.usd.toLocaleString()}
              </h1>
            </Col>
          </Row>
        </Col>
      </Row>
      <Accordion>
        <Accordion.Header>Want to learn more about {crypto.name}?</Accordion.Header>
        <Accordion.Body>
         <td dangerouslySetInnerHTML={{__html: crypto.description.en}} />
        </Accordion.Body>
      </Accordion>
    </div>
  )
}

export default CryptoShow