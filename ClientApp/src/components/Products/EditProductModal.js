﻿import React, { useState } from 'react'
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


function EditModal(props) {
    const [state, dispatch] = React.useReducer(exampleReducer, {
        open: false,
        dimmer: undefined,
    })
    const { open, dimmer } = state
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
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
                <Modal.Header>Edit Product</Modal.Header>
                <Modal.Content>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setName('');
                            setPrice('');
                            props.editProduct(name, price, props.productId);

                        }}
                    >
                        <Form.Field>
                            <label>Name</label>
                            <input
                                placeholder='Product'
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Price</label>
                            <input
                                placeholder='Price'
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }}
                            />
                        </Form.Field>
                        <Form.Button negative onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
                            Cancel
                        </Form.Button>
                        <Form.Button positive type='submit' onSubmit={props.editProduct} content='Submit' />
                    </Form>
                </Modal.Content>
            </Modal>
        </div>
    )
}

export default EditModal