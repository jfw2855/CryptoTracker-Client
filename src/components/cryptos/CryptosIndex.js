import React, { useState, useEffect } from 'react'
import { getCryptos } from '../../api/cryptos'
import { Link, useNavigate } from 'react-router-dom'
import { Spinner, Card } from 'react-bootstrap'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const CryptosIndex = () => {

  const navigate = useNavigate()

  const [cryptos, setResults] = useState(null)

  useEffect(() => {
    getCryptos()
      .then((res) => {
        setResults(res.data)
      })
      .catch((err) => console.log(err))
  }, [])
    console.log('the response', cryptos)

    if (!cryptos) {
        return<Spinner animation="border" role="status">
        <span className="visually-hidden">Loading</span>
      </Spinner>
    } 
  
  
  
  
  let cryptoCards = cryptos.map((crypto) => (
    <Card key={crypto.id} style={{ width: '30%' }} className="text-centered m-2">
      <Card.Header>{crypto.name} ({crypto.symbol})</Card.Header>
      <Card.Body>
        <img src={crypto.image} alt={crypto.name} />
      </Card.Body>
      <Card.Footer>
        Price: ${crypto.current_price}
        <Link style={{color : "black"}} to={`/crypto/${crypto.id}`}>View Coin</Link>
      </Card.Footer>
    </Card>
  ))

  

  return (
    <>
      <h1 className='logo'>Top Cryptos</h1>
        <div style={cardContainerLayout}>
            {cryptoCards}
        </div>
    </>
  )
}

export default CryptosIndex
