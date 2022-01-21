const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose')
const companySchema = require("./models/company.model")
const cloudinary = require('cloudinary').v2;

require("dotenv").config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_SERVER_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection
connection.once('open', () => {
    console.log("MangoDB database connection established")
})

app.post('/add', (req, res) => {
    const companyName = req.body.companyName
    const companyLogo = req.body.companyLogo
    const companyPrice = req.body.companyPrice
    const companyExchangeScore = req.body.companyExchangeScore
    const companyEmail = req.body.companyEmail

    cloudinary.uploader.upload(companyLogo, { folder: 'companies', use_filename: true }, result => {
        const company = new companySchema({
            companyName, companyLogo: result.secure_url, companyPrice, companyExchangeScore, companyEmail
        })

        company.save().then(res => {
            res.json({ companyCreated: true })
        })
            .catch(err => {
                const error = err.keyPattern
                const errorCause = Object.keys(error)[0]
                res.json({ companyCreated: false, errorCause: errorCause })
            })
    })
})

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`)
})