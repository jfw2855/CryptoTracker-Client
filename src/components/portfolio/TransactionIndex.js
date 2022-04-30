import { queryByAltText } from '@testing-library/react'
import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { viewTransactions,updateTransaction,removeTransaction, createTransaction,showCoinPurchases } from '../../api/transaction'
import {  ListGroup, Row, Col, Button} from 'react-bootstrap'
import {BsTrash,BsPencilFill} from 'react-icons/bs'
import EditTransactionModal from './EditTransactionModal'
import CreateCoinModal from './CreateCoinModal'
import { addCoinAsset } from '../../api/coin'



const TransactionIndex = (props) => {
  const {coin} = useParams()
  const { user,msgAlert } = props
  const [transactions,setTransactions] = useState(null)
  const [modalOpen,setModalOpen] = useState(false)
  const [createOpen,setCreateOpen] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [num, setNum] = useState(null)
  let editModal
  let transactionsDisplay
  const location = useLocation()
  const {quantity,currPrice,daily,symbol,avgBuy,pl_amount,pl_precentage,img,name}=location.state

  useEffect(() => {
    viewTransactions(user,coin)
      .then((res) => {
        setUpdated(false)
        setTransactions(res.data.transaction)
      })
      .catch((err) => console.log(err))
    }, [updated])
    
  const handleEdit = (e, transaction, index) => {
    setNum(index)
    const handleOpen = () => {
      setModalOpen(true)
    }
    handleOpen()
    }

  const handleCreate = (e) => {
    setCreateOpen(true)
  }
  const convertDate =(dt) => {
    let convertedDate = new Date (dt)
    convertedDate.setDate(convertedDate.getDate()+1)
    convertedDate = convertedDate.toDateString()
    return  convertedDate
  }
  const handleDelete = async (e,transId) => {
    await removeTransaction(user,transId)
    setUpdated(true)
  }

  if (transactions && transactions.length > 0) {
    
    transactionsDisplay = transactions.map((transaction, index) => (
      <ListGroup.Item key={transaction._id}>
    
      <Row style={{ alignItems: 'center' }}>
        <Col>
          <Row>{transaction.type}</Row>
          <Row>{ convertDate(transaction.datetime)}</Row>
        </Col>
        <Col>
          {transaction.price.toLocaleString('en-US', {style:'currency',currency:'USD'})}
        </Col>
        <Col>
          <Row>{(transaction.amount*transaction.price).toLocaleString('en-US', {style:'currency',currency:'USD'})}</Row>
          <Row>{transaction.amount} {symbol.toUpperCase()}</Row>
          
        </Col>
        <Col>
            <BsPencilFill type='button' onClick={(e) => handleEdit(e, transaction, index)}/> 
            <BsTrash type='button' onClick={(e) => handleDelete(e,transaction)}/>
        </Col>
      </Row>
    </ListGroup.Item>
      )) 
    }
      
  if (num !== null) {
    editModal = <EditTransactionModal
        transaction={transactions[num]}
        show={modalOpen}
        user={user}
        msgAlert={msgAlert}
        triggerRefresh={() => setUpdated(prev => !prev)}
        updateTransaction={updateTransaction}
        handleClose={() => {
          setModalOpen(false)
          setNum(null)
        }}
      />  
  } 
  if (!transactions) {
    return <span class="loader"></span>

  }
  return (
    <>
    <div className="portfolio-container">
      <div>
        <img src={img} width={35}/> <span>{name} ({symbol.toUpperCase()})</span> <span className={daily>0?'green':'red'}>{daily.toFixed(2)}%</span>
      </div>

    <Row>
      <Col>
        <Row>Quantity</Row>
        <Row>{quantity} {symbol.toUpperCase()} </Row>
      </Col>
      <Col>
        <Row>Avg. Buy Price</Row>
        <Row>{avgBuy.toLocaleString('en-US', {style:'currency',currency:'USD'})} </Row>
      </Col>
      <Col>
        <Row>Total Profit / Loss</Row>
        <Row>{pl_amount.toLocaleString('en-US', {style:'currency',currency:'USD'})} {pl_precentage.toFixed(2)}% </Row>
      </Col>
    </Row>

    <button onClick={handleCreate}>Add Transaction</button>
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
      </div>
      {editModal}
      <CreateCoinModal
            coinId={coin}
            show={createOpen}
            user={user}
            msgAlert={msgAlert}
            triggerRefresh={() => setUpdated(prev => !prev)}
            createTransaction={createTransaction}
            showCoinPurchases={showCoinPurchases}
            addCoinAsset = {addCoinAsset}
            handleClose={() => {
              setUpdated(true)
              setCreateOpen(false)
            }}
          />     
    </>
  )
}

export default TransactionIndex
