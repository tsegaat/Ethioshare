const mongoose = require("mongoose")

const Schema = mongoose.Schema

const usersSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        // TODO: Add validator to check whether it is an email or not
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
}, {
    timestamps: true,
})

const Users = mongoose.model("Users", usersSchema)

module.exports = Users