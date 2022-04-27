import { queryByAltText } from '@testing-library/react'
import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { viewTransactions } from '../../api/transaction'
import { Spinner } from 'react-bootstrap'


const TransactionIndex = (props) => {
  const {coin} = useParams()
  const { user,msgAlert} = props
  const [transactions,setTransactions] = useState(null)

  useEffect(() => {
    viewTransactions(user,coin)
      .then((res) => {
        setTransactions(res.data.transaction)
      })
      .catch((err) => console.log(err))
  }, [])


  if (!transactions) {
    return <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading</span>
    </Spinner>
  }
  return (
    <>
      <h1>Transactions for {coin} </h1>
    </>
  )
}

export default TransactionIndex
