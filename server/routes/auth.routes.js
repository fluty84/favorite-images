const express = require("express")

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User.model')

const { isAuthenticated } = require('../middlewares/jwt.middleware')

const router = express.Router()

///// User Login /////

router.post('/loginUser', (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(401).json({ errorMessage: 'provide a valid email and password' })
        return
    }

    User
        .findOne({ email })
        .then(foundUser => {
            if (!foundUser) {
                res.status(405).json({ erorrMessage: "User not found." })
                return;
            }
            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, username } = foundUser

                const payload = { _id, email, username }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

                res.status(200).json({ authToken })
            } else {
                res.status(406).json({
                    errorMessage: "Unable to authenticate the user"})
            }
        })
        .catch(err => {
            res.status(500).json({ message: `Internal server error ${err}` })
        })

})

router.get('/verify', isAuthenticated, (req, res, next) => {
    res.status(200).json(req.payload)
})




module.exports = router