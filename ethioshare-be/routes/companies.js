const router = require("express").Router()
let Companies = require("../models/companies.model")
const bcrypt = require('bcrypt')

// TODO: Don't let just anyone come to the backend and request info just let the frontend request!
router.route('/wd').get((req, res) => {
    Companies.find({ trending: true }, function (err, company) {
        const filteredCompanies = []
        company.forEach(comp => {
            filteredCompanies.push({
                _id: comp._id,
                companyName: comp.companyName,
                companyEmail: comp.companyEmail,
                companyLogo: comp.companyLogo,
                companyPrice: comp.companyPrice,
                companyExchangeScore: comp.companyExchangeScore,
                companySector: comp.companySector,
            })
        })
        res.json(filteredCompanies)
    });
})

router.route('/d').get((req, res) => {
    Companies.find({}, function (err, company) {
        const filteredCompanies = []
        company.forEach(comp => {
            filteredCompanies.push({
                _id: comp._id,
                companyName: comp.companyName,
                companyEmail: comp.companyEmail,
                companyLogo: comp.companyLogo,
                companyPrice: comp.companyPrice,
                companyExchangeScore: comp.companyExchangeScore,
                companySector: comp.companySector,
                companyDescription: comp.companyDescription
            })
        })
        res.json(filteredCompanies)
    });
})

router.route('/getCompany').post((req, res) => {
    const { companyId } = req.body
    if (req.body == {}) return res.sendStatus(404)
    Companies.findOne({ _id: companyId }, function (err, company) {
        const { companyName, companyLogo, companyPrice, companyExchangeScore, companyDescription } = company
        res.json({ companyName, companyLogo, companyPrice, companyExchangeScore, companyDescription })
    })
})

module.exports = router