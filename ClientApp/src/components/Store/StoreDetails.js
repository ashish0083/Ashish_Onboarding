import { useEffect, useState, useReducer } from 'react';
import StoreModal from '../Store/StoreModal';
import { Button, Modal } from 'semantic-ui-react';
import StoreEditModal from '../Store/StoreEditModal';


const StoresData = () => {
    const [stores, setStores] = useState();
    const [removeStore, setRemoveStore] = useState();
    const [show, setShow] = useState();
    useEffect(() => {
        const url = `http://localhost:44455/api/Store`
        fetch(url, {
            "Content-Type": "application/json",
        })
            .then((response) => response.json())
            .then((data) => {
                setStores(data);
            })

    }, [])

    function toggleShow() {
        setShow(!show);
    }


    function newStore(name, address) {
        const data = { name: name, address: address };
        const url = `http://localhost:44455/api/Store`;
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
        console.log(stores);
    }

    const editStore = async (name, address, id) => {
        const data = { name: name, address: address, id:id }
        const url = `http://localhost:44455/api/Store/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(async (response) => {
            console.log('dataaa', await response.json())
            if (!response.ok) {
                throw new Error('Please enter all the details');
            }
            return response.json();
        }).then(() => { }).catch((e) => { console.log(e) });
        console.log(stores);
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

    const deleteStore = async (id) => {
        const url = await `http://localhost:44455/api/Store/delete/${id}`;
        fetch(url, {
            method: 'DELETE',
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Something went wrong')
            }
        }).then((data) => {
            setRemoveStore(data)
        })
        console.log(id)
    }

    return (
        <div>
            <h1>Stores Data</h1>
            <StoreModal
                newStore={newStore}
                show={show}
                toggleShow={toggleShow}
            />
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stores
                        ? (stores.map((store) => {
                            return (

                                <tr key={store.id}>
                                    <td>{store.name}</td>
                                    <td>{store.address}</td>
                                    <StoreEditModal storeId={store.id} editStore={editStore} />
                                    <td><Button onClick={() => dispatch({ type: 'open', size: 'mini' })} negative>Delete</Button></td>

                                    <Modal
                                        size={size}
                                        open={open}
                                        onClose={() => dispatch({ type: 'close' })}
                                        style={{ "position": "relative", "display": "block", "height": "auto", "JustifyContent": "center" }}
                                        onClick={() => { deleteStore(store.id) }}
                                    >
                                        <Modal.Header>Delete Record?</Modal.Header>
                                        <Modal.Content>
                                            <p>Are you sure you want to delete your Record</p>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button negative onClick={() => dispatch({ type: 'close' })}>
                                                No
                                            </Button>
                                            <Button positive type='submit' content='Yes' onSubmit={removeStore} onClick={() => dispatch({ type: 'close' })}>
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

export default StoresData;