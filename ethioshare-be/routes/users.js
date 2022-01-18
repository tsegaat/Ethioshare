const router = require("express").Router()
let Users = require("../models/users.model")

router.route('/').get((req, res) => {
    Users.find()
        .then(users => res.json(users))
        .catch(err => res.json("There was an error" + err))
})

router.route('/add').post((req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password

    const newUser = new Users({
        firstName, lastName, email, username, password
    })
    newUser.save()
        .then(() => res.json("Next page after user creates his account"))
        .catch(err => res.json("Error" + err))
})

module.exports = router