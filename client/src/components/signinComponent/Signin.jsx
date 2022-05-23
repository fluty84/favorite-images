import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import AuthService from "../../services/auth.services";


const Signin = ({handleClose, handleShow, show}) => {

    const [userForm, setUserForm] = useState({
        username: "",
        password: "", 
        email:""
    })

    const { username, password, email } = userForm

    const handleImputChange = (e) => {
        const { name, value } = e.target

      setUserForm({
            ...userForm,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { username, password, email } = userForm

        if (!username || !password || !email) {
            alert('please fill in all fields of the form')
            return
        }
        AuthService
            .create(userForm)
            .then(res => {
                console.log(res)
                setUserForm({
                    name: "",
                    address: "", 
                    email:""
                })
            })
            .catch(err => console.log(err))
    }
    

    return (

        <>
            <Button variant="secundary" onClick={handleShow}>
                Create User
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                onChange={handleImputChange}
                                autoFocus
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="user name"
                                onChange={handleImputChange}
                                autoFocus
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                onChange={handleImputChange}
                                autoFocus
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default Signin

