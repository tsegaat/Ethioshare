const router = require("express").Router()
let Companies = require("../models/companies.model")
const bcrypt = require('bcrypt')

// TODO: Don't let just anyone come to the backend and request info just let the frontend request!
router.route('/wd').get((req, res) => {
    Companies.find({ trending: true }, function (err, company) {
        const filterdCompanies = []
        company.forEach(comp => {
            filterdCompanies.push({
                _id: comp._id,
                companyName: comp.companyName,
                companyEmail: comp.companyEmail,
                companyLogo: comp.companyLogo,
                companyPrice: comp.companyPrice,
                companyExchangeScore: comp.companyExchangeScore,
                companySector: comp.companySector,
            })
        })
        res.json(filterdCompanies)
    });
})

router.route('/d').get((req, res) => {
    Companies.find({}, function (err, company) {
        const filterdCompanies = []
        company.forEach(comp => {
            filterdCompanies.push({
                companyName: comp.companyName,
                companyEmail: comp.companyEmail,
                companyLogo: comp.companyLogo,
                companyPrice: comp.companyPrice,
                companyExchangeScore: comp.companyExchangeScore,
                companySector: comp.companySector,
                companyDescription: comp.companyDescription
            })
        })
        res.json(filterdCompanies)
    });
})

module.exports = router