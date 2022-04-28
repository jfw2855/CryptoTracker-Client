import React, { useState } from 'react'
import { Modal, Container, Form, Button } from 'react-bootstrap'

const CreateCoinModal = (props) => {
    const { show, user, triggerRefresh, handleClose, createCoin } = props
    const [coin, setCoin] = useState("")

    const handleChange = (e) => {
        // e === event
        e.persist()

        setCoin(prevCoin => {
            const name = e.target.name
            let value = e.target.value
            console.log('etarget type', e.target.type)
            console.log('this is e.target checked', e.target.checked)

            if (e.target.type === 'number') {
                value = +(e.target.value)
            }


            const updatedValue = { [name]: value }

            console.log('prevTrans', prevCoin)
            console.log('updatedValue', updatedValue)

            return {...prevCoin, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('users and transactions in hsSubmit', user, coin)
        createCoin(user, coin)
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
        <>
            <Modal show={show} onHide={handleClose} style={{color:'black'}}>
            <Modal.Header closeButton style={{ color: 'black' }}>Create Coin</Modal.Header>
            <Modal.Body>
                <Container className="justify-content-center">
                        <Form onSubmit={handleSubmit}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                name='coinGeckId'
                                type='string'
                                onChange={handleChange}
                            /> 
                            <Form.Label>Average Price</Form.Label>
                            <Form.Control
                                name='avgPrice'
                                type='number'
                                onChange={handleChange}
                            /> 
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                name='quantity'
                                type='number'
                                onChange={handleChange}
                            /> 
                        <Button type='submit'>Add New Coin</Button>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default CreateCoinModal