import React, { useState } from 'react'
import {Modal, Container, Form, Button} from 'react-bootstrap'

const EditTransactionModal = (props) => {
    const { show, user, msgAlert, triggerRefresh, updateTransaction, handleClose } = props
    const [transaction, setTransaction] = useState(props.transaction)

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

    const handleSubmit = (e) => {
        e.preventDefault()

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

    //title edit transaction
    //

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <Container className="justify-content-center">
                    <h3>{transaction.coinGeckId}</h3>
                    <Form onSubmit ={handleSubmit}>
                        <Button type='submit'>Update Transaction</Button>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
    )
}


export default EditTransactionModal