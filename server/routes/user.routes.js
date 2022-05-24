const express = require("express")

const bcrypt = require('bcryptjs')
const saltRounds = 10;

const User = require('../models/User.model')

const router = express.Router()



//// Create a new user ////

router.post('/create', (req, res) => {
    
    const {username, password, email} = req.body

//checking correct info before create user//

    if (!email || !password || !username) {
        res.status(400).json({ message: "Provide email, password and name" });
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        res.status(401).json({ errorMessage: "Provide a valid email address." });
        return;
    }

    if (password.length < 6) {
        res.status(402).json({
            errorMessage:"Password must have at least 6 characters",
        });
        return;
    }

    User
        .findOne({username})
        .then( foundUser => {
            if(foundUser) {
                res.status(404).json({errorMessage: "User already exist"})
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({username, password: hashedPassword, email})   
        })
        .then(createdUser => res.status(201).json(createdUser))
        .catch((err) => {
            res.status(500).json({ message: `error ${err}` });
        });

})





module.exports = router