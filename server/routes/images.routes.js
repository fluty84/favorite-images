const express = require("express")
const router = express.Router()

const Image = require('../models/Image.model')

const uploader = require('./../config/cloudinary.config')

/////Upload image to Cloudinary/////

router.post('/upload', uploader.single('imageData'), (req, res) => {

    if (!req.file) {
        res.status(500).json({ errorMessage: 'Error uploading file' })
        return
    }
    res.json({ cloudinary_url: req.file.path })
})

/////Create a new image reference/////

router.post('/image', (req, res) => {

    const {title, owner, imgURL} = req.body

    Image
        .create({ title, owner, imgURL })
        .then(createditem => res.status(201).json(createditem))
        .catch(err => {
            res.status(500).json({ message: `Internal server error ${err}` })
        })
} )

/////Get all user's images/////

router.get('/', (req, res)=> {
    const {owner} = req.body

    Image 
        .find(owner)
        .select('title imgURL')
        .then(response => res.json(response))
        .catch(err => {
            res.status(500).json({ message: `Internal server error ${err}` })
        })
})

/////Delete Image/////

router.post('/delete', (req, res) => {
    const {id} = req.body
    Image 
        .findByIdAndDelete(id)
        .then(response => res.json(response))
        .catch(err => {
            res.status(500).json({ message: `Internal server error ${err}` })
        })
})

/////Edit Image////

router.post('/edit', (req, res) => {
    const {id, imgURL, title} = req.body
    Image
        .findByIdAndUpdate(id, {imgURL, title})
        .then(response => res.json(response))
        .catch(err => {
            res.status(500).json({ message: `Internal server error ${err}` })
        })
})

module.exports = router
