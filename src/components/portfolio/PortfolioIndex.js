import { queryByAltText } from '@testing-library/react'
import React, { useState, useEffect, useCallback } from 'react'
import { Form, Container, Button, Card, Link, Row, Col, ListGroup } from 'react-bootstrap'
import { viewPortfolio, getPData } from '../../api/portfolio'


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
        respMData.data[i].avgPrice = respCoins[i].avgPrice
        respMData.data[i].quantity = respCoins[i].quantity
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
        <ListGroup.Item key={coin._id}>
            <Row>
                <Col>
                    <span>{coin.coinGeckId}</span>
                </Col>
                <Col>
                </Col>
                <Col>
                </Col>
            </Row>
        </ListGroup.Item>
    ))
}

  

  return (
    <>
      <h1 className='logo'>Portfolio</h1>
    </>
  )
}

export default PortfolioIndex
