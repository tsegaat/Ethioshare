const router = require("express").Router()
let Users = require("../models/users.model")
const bcrypt = require('bcrypt')

// //to compare password that user supplies in the future
// var hash = getFromDB(..);
// bcrypt.compare(userSuppliedPassword, hash, function (err, doesMatch) {
//     if (doesMatch) {
//         //log him in
//     } else {
//         //go away
//     }
// });

router.route('/').get((req, res) => {
    const email = req.query.email
    Users.find({ email: email }, function (err, user) {
        if (user.length === 0) {
            res.json({
                userExist: false
            })
        } else {
            const password = user[0].password
            res.json({
                userExist: true,
                email,
                password
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
            .then(() => res.json("Next page after user creates his account"))
            .catch(err => res.json({ userExist: true, errorReturned: err }))
    });
})

module.exports = router