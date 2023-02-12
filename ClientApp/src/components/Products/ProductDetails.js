import { useEffect, useState, useReducer } from 'react';
import ProductModal from '../Products/ProductModal';
import { Button, Modal } from 'semantic-ui-react';
import EditModal from '../Products/EditProductModal';


const ProductsData = () => {
    const [products, setProducts] = useState();
    const [removeProduct, setRemoveProduct] = useState();
    const [show, setShow] = useState();
    useEffect(() => {
        const url = `http://localhost:44455/api/ProductDetails`
        fetch(url, {
            "Content-Type": "application/json",
            })
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            })

    }, [])

    function toggleShow() {
        setShow(!show);
    }


    function newProduct(name, price) {
        const data = { name: name, price: price };
        const url = `http://localhost:44455/api/ProductDetails`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Please enter all the details');
            }
            return response.json();
        }).then(() => { }).catch((e) => { console.log(e) });
        console.log(products);
    }

    const editProduct = async ( name, price, id ) => {
        const data = {name: name, price: price, id:id}
        const url = `http://localhost:44455/api/ProductDetails/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
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
        }).then(() => {  }).catch((e) => { console.log(e) });
        console.log(products);
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

    const deleteProduct = async (id) => {
        const url = await `http://localhost:44455/api/ProductDetails/delete/${id}`;
       fetch(url, {
            method: 'DELETE',
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Something went wrong')
            }
        }).then((data) => {
            setRemoveProduct(data)
        })
        console.log(id)
    }

    return (
        <div>
            <h1>Products Data</h1>
            <ProductModal
                newProduct={newProduct}
                show={show}
                toggleShow={toggleShow}
            />
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products
                        ? (products.map((product) => {
                            return (

                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <EditModal productId={product.id} editProduct={editProduct} />
                                    <td><Button onClick={() => dispatch({ type: 'open', size: 'mini' })} negative>Delete</Button></td>

                                    <Modal
                                        size={size}
                                        open={open}
                                        onClose={() => dispatch({ type: 'close' })}
                                        style={{ "position": "relative", "display": "block", "height": "auto", "JustifyContent": "center" }}
                                        onClick={() => { deleteProduct(product.id) }}
                                    >
                                        <Modal.Header>Delete Record?</Modal.Header>
                                        <Modal.Content>
                                            <p>Are you sure you want to delete your Record</p>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button negative onClick={() => dispatch({ type: 'close' })}>
                                                No
                                            </Button>
                                            <Button positive type='submit' content='Yes' onSubmit={removeProduct} onClick={() => dispatch({ type: 'close' })}>
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

export default ProductsData;