import { name } from 'plotly.js/lib/bar'
import React, { useState } from 'react'
import {Modal, Container, Form, Button} from 'react-bootstrap'
import DatePicker from 'react-datepicker' 
import 'react-datepicker/dist/react-datepicker.css'

const CreateTransactionModal = (props) => {
    const { show, user, msgAlert, triggerRefresh, createTransaction, handleClose } = props
    const [transaction, setTransaction] = useState("")
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
        console.log('thi sis select date!', selectDate.toISOString().split("T")[0], typeof selectDate)
        setDate(selectDate)
        setTransaction(prevTrans=> {
            return{...prevTrans,"datetime":selectDate.toISOString().split("T")[0]}
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setTransaction( prevTrans => {
            return {...prevTrans,'datetime':date}
        })
    

        createTransaction(user, transaction)
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



    return (
        <Modal show={show} onHide={handleClose} style={{color:'black'}}>
            <Modal.Header closeButton style={{ color: 'black' }}>Create Transaction</Modal.Header>
            <Modal.Body>
                <Container className="justify-content-center">
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Datetime</Form.Label>
                        <DatePicker
                            name='datetime'
                            type='date'
                            selected={date}
                            value={date}
                            onChange={(selectDate,e) => handleDate(selectDate,e)}
                            dateFormat='dd-MM-yyyy'
                            showYearDropdown
                            scrollableMonthYearDropdown
                        />
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                            name='type'
                            type='string'
                            onChange={handleChange}
                        /> 
                        <Form.Label>Coin Name</Form.Label>
                        <Form.Control
                            name='coinGeckId'
                            type='string'
                            onChange={handleChange}
                        /> 
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                            name='price'
                            type='number'
                            onChange={handleChange}
                        />
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            name='amount'
                            type='number'
                            onChange={handleChange}
                        />                           
                        <Button type='submit'>Add Transaction</Button>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
    )
}


export default CreateTransactionModal