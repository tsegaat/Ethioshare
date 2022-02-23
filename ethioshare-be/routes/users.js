const router = require("express").Router()
let Users = require("../models/users.model")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
require("dotenv").config()

router.route('/login').post((req, res) => {
    const email = req.body.email
    const password = req.body.password
    // TODO: Do more authentication
    Users.findOne({ email: email }, function (err, user) {
        if (user === null) {
            res.json({
                userExist: false
            })
        } else {
            bcrypt.compare(password, user.password, (err, bol) => {
                if (bol) {

                    const token = jwt.sign({ userId: user._id.toString() }, process.env.ACCESS_TOKEN)
                    const refreshToken = jwt.sign({ userId: user._id.toString() }, process.env.REFRESH_TOKEN, { expiresIn: '1d' })
                    res.json({
                        userExist: true,
                        correct: true,
                        userToken: token,
                        refreshToken
                    })
                } else {
                    res.json({
                        userExist: true,
                        correct: false
                    })
                }
            })
        }
    });
})

router.route('/create').post((req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    // TODO: Do more authentication
    // TODO: handle all errors so the server never crashes
    bcrypt.hash(password, 5, function (err, encryptedPassword) {
        const user = {
            firstName, lastName, email, username, password: encryptedPassword
        }
        const newUser = new Users(user)
        newUser.save()
            .then((user) => {
                const token = jwt.sign(user._id.toString(), process.env.ACCESS_TOKEN)
                const refreshToken = jwt.sign(user._id.toString(), process.env.REFRESH_TOKEN)
                res.json({
                    userCreated: true,
                    userToken: token,
                    refreshToken
                })
            })
            .catch(err => {
                console.log(err)
                const error = err.keyPattern
                const errorCause = Object.keys(error)[0]
                res.json({ userCreated: false, errorCause: errorCause })
            })
    });

})

module.exports = router