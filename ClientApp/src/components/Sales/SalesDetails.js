import { useEffect, useState, useReducer } from 'react';
import SalesModal from '../Sales/SalesModal';
import { Button, Modal } from 'semantic-ui-react';
import SalesEditModal from '../Sales/EditSalesModal';


const SalesData = () => {
    const [removeSale, setRemoveSale] = useState();
    const [sales, setSales] = useState();
    const [show, setShow] = useState();
    useEffect(() => {
        const url = `http://localhost:44455/api/Sales`
        fetch(url, {
            "Content-Type": "application/json",
        })
            .then((response) => response.json())
            .then((data) => {
                setSales(data);
            })

    }, [])

    function toggleShow() {
        setShow(!show);
    }


    function newSale(customer, product, store, date) {
        const data = { customer: customer, product: product, store: store, date: date};
        const url = `http://localhost:44455/api/Sales`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (!response.ok) {
                throw new Error(`bad response ${response.status} - ${response.statusText}`);
            }
            return response.json();
        }).then(() => { }).catch((e) => { console.log(e) });
        console.log(sales);
    }

    const editSale = async (product, customer, store, date, id) => {
        const data = { product: product, customer: customer, store: store, date: date, id:id}
        const url = `http://localhost:44455/api/Sales/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(async (response) => {
            console.log('dataaa', await response.json());
            console.log(response);
            if (!response.ok) {
                throw new Error('Please enter all the details');
            }
            return response.json();
        }).then(() => { }).catch((e) => { console.log(e) });
        console.log(sales);
    }

    function exampleReducer(state, action) {
        switch (action.type) {
            case 'close':
                return { open: false }
            case 'open':
                return { open: true, size: action.size }
            default:
                throw new Error('Unsupported action...')
        }
    }
    const [state, dispatch] = useReducer(exampleReducer, {
        open: false,
        size: undefined,
    })
    const { open, size } = state

    const deleteSale = async (id) => {
        const url = await `http://localhost:44455/api/Sales/delete/${id}`;
        fetch(url, {
            method: 'DELETE',
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Something went wrong')
            }
        }).then((data) => {
            setRemoveSale(data)
        })
        console.log(id)
    }

    return (
        <div>
            <h1>Sales Data</h1>
            <SalesModal
                newSale={newSale}
                show={show}
                toggleShow={toggleShow}
            />
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Customer</th>
                        <th>Store</th>
                        <th>Date</th>
                        <th>Actions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sales
                        ? (sales.map((sale) => {
                            return (

                                <tr key={sale.id}>
                                    <td>{sale.product}</td>
                                    <td>{sale.customer}</td>
                                    <td>{sale.store}</td>
                                    <td>{ sale.dateSold }</td>
                                    <SalesEditModal editSale={editSale} saleId={sale.id } />
                                    <td><Button onClick={() => dispatch({ type: 'open', size: 'mini' })} negative>Delete</Button></td>

                                    <Modal
                                        size={size}
                                        open={open}
                                        onClose={() => dispatch({ type: 'close' })}
                                        style={{ "position": "relative", "display": "block", "height": "auto", "JustifyContent": "center" }}
                                        onClick={() => { deleteSale(sale.id) }}
                                    >
                                        <Modal.Header>Delete Record?</Modal.Header>
                                        <Modal.Content>
                                            <p>Are you sure you want to delete your Record</p>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button negative onClick={() => dispatch({ type: 'close' })}>
                                                No
                                            </Button>
                                            <Button positive type='submit' content='Yes' onSubmit={removeSale} onClick={() => dispatch({ type: 'close' })}>
                                                Yes
                                            </Button>
                                        </Modal.Actions>
                                    </Modal>

                                </tr>

                            )
                        })
                        ) : null}
                </tbody>
            </table>




        </div>
    )


}

export default SalesData;