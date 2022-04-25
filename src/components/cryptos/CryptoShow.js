import React, { useState, useEffect } from 'react'
import { showCrypto, getHistory } from '../../api/cryptos'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner, Row, Col, Accordion } from 'react-bootstrap'
import Plot from 'react-plotly.js';
import CryptoGraph from './CryptoGraph';


const CryptoShow = () => {

  const { id } = useParams()
  console.log('id', id)
  const [crypto, setCrypto] = useState(null)
  const [history, setHistory] = useState(null)
  let graph

  // const { state } = useLocation()
  useEffect(() => {
    const fetchData = async () => {
      const respShow = await showCrypto(id)
      setCrypto(respShow.data)
      const respHistory = await getHistory(id)
      transformData(respHistory.data.prices)
    } 
    fetchData()
  }, [])

  const transformData = (temp) => {
    let plot_data = []
    let time = []
    let price = []
    temp.map(each => {
      time.push(new Date(each[0]))
      price.push(each[1])
    })
    plot_data['time'] = time
    plot_data['price'] = price

    setHistory(plot_data)
    
  }
  
    if (!history) {
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
              <h1 style={crypto.market_data.price_change_percentage_24h > 0 ? { color: 'green'} : {color: 'red'}}
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
      <div>
        {/* {graph} */}
        <CryptoGraph
          history={history}
          crypto = {crypto}
        />
      </div>
    </div>
  )
}

export default CryptoShow