import React, { useState } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'
import { useNavigate } from "react-router-dom";



function exampleReducer(state, action) {
    switch (action.type) {
        case 'OPEN_MODAL':
            return { open: true, dimmer: action.dimmer }
        case 'CLOSE_MODAL':
            return { open: false }
        default:
            throw new Error()
    }
}


function SalesEditModal(props) {
    const [state, dispatch] = React.useReducer(exampleReducer, {
        open: false,
        dimmer: undefined,
    })
    const { open, dimmer } = state
    const [product, setProduct] = useState('');
    const [store, setStore] = useState('');
    const [customer, setCustomer] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();
    /*const [show, setShow] = useState(props.show);*/


    return (
        <div>
            <Button primary
                onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}
            >
                Edit
            </Button>

            <Modal
                dimmer={dimmer}
                open={open}
                onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
                style={{ "position": "relative", "display": "block", height: "auto", justifyContent: "center", alignItems: "center" }}
            >
                <Modal.Header>Edit Sale</Modal.Header>
                <Modal.Content>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setProduct('');
                            setCustomer('');
                            setStore('');
                            setDate('');
                            props.editSale(product, customer, store, date, props.saleId);

                        }}
                    >
                        <Form.Field>
                            <label>Customer</label>
                            <input
                                placeholder='Customer'
                                value={customer}
                                onChange={(e) => {
                                    setCustomer(e.target.value);
                                }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Product</label>
                            <input
                                placeholder='Product'
                                value={product}
                                onChange={(e) => {
                                    setProduct(e.target.value);
                                }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Store</label>
                            <input
                                placeholder='Store'
                                value={store}
                                onChange={(e) => {
                                    setStore(e.target.value);
                                }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Date</label>
                            <input
                                placeholder='Date'
                                value={date}
                                onChange={(e) => {
                                    setDate(e.target.value);
                                }}
                            />
                        </Form.Field>
                        <Form.Button negative onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
                            Cancel
                        </Form.Button>
                        <Form.Button positive type='submit' onSubmit={props.editSale} content='Submit' />
                    </Form>
                </Modal.Content>
            </Modal>
        </div>
    )
}

export default SalesEditModal