import React, { useState, useEffect} from 'react'
import {Row, Col, ListGroup } from 'react-bootstrap'
import { viewPortfolio, getPData } from '../../api/portfolio'
import { Link } from 'react-router-dom'
import {BsPlusLg,BsArrowLeftRight,BsTrash} from 'react-icons/bs'

const PortfolioIndex = (props) => {

  const [assets,setAssets] = useState(null)
  // mData == Market Data -> state var to set current market data of user's assets
  const [mData,setMData] = useState(null)
  const { user,msgAlert} = props
  let assetsDisplay = null
  let query = ""


  // calls backend server for portfolio assets then uses info to make an external api call to grab market data
  useEffect(() => {
    const fetchData = async () => {
      const respAssets = await viewPortfolio(user)
      const respCoins = respAssets.data.portfolio[0].assets

      for (let i in respCoins) {
        query+=`${respCoins[i].coinGeckId}%2C`
      }
      const respMData = await getPData(query)
      console.log('querryyy data',respMData.data)

      // updates the response data with average price and quantity of assets
      for (let i in respMData.data) {
        //currCoin == current coin
        let currCoin =respMData.data[i]
        currCoin.avgPrice = respCoins[i].avgPrice
        currCoin.quantity = respCoins[i].quantity
        // adds profit loss amount and precentage to currCoin object; pl == profit loss
        currCoin.pl_amount =(((currCoin.current_price/currCoin.avgPrice)-1))*currCoin.current_price
        currCoin.pl_precentage = (((currCoin.current_price/currCoin.avgPrice)-1))*100
      }
      setMData(respMData.data)
    }
    fetchData()
  }, [])
  
  if(!mData) {
    return <p>Loading...</p>
  }



  if(mData.length>0) {
    //coinGeckId: 'meme', avgPrice: 500, quantity: 1

    assetsDisplay = mData.map( (coin,index) => ( 
        <ListGroup.Item style={{backgroundColor:'lightgrey'}} key={coin._id}>
            <Row style={{alignItems:'center'}}>
                <Col md={3}>
                <img src={coin.image} alt={coin.name} width={25} style={{borderRadius:'50%'}}/> <strong>{coin.name}</strong> {coin.symbol.toUpperCase()}
                </Col>
                <Col>
                ${coin.current_price>1?coin.current_price.toLocaleString('en-US'):coin.current_price.toPrecision(4)}
                </Col>
                <Col>
                <span style={coin.price_change_percentage_24h>0?{color:'green'}:{color:"red"}}>{coin.price_change_percentage_24h.toFixed(2)}%</span>
                </Col>
                <Col>
                {coin.quantity}
                </Col>
                <Col>
                ${coin.avgPrice>1?coin.avgPrice.toLocaleString('en-US'):coin.avgPrice.toPrecision(4)}
                </Col>
                <Col style={coin.pl_precentage>0?{color:'green'}:{color:"red"}}>
                  <Row>{coin.pl_amount>0?`+${coin.pl_amount.toLocaleString('en-US', {style:'currency',currency:'USD'})}`:`-${coin.pl_amount.toLocaleString('en-US')}`} </Row>
                  <Row>{coin.pl_precentage.toFixed(2)}% </Row>
                </Col>
                <Col>
                &nbsp;<BsPlusLg/> &nbsp;&nbsp;<BsArrowLeftRight/> &nbsp;&nbsp;<BsTrash/>
                </Col>
            </Row>
        </ListGroup.Item>
        
    ))
}

  

  return (
    <>
      <button>Add to Portfolio</button>
      <ListGroup style={{width:'68%'}}>
        <ListGroup.Item style={{backgroundColor:'lightgrey'}}>
          <Row style={{fontWeight:'bold'}}>
            <Col md={3}>
            Name
            </Col>
            <Col>
            Price
            </Col>
            <Col>
            24H (%)
            </Col>
            <Col>
            Holdings
            </Col>
            <Col>
            Avg. Buy Price
            </Col>
            <Col>
            Profit/Loss
            </Col>
            <Col>
            Actions
            </Col>
          </Row>
        </ListGroup.Item>
        {assetsDisplay}

      </ListGroup>
      <Link to="/transaction">Transactions!</Link>
    </>
  )
}

export default PortfolioIndex
