import { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { AuthContext } from '../../context/auth.context'
import imagesService from '../../services/images.services'
import EditPhoto from '../editPhotoComponent/EditPhoto'


import './PhotoList.css'

const PhotoList = ({newImages}) => {

    const [images, setImages] = useState()

    const { user } = useContext(AuthContext)

    const [show, setShow] = useState(false);

    const [modalData , setModalData] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const getUserImages = (owner) => {
        imagesService
            .getAll(owner)
            .then(response => setImages(response.data))
            .catch(err => console.log(err))

    }

    const deleteImage = (id) => {
        imagesService
            .delete({ id })
            .then(() => getUserImages({ owner: user._id }))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getUserImages({ owner: user._id })
    }, [newImages])



    return (
        <>
            <Container className='justify-content-center d-flex'>
                {images && <Row>
                    {images.map(image => {
                        return (
                            <Col md={4} key={image._id}>
                                <Card className='card justify-content-between'>
                                    <Card.Img variant="top" src={image.imgURL} />
                                    <Card.Title>{image.title}</Card.Title>
                                    <div className="buttons">
                                        <Button variant='dark' onClick={() => deleteImage(image._id)}>Delete</Button>
                                        <Button variant='warning' onClick={ () => {
                                            setModalData(image)
                                            handleShow()
                                        }
                                        }>Edit</Button>
                                    </div>
                                   
                                </Card>
                                <EditPhoto
                                    modalData={modalData}
                                    handleClose={handleClose}
                                    show={show}
                                    setShow={setShow}
                                    getUserImages={() => getUserImages({ owner: user._id })}
                                ></EditPhoto>
                            </Col>
                            
                        )
                    })
                    }
                </Row>}
            </Container>
        </>
    )
}

export default PhotoList