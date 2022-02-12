const { graphqlHTTP } = require("express-graphql")
const { buildSchema } = require("graphql")
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
            companyDescription: String
        }

        type RootQuery {
            company(companyInput: CompanyInput): [Company]!
        }

        schema {
            query: RootQuery
        }
    `),
    rootValue: {
        company: (args) => {

            const companyName = args.companyInput.companyName
            const companyPrice = args.companyInput.companyPrice
            const companySector = args.companyInput.companySector

            const searchParameter = {
                companyName: companyName,
                companySector: companySector,
                companyPrice: { $lt: companyPrice },
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