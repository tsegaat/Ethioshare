const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const companySchema = require("./models/company.model")
const cloudinary = require('cloudinary').v2;

require("dotenv").config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_SERVER_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express()
const PORT = process.env.PORT

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
    const companySector = req.body.companySector
    const companyDescription = req.body.companySector

    cloudinary.uploader.upload(companyLogo, { public_id: `companies/${companyName}`, use_filename: true }).then(result => {
        const company = {
            companyName, companyLogo: result.secure_url, companyPrice, companyExchangeScore, companyEmail, companySector, companyDescription
        }
        const newCompany = new companySchema(company)
        newCompany.save()
            .then(() => res.json("Company Created!!!"))
            .catch(err => res.json(err))
    })
})

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`)
})