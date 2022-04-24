import React, { useState, useEffect } from 'react'
import { getCryptos } from '../../api/cryptos'
import { Card } from 'react-bootstrap'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const TopCryptos = () => {
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
        return <p>loading...</p>
    } else if (cryptos.length === 0) {
        return <p>No grocery found</p>
    }
  
  
  let cryptoCards = cryptos.map((crypto) => (
    <Card key={crypto.id} style={{ width: '30%' }} className="m-2">
      <Card.Header>{crypto.name} ({crypto.symbol})</Card.Header>
      <Card.Body>
        <img src={crypto.image} alt={crypto.name} />
      </Card.Body>
      <Card.Footer>
        Price: ${crypto.current_price}
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

export default TopCryptos
