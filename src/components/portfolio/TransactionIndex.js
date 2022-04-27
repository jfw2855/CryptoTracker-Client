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

// USE EFFECT PSEUDOCODE
// fetch data from transaction of specific coin (backend server)
// fetch data from assets of coin (backend server)
// fetch current market data of coin (external api)


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
