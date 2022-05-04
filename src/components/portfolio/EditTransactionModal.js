import React, { useState } from 'react'
import { Modal, Container, Form, Button, Row, Col } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const EditTransactionModal = (props) => {
  const {
    show,
    user,
    triggerRefresh,
    updateTransaction,
    handleClose,
    showCoinPurchases,
    addCoinAsset,
  } = props
  const [transaction, setTransaction] = useState(props.transaction)
  const [date, setDate] = useState(null)

  // updates the transaction state variable for each key stroke/selection
  const handleChange = (e) => {
    // e === event
    e.persist()

    setTransaction((prevTrans) => {
      const name = e.target.name
      let value = e.target.value

      if (e.target.type === 'number') {
        value = +e.target.value
      }
      const updatedValue = { [name]: value }
      return { ...prevTrans, ...updatedValue }
    })
  }

  // handle date function that converts date to ISO string then updates date & transaction state variables
  const handleDate = (selectDate, e) => {
    setDate(selectDate)
    setTransaction((prevTrans) => {
      return { ...prevTrans, datetime: selectDate.toISOString().split('T')[0] }
    })
  }

  // handle submit function that will update the transaction and saves to the db
  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateTransaction(user, transaction)
    const updatedTransactions = await showCoinPurchases(
      user,
      transaction.coinGeckId
    )
    let buyArr = updatedTransactions.data.transaction
    let amount = 0
    let price = 0
    for (let i in buyArr) {
      amount += buyArr[i].amount
      price += buyArr[i].price
    }
    price = price / buyArr.length
    let assetToUpdate = {
      coinGeckId: transaction.coinGeckId,
      avgPrice: price,
      quantity: amount,
    }
    await addCoinAsset(user, assetToUpdate)
    handleClose()
    triggerRefresh()
  }

  return (
    <Modal show={show} onHide={handleClose} style={{ color: 'black' }}>
      <Modal.Header closeButton style={{ color: 'black' }}>
        Update Transaction
      </Modal.Header>
      <Modal.Body>
        <Container className="justify-content-center">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  defaultValue={transaction.amount}
                  name="amount"
                  type="number"
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  defaultValue={transaction.price}
                  name="price"
                  type="number"
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Form.Label>Date</Form.Label>
            <DatePicker
              dateFormat="E MMM dd yyyy"
              name="datetime"
              type="date"
              selected={date}
              value={date}
              onChange={(selectDate, e) => handleDate(selectDate, e)}
            />
            <Button className="new-transaction-btn" type="submit">
              Update Transaction
            </Button>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default EditTransactionModal
