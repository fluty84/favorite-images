import { useState, useContext } from "react"
import { Form, Button, Container } from 'react-bootstrap'
import authService from '../../services/auth.services'
import { useNavigate} from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import Signin from "../../components/signinComponent/Signin"



const Login = () =>{
    const { storeToken, authenticateUser } = useContext(AuthContext)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [loginForm, setLoginForm] = useState({
        password: "",
        email: ""
    })

    const navigate = useNavigate()



    const handleInputChange = e => {
        const { name, value } = e.target
        setLoginForm({
            ...loginForm,
            [name]: value
        })
    }

    function handleSubmit(e) {

        e.preventDefault()

        authService
            .login(loginForm)
            .then(({ data }) => {
                console.log("JWT token", data.authToken)
                storeToken(data.authToken)
                authenticateUser()
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (

        <Container className="d-flex flex-column align-items-center">
            <h1>Your Favorite Picture Keeper</h1>
            <Form  onSubmit={handleSubmit} style={{ width: '350px' }}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={loginForm.email} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={loginForm.password} onChange={handleInputChange} />
                </Form.Group>
                <Button variant="dark" type="submit" style={{ width: '200px' }}>Login</Button>
            </Form>

            <Signin
                handleShow={handleShow}
                handleClose={handleClose}
                show={show}
                setShow={setShow}
            ></Signin>
        </Container>
    )
}

export default Login