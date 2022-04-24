import React, { useState, useEffect, useCallback } from 'react'
import { Form, Container, Button, Card, Link, Row, Col, ListGroup } from 'react-bootstrap'
import { viewPortfolio, getPData } from '../../api/portfolio'


const PortfolioIndex = (props) => {

  const [assets,setAssets] = useState(null)
  const { user,msgAlert} = props
  let assetsDisplay = null
  let query = ""

  
  useEffect(() => {
    viewPortfolio(user)
      .then((res) => {
        setAssets(res.data.portfolio[0].assets)
        //console.log('this IS PORTFOLIO', res.data.portfolio)
      })
      .then(()=>{
        for (let i in assets) {
          console.log('coin! in assets!',assets[i])
          query+=`${assets[i].coinGeckId}%2C`
        }
        console.log('this is query!',query)
        getPData(query)
         .then((test)=> {
           console.log('this is the res from get crypts',test.data)

         })
      })
      .catch((err) => console.log(err))
  }, [])
  
  if(!assets) {
    return <p>Loading...</p>
  } else {
    
    console.log('portfolio!!!!',assets)
  }



  if(assets.length>0) {
    //coinGeckId: 'meme', avgPrice: 500, quantity: 1

    assetsDisplay = assets.map( (coin,index) => ( 
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
