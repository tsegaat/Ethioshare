const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require('mongoose')

require("dotenv").config()

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

const usersRouter = require("./routes/users")
app.use("/users", usersRouter)

const companiesRouter = require("./routes/companies")
app.use("/companies", companiesRouter)

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`)
})