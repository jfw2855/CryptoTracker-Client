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
  const [avgBuy,setAvgBuy] = useState(null)
  const [quantity,setQuantity] = useState(null)
  const [pl_amount, setPl_amount] = useState(null)
  const [pl_percentage, setPl_percentage] = useState(null)
  let editModal
  let transactionsDisplay
  const location = useLocation()
  const {currPrice,daily,symbol,img,name}=location.state
  
  useEffect(() => {
    const fetchData = async () => {
      setUpdated(false)
      let viewResp = await viewTransactions(user,coin)
      let tempTransactions = viewResp.data.transaction
      let tempAvg = 0
      let tempAmt = 0
      setTransactions(tempTransactions)
      for (let i in tempTransactions) {
        tempAvg+=tempTransactions[i].price
        tempAmt+=tempTransactions[i].amount
      }
      tempAvg=tempAvg/tempTransactions.length
      setAvgBuy(tempAvg)
      setQuantity(tempAmt)
      setPl_amount(((currPrice/tempAvg)-1)*currPrice)
      setPl_percentage(((currPrice/tempAvg)-1)*100)
    }
    fetchData()
    }, [updated])


  const handleEdit = (e, transaction, index) => {
    setNum(index)
    setModalOpen(true)
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
    const updatedTransactions = await showCoinPurchases(user,coin)
    let buyArr = updatedTransactions.data.transaction
    let amount = 0
    let price = 0
    for (let i in buyArr) {
      amount += buyArr[i].amount
      price += buyArr[i].price
    }
    price = price/buyArr.length
    let assetToUpdate = {coinGeckId:coin,avgPrice:price,quantity:amount}
    await addCoinAsset(user, assetToUpdate)
    setUpdated(true)
  }
  
  
  if (!pl_percentage) {
    return <span class="loader"></span>

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
        showCoinPurchases={showCoinPurchases}
        addCoinAsset={addCoinAsset}
        triggerRefresh={() => setUpdated(prev => !prev)}
        updateTransaction={updateTransaction}
        handleClose={() => {
          setModalOpen(false)
          setNum(null)
        }}
      />  
  } 
  return (
    <>
    <div className="portfolio-container">
      <div>
        <img src={img} width={35}/> <span>{name} ({symbol.toUpperCase()})</span> <span className={daily>0?'green':'red'}>{daily.toFixed(2)}%</span>
        Balance: {(quantity*currPrice).toLocaleString('en-US', {style:'currency',currency:'USD'})}
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
        <Row>{pl_amount.toLocaleString('en-US', {style:'currency',currency:'USD'})} {pl_percentage.toFixed(2)}% </Row>
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
