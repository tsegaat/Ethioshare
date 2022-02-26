const router = require('express').Router()
const BuyerRequests = require('../models/buyer_requests.model')
const Companies = require('../models/companies.model')
const Users = require('../models/users.model')

router.route('/add').post((req, res) => {
    const { companyPremium, userId, companyId } = req.body

    const buyerRequestsData = { companyPremium, companyId, userId }

    const buyerRequest = new BuyerRequests(buyerRequestsData)
    buyerRequest.save()
        .then(() => {
            res.json({
                buyerRequestCreated: true
            })
        })
        .catch(() => {
            res.json({
                buyerRequestCreated: false
            })
        })
})


// TODO: Ask tsega on how to solve this!
router.route("/getAllBuyerRequests").get(async (req, res) => {
    const companiesPremium = []
    const companyDetails = []
    const userIds = []
    const companyIds = []
    BuyerRequests.find({}, (err, buyerRequestsData) => {
        buyerRequestsData.forEach(buyerRequestData => {
            const { companyPremium, companyId, userId } = buyerRequestData
            companiesPremium.push({ companyPremium })
            userIds.push(userId)
            companyIds.push(companyId)
        })
    })
    await companyDetails.push(companySearch(companyIds))
    res.json({ companiesPremium, companyDetails })

})

module.exports = router