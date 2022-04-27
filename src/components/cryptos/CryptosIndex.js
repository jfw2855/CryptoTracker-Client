import React, { useState, useEffect, Fragment } from 'react'
import { getCryptos } from '../../api/cryptos'
import { Link, useNavigate } from 'react-router-dom'
import { Spinner, Card, Row, Col, ListGroup, Button } from 'react-bootstrap'
import { BsStar } from "react-icons/bs";

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const CryptosIndex = () => {

  const navigate = useNavigate()

  const [cryptos, setResults] = useState(null)
  let assetsDisplay = null
  useEffect(() => {
    getCryptos()
      .then((res) => {
        setResults(res.data)
      })
      .catch((err) => console.log(err))
  }, [])
  console.log('the response', cryptos)

  if (!cryptos) {
    return <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading</span>
    </Spinner>
  }

  if (cryptos.length > 0) {
    //coinGeckId: 'meme', avgPrice: 500, quantity: 1

    assetsDisplay = cryptos.map((crypto) => (
      <ListGroup.Item key={crypto._id}>
        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/crypto/${crypto.id}`}>
        <Row style={{ alignItems: 'center' }}>
            <Col>

              <BsStar fontSize="14px" />
          <span style={{marginLeft: 5}}>{crypto.market_cap_rank}</span>
          </Col>
          <Col>
            <img src={crypto.image} alt={crypto.name} width={25} style={{ backgroundColor: "white" }} /> <strong>{crypto.name}</strong> {crypto.symbol.toUpperCase()}
          </Col>
          <Col>
            ${crypto.current_price > 1 ? crypto.current_price.toLocaleString('en-US') : crypto.current_price.toPrecision(4)}
          </Col>
          <Col>
            <span style={crypto.price_change_percentage_24h > 0 ? { color: 'green' } : { color: "red" }}>{crypto.price_change_percentage_24h.toFixed(2)}%</span>
          </Col>
          <Col>
            ${crypto.market_cap.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </Col>
        </Row>
      </Link>
      </ListGroup.Item>
        
    ))
  }

  return (
    <>
        
      <ListGroup style={{ width: '85%' }}>
        <ListGroup.Item>
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
    </>
  )
}

export default CryptosIndex
