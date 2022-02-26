const mongoose = require('mongoose')

const Schema = mongoose.Schema

const buyerRequestsSchema = Schema({
    companyPremium: {
        type: Number
    },
    userId: {
        type: String
    },
    companyId: {
        type: String
    }
})

const model = mongoose.model("BuyerRequests", buyerRequestsSchema)
module.exports = model