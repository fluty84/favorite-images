import { useState } from "react";
import { useContext } from "react"
import { Container } from "react-bootstrap";
import NewPhoto from "../../components/newPhotoComponent/NewPhoto";
import { AuthContext } from "../../context/auth.context";

const UserPanel = () => {

    const { user } = useContext(AuthContext)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Container>
                <h1>Welcome to {user?.username.toUpperCase()}'s favorite images</h1>
                <h3>IMAGES LIST</h3>
                <NewPhoto 
                    handleShow={handleShow}
                    handleClose={handleClose}
                    show={show}
                    setShow={setShow}
                ></NewPhoto>
            </Container>
        </>
    )

}

export default UserPanel