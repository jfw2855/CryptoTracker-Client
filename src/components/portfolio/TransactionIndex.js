import { queryByAltText } from '@testing-library/react'
import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { viewTransactions } from '../../api/transaction'
import { Spinner, ListGroup, Row, Col} from 'react-bootstrap'
import {BsTrash,BsPencilFill} from 'react-icons/bs'


const TransactionIndex = (props) => {
  const {coin} = useParams()
  const { user,msgAlert} = props
  const [transactions,setTransactions] = useState(null)
  let transactionsDisplay
  const location = useLocation()
  const {quantity,currPrice,daily,symbol,avgBuy,pl_amount,pl_precentage,img,name}=location.state

  console.log('name?',pl_precentage,img,name)
// USE EFFECT PSEUDOCODE
// fetch data from transaction of specific coin (backend server)
// fetch data from assets of coin (backend server) - provided by useLocation
// fetch current market data of coin (external api) - provided by useLocation

  useEffect(() => {
    viewTransactions(user,coin)
      .then((res) => {
        console.log('res.data.tranaction!',res.data.transaction)
        setTransactions(res.data.transaction)
      })
      .catch((err) => console.log(err))
  }, [])

  if (transactions && transactions.length>0) {
    transactionsDisplay = transactions.map(transaction => (
      <ListGroup.Item key={transaction._id}>
      
        <Row style={{ alignItems: 'center' }}>
          <Col>
            {transaction.type}
          </Col>
          <Col>
            {transaction.price}
          </Col>
          <Col>
            {transaction.amount}
          </Col>
          <Col>
            <BsPencilFill/> <BsTrash/>
          </Col>
        </Row>
      </ListGroup.Item>
        
    ))

  }

  if (!transactions) {
    return <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading</span>
    </Spinner>
  }
  return (
    <>
    <img src={img} width={50}/>
    <h5 style={{color:'white'}}>{name} ({symbol.toUpperCase()})</h5>
    <p style={{color:'white'}}>24H: {daily.toFixed(2)}%</p>
    <p style={{color:'white'}}>Balance: {(quantity*currPrice).toLocaleString('en-US', {style:'currency',currency:'USD'})}</p>
    <p style={{color:'white'}}>Quantity: {quantity} {symbol.toUpperCase()} </p>
    <p style={{color:'white'}}>Avg. Buy Price {avgBuy.toLocaleString('en-US', {style:'currency',currency:'USD'})}</p>
    <p style={{color:'white'}}>P/L: {pl_amount.toLocaleString('en-US', {style:'currency',currency:'USD'})} {pl_precentage.toFixed(2)}%</p>
    <button>Add Transaction</button>
           <ListGroup style={{ width: '85%' }}>
        <ListGroup.Item>
          <Row style={{ fontWeight: 'bold' }}>
            <Col>
              Type
            </Col>
            <Col>
              Price
            </Col>
            <Col>
              Amount
            </Col>
            <Col>
              Actions
            </Col>
          </Row>
        </ListGroup.Item>
        {transactionsDisplay}
        
      </ListGroup>
    </>
  )
}

export default TransactionIndex
