import { name } from 'plotly.js/lib/bar'
import React, { useState } from 'react'
import {Modal, Container, Form, Button} from 'react-bootstrap'
import DatePicker from 'react-datepicker' 
import 'react-datepicker/dist/react-datepicker.css'


const EditTransactionModal = (props) => {
    const { show, user, msgAlert, triggerRefresh, updateTransaction, handleClose } = props
    const [transaction, setTransaction] = useState(props.transaction)
    const [date,setDate] = useState(null)

    const handleChange = (e) => {
        // e === event
        e.persist()

        setTransaction(prevTrans => {
            const name = e.target.name
            let value = e.target.value
            console.log('etarget type', e.target.type)
            console.log('this is e.target checked', e.target.checked)

            if (e.target.type === 'number') {
                value = +(e.target.value)
            }

            const updatedValue = { [name]: value }

            console.log('prevTrans', prevTrans)
            console.log('updatedValue', updatedValue)

            return {...prevTrans, ...updatedValue}
        })
    }
    const handleDate = (selectDate,e) => {
        setDate(selectDate)
        setTransaction(prevTrans=> {
            return{...prevTrans,"datetime":selectDate.toISOString().split("T")[0]}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('users and transactions in hsSubmit', user, transaction)
        updateTransaction(user, transaction)
            .then(() => {
                handleClose()
            })
            .then(() => {
                triggerRefresh()
            })
            .catch((err) => {
            console.log(err)
        })
    }
    console.log('transaction in edit modal', transaction)


    return (
        <Modal show={show} onHide={handleClose} style={{color:'black'}}>
            <Modal.Header closeButton style={{ color: 'black' }}>{ }</Modal.Header>
            <Modal.Body>
                <Container className="justify-content-center">
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control 
                            defaultValue={transaction.amount}
                            name='amount'
                            type='number'
                            onChange={handleChange}
                        />
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            defaultValue={transaction.price}
                            name='price'
                            type='number'
                            onChange={handleChange}
                        />
                        <Form.Label>Date</Form.Label>
                        <DatePicker
                            dateFormat='E MMM dd yyyy'
                            name='datetime'
                            type='date'
                            selected={date}
                            value={date}
                            onChange={(selectDate,e)=>handleDate(selectDate,e)}
                        />
                        <Button type='submit'>Update Transaction</Button>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
    )
}


export default EditTransactionModal