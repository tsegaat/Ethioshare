const { graphqlHTTP } = require("express-graphql")
const { buildSchema } = require("graphql")
const { events } = require("../models/companies.model")
let Companies = require("../models/companies.model")

const graphqlHandler = graphqlHTTP({
    // The type company type is what is supposed to be retured after the search
    // The RootQuery is the search function that searchs the Database and returns the type company
    schema: buildSchema(`
        type Company {
            _id: ID!
            companyName: String!
            companySector: String!
            companyPrice: Float!
            companyEmail: String!
            companyLogo: String!
            companyExchangeScore: Int!
            companyDescription: String!
        }

        input CompanyInput {
            companyName: String
            companySector: String
            companyPrice: Float
        }

        type RootQuery {
            company(companyInput: CompanyInput): [Company!]!
        }

        schema {
            query: RootQuery
        }
    `),
    rootValue: {
        company: (args) => {
            // The Dictonary here and the Company type must be the same
            // TODO this is where the search happens with the parameters given by the client after the search returns the company dictonary with the values of the search

            const companyName = args.companyInput.companyName
            const companyPrice = args.companyInput.companyPrice
            const companySector = args.companyInput.companySector

            const searchParameter = {
                companyName: companyName,
                companySector: companySector,
                companyPrice: { $lt: companyPrice }
            }

            if (companyName == "") delete searchParameter.companyName;
            if (companySector == "") delete searchParameter.companySector;
            if (companyPrice == 0) delete searchParameter.companyPrice;

            return Companies.find(searchParameter).then(comp => {
                const companies = []
                comp.forEach((company => {
                    companies.push({
                        _id: company._id,
                        companyName: company.companyName,
                        companySector: company.companySector,
                        companyPrice: +company.companyPrice,
                        companyEmail: company.companyEmail,
                        companyLogo: company.companyLogo,
                        companyExchangeScore: company.companyExchangeScore,
                        companyDescription: company.companyDescription
                    })
                }))
                return companies
            }).catch(err => console.log(err))
        }
    },
    graphiql: true
})

module.exports = graphqlHandler