import { useContext, useState } from "react"
import { Button, Modal, Form } from "react-bootstrap"
import { AuthContext } from "../../context/auth.context"

import ImagesService from "../../services/images.services"
import UploadService from "../../services/upload.service"


const NewPhoto = ({ handleClose, handleShow, show, setNewImages, id }) => {

    const { user } = useContext(AuthContext)

    const [loadingImage, setLoadingImage] = useState(false)
    
    const [imageForm, setImageForm] = useState({
        owner: id,
        imgURL: "",
        title: ""
    })

    const uploadImage = e => {

        setLoadingImage(true)
        const uploadData = new FormData()

        uploadData.append('imageData', e.target.files[0])
        
        UploadService
            .uploadImage(uploadData)
            .then(({ data }) => {
                setLoadingImage(false)
                setImageForm({ ...imageForm, imgURL: data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }


    const handleImputChange = (e) => {
        const { name, value } = e.target

        setImageForm({
            ...imageForm,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const { owner, imgURL, title } = imageForm

        if (!owner || !imgURL|| !title) {
            alert('please fill in all fields of the form')
            return
        }
        ImagesService
            .create(imageForm)
            .then(res => {
                setNewImages(res)
                setImageForm({
                    imgURL: "",
                    title: ""
                })
                handleClose()
            })
            .catch(err => console.log(err))
    }


    return (

        <>
            <Button variant="dark" onClick={handleShow}>
                Upload photo
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Select image to upload</Form.Label>
                            <Form.Control
                                type="file"
                                name="imgURL"
                                onChange={uploadImage}
                                autoFocus
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="image title"
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
                   {!loadingImage && <Button variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default NewPhoto