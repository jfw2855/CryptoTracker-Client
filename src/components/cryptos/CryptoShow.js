import React, { useState, useEffect } from 'react'
import { showCrypto } from '../../api/cryptos'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

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
    <>
      <h1 className='logo'>{crypto.name}</h1>
      <p>${crypto.market_data.current_price.usd.toFixed(2)}  <span>24 hour change {crypto.market_data.price_change_percentage_24h.toFixed(2)}%</span></p>
      <p>Market Cap: { crypto.market_data.market_cap.usd.toLocaleString() }</p>
      {/* <p className='logo'><a>Test</a>{crypto.description.en}</p> */}
      <td dangerouslySetInnerHTML={{__html: crypto.description.en}} />
      <a>Test</a>
    </>
  )
}

export default CryptoShow