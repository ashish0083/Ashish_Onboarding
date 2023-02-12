


import { useEffect, useState, useReducer } from 'react';
import ModalExampleDimmer from './Modal';
import { Button,Modal } from 'semantic-ui-react';
import EditModal from '../components/Customer/EditModal';


const CustomersData = () => {
    const [customers, setCustomers] = useState();
    const [removeCustomer, setRemoveCustomer] = useState();
    const [show, setShow] = useState();
    useEffect(() => {
        const url = `http://localhost:44455/api/CustomerDetails`
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setCustomers(data);
            })

    },[])

    function toggleShow() {
        setShow(!show);
    }


    function newCustomer(name, address) {
        const data = { name: name, address: address };
        const url = `http://localhost:44455/api/CustomerDetails`;
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
        console.log(customers);
    }
    const editCustomer = async (name, address, id) => {
        const data = { name: name, address: address, id: id }
        const url = `http://localhost:44455/api/CustomerDetails/${id}`;
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
        }).then(() => { }).catch((e) => { console.log(e) });
        console.log(customers);
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

    const deleteCustomer = async (id) => {
        const url = `http://localhost:44455/api/CustomerDetails/delete/${id}`;
       await fetch(url, {
            method: 'DELETE',
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Something went wrong')
            }
        }).then((data) => {
            setRemoveCustomer(data);
        })
        return
        console.log(id)
    }

    return (
        <div>
            <h1>Customer Data</h1>
            <ModalExampleDimmer
                newCustomer={newCustomer}
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
                                {customers
                                    ? (customers.map((customer) => {
                                     return (

                                    <tr key={customer.id}>
                                        <td>{customer.name}</td>
                                        <td>{customer.address}</td>
                                             <td>
                                                 <EditModal customerId={customer.id} editCustomer={editCustomer} />
                                             </td>
                                             <td><Button onClick={() => dispatch({ type: 'open', size: 'mini' })} negative>Delete</Button></td>
                                             
                                             <Modal
                                                 size={size}
                                                 open={open}
                                                 onClose={() => dispatch({ type: 'close' })}
                                                 style={{ "position": "relative", "display": "block", "height": "auto", "JustifyContent": "center" }}
                                                 
                                                 onClick={() => { deleteCustomer(customer.id) }}
                                             >
                                                 <Modal.Header>Delete Record?</Modal.Header>
                                                 <Modal.Content>
                                                     <p>Are you sure you want to delete your Record</p>
                                                 </Modal.Content>
                                                 <Modal.Actions>
                                                     <Button negative onClick={() => dispatch({ type: 'close' })}>
                                                         No
                                                     </Button>
                                                     <Button positive type='submit' content='Yes' onSubmit={removeCustomer} onClick={() => dispatch({ type: 'close' })}> 
                                                         Yes
                                                       </Button>
                                                 </Modal.Actions>
                                             </Modal>

                                         </tr>

                                    )})
                                    ) : null}
                                </tbody>
                            </table>
                       


           
        </div>
    )
    

}

export default CustomersData;