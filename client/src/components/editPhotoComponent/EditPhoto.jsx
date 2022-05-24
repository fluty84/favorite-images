import { useEffect } from "react"
import { useState } from "react"
import { Button, Modal, Form } from "react-bootstrap"

import ImagesService from "../../services/images.services"
import UploadService from "../../services/upload.service"

import './EditPhoto.css'

const EditPhoto = ({ handleClose, show, modalData, getUserImages }) => {

    const {title, imgURL, _id} = modalData
    const [loadingImage, setLoadingImage] = useState(false)
    const [editForm, setEditForm] = useState({
        id: _id,
        imgURL: "",
        title: ""
    })

    useEffect(()=>{
        setEditForm({
            id: _id,
            imgURL: imgURL,
            title: title
        })
    },[modalData])

    const uploadImage = e => {

        setLoadingImage(true)
        const uploadData = new FormData()

        uploadData.append('imageData', e.target.files[0])
        
        UploadService
            .uploadImage(uploadData)
            .then(({ data }) => {
                setLoadingImage(false)
                setEditForm({ ...editForm, imgURL: data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }


    const handleImputChange = (e) => {
       
        const { name, value } = e.target
        
        setEditForm({
            ...editForm,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const { id, imgURL, title } = editForm

        if (!id || !imgURL|| !title) {
            alert('please fill in all fields of the form')
            return
        }
        ImagesService
            .edit(editForm)
            .then(res => {
                setEditForm({
                    imgURL: "",
                    title: ""
                })
                getUserImages()
                handleClose()
            })
            .catch(err => console.log(err))
    }


    return (

        <>
            <Modal className="edit" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Photo <strong>{modalData.title}</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Select modalData to upload</Form.Label>
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
                                placeholder={modalData.title}
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

export default EditPhoto