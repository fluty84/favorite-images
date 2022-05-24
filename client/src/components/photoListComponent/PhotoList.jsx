import { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { AuthContext } from '../../context/auth.context'
import imagesService from '../../services/images.services'

import './PhotoList.css'

const PhotoList = () => {

    const [images, setImages] = useState()

    const { user } = useContext(AuthContext)

    const getUserImages = (owner) => {
        imagesService
            .getAll(owner)
            .then(response => setImages(response.data))
            .catch(err => console.log(err))

    }

    const deleteImage = (id) => {
        console.log(id)
        imagesService
            .delete({id})
            .then(() => getUserImages({ owner: user._id }))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getUserImages({ owner: user._id })
        console.log(images)
    }, [])



    return (
        <>
            <h3>PhotoList</h3>
            <Container className='justify-content-center d-flex'>
               {images && <Row>
                    {images.map(image => {

                        return (
                            <Col md={4} key={image._id}>
                                <Card className='card'>
                                    <Card.Img variant="top" src={image.imgURL} />
                                    <Card.Title>{image.title}</Card.Title>
                                    <Button variant='dark' onClick={() => deleteImage(image._id)}>Borrar</Button>  
                                </Card>
                            </Col>)
                    })
                    }
                </Row>}
            </Container>
        </>
    )
}

export default PhotoList