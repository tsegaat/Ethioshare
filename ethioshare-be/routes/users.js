const router = require("express").Router()
let Users = require("../models/users.model")
const bcrypt = require('bcrypt')

router.route('/').get((req, res) => {
    const email = req.query.email
    const password = req.query.pass
    Users.findOne({ email: email }, function (err, user) {
        if (user.length === 0) {
            res.json({
                userExist: false
            })
        } else {
            bcrypt.compare(password, user.password, (err, bol) => {
                if (bol) {
                    res.json({
                        userExist: true,
                        correct: true,
                        // jsonwebtoken
                        // TODO: change by an actual token
                        userToken: user._id
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

router.route('/add').post((req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password

    bcrypt.hash(password, 5, function (err, encyptedPassword) {
        const user = {
            firstName, lastName, email, username, password: encyptedPassword
        }
        const newUser = new Users(user)
        newUser.save()
            .then((user) => {
                res.json({ userCreated: true, userToken: user._id })
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